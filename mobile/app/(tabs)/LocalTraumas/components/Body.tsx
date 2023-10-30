import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import bodyCoordinates from './../utils/bodyCoordinates.json'
import findReports from '@src/api/reports/findReport'
import { RootState } from '@src/redux/stores/stores'
import { useSelector } from 'react-redux'


type Coordinate = {
  x: number
  y: number
}

type BodyPartCoordinates = {
  tl: Coordinate
  br: Coordinate
}

type BodyPart = {
  coords: BodyPartCoordinates
  side: 'Direito' | 'Esquerdo' | null
  face: 'Frontal' | 'Traseiro'
}

type BodyProps = {
  bodyPartChangeHandler: Dispatch<SetStateAction<boolean>>
  setFace: Dispatch<SetStateAction<string | null>>
  setSide: Dispatch<SetStateAction<string | null>>
}

const castedBodyCoordinates = bodyCoordinates as Record<string, BodyPart>

export default function Body({
  bodyPartChangeHandler,
  setFace,
  setSide,
}: BodyProps) {
  const [clickedBodyPartText, setClickedBodyPartText] = useState(
    'Nenhuma selecionada',
  )

  function getClickBodyPlace(clickCoord: Coordinate) {
    for (const bodyPart in castedBodyCoordinates) {
      const currPart = (castedBodyCoordinates as Record<string, BodyPart>)[
        bodyPart
      ]

      const currPartCoords = currPart.coords
      const currPartFace = currPart.face
      const currPartSide = currPart.side

      if (
        ![
          currPartCoords.tl.x <= clickCoord.x,
          clickCoord.x <= currPartCoords.br.x,
          currPartCoords.br.y >= clickCoord.y,
          clickCoord.y >= currPartCoords.tl.y,
        ].includes(false)
      ) {
        console.log(clickCoord)

        setFace(currPartFace)
        setSide(currPartSide)

        return {
          success: true,
          payload: bodyPart,
        }
      }
    }

    setFace(null)
    setSide(null)

    return {
      success: false,
      payload: 'Nenhuma selecionada',
    }
  }

  function handleClick(clickEvent: any) {
    const x = clickEvent.nativeEvent.locationX
    const y = clickEvent.nativeEvent.locationY
    const clickCoordinates = { x, y }
    const clickResult = getClickBodyPlace(clickCoordinates)
    bodyPartChangeHandler(clickResult.success)
    if (clickResult.success) {
      setClickedBodyPartText(clickResult.payload)
    } else {
      setClickedBodyPartText(clickResult.payload)
    }
  }

  const [isMaiorQueCincoAnos, setIsMaiorQueCincoAnos] = useState(false)

  const reportId = useSelector((state: RootState) => state.report.reportId)

  useEffect(() => {
    const findReportData = async () => {
      const ageResponse = await findReports(reportId)

      if (Number(ageResponse.report.age) >= 5) {
        setIsMaiorQueCincoAnos(true)
      } else {
        setIsMaiorQueCincoAnos(false)
      }
    }
    findReportData()
  }, [reportId])

  return (
    <View className="mx-auto w-11/12">
      <TouchableOpacity onPress={handleClick} activeOpacity={0.7}>
        {isMaiorQueCincoAnos ? (
          <Image
            style={styles.bodyImage}
            source={require('./../../../../assets/anatomic-position.png')}
            alt="Representação do corpo humano para a identificação anatômica dos ferimentos"
            resizeMode="contain"
          />
        ) : (
          <Image
            style={styles.bodyImage}
            source={require('./../../../../assets/corpoCrianca.png')}
            alt="Representação do corpo humano para a identificação anatômica dos ferimentos"
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
      <Text className="text-md font-bold">Parte selecionada:</Text>
      <Text className="text-2xl font-bold">{clickedBodyPartText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  bodyImage: {
    width: '100%',
    resizeMode: 'cover',
  },
})
