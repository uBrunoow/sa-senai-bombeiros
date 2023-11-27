import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import bodyCoordinates from './../utils/bodyCoordinates'
import childBodyCoordinates from './../utils/childBodyCoordinates'
import findReports from '@src/api/reports/findReport'
import { RootState } from '@src/redux/stores/stores'
import { useSelector } from 'react-redux'

type Coordinate = {
  x: number
  y: number
}

type BodyProps = {
  bodyPartValueHandler: Dispatch<SetStateAction<string | null>>
  bodyPartChangeHandler: Dispatch<SetStateAction<boolean>>
  setFace: Dispatch<SetStateAction<string | null>>
  setSide: Dispatch<SetStateAction<string | null>>
  clickedBodyPartText: string
  setClickedBodyPartText: Dispatch<SetStateAction<string>>
}

let castedBodyCoordinates

export default function Body({
  bodyPartValueHandler,
  bodyPartChangeHandler,
  setFace,
  setSide,
  clickedBodyPartText,
  setClickedBodyPartText,
}: BodyProps) {
  function getClickBodyPlace(clickCoord: Coordinate) {
    if (isMaiorQueCincoAnos) {
      castedBodyCoordinates = bodyCoordinates
    } else {
      castedBodyCoordinates = childBodyCoordinates
    }

    for (const bodyPart in castedBodyCoordinates) {
      const currPart = (
        castedBodyCoordinates as Record<
          string,
          (typeof castedBodyCoordinates)[keyof typeof castedBodyCoordinates]
        >
      )[bodyPart]

      const currPartCoords = currPart.coords
      const currPartFace = currPart.face
      const currPartSide = currPart.side
      const currPartValue = currPart.local

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
        bodyPartValueHandler(currPartValue)

        return {
          success: true,
          payload: bodyPart,
        }
      }
    }

    setFace(null)
    setSide(null)
    bodyPartValueHandler(null)

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

    console.log(clickCoordinates)
  }

  const [isMaiorQueCincoAnos, setIsMaiorQueCincoAnos] = useState<
    boolean | null
  >(null)

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
        {isMaiorQueCincoAnos === null ? (
          <View className="mb-6 mt-4 aspect-[6/7] w-full items-center justify-center rounded-xl bg-[#00000027]">
            <Text className="text-xl font-bold text-white drop-shadow-xl">
              Loading...
            </Text>
          </View>
        ) : isMaiorQueCincoAnos ? (
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
