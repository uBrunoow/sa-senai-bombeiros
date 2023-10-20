import { Dispatch, SetStateAction, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import bodyCoordinates from './../utils/bodyCoordinates.json'

type Coordinate = {
  x: number
  y: number
}

type BodyPartCoordinates = {
  tl: Coordinate
  br: Coordinate
}

type bodyPartsCoordinates = {
  [key: string]: BodyPartCoordinates
}

type BodyProps = {
  bodyPartChangeHandler: Dispatch<SetStateAction<boolean>>
}

const castedBodyCoordinates = bodyCoordinates as bodyPartsCoordinates

export default function Body({ bodyPartChangeHandler }: BodyProps) {
  const [clickedBodyPartText, setClickedBodyPartText] = useState(
    'Nenhuma selecionada',
  )

  function getClickBodyPlace(clickCoord: Coordinate) {
    for (const bodyPart in castedBodyCoordinates) {
      const currPart = (
        castedBodyCoordinates as Record<string, BodyPartCoordinates>
      )[bodyPart]

      if (
        ![
          currPart.tl.x <= clickCoord.x,
          clickCoord.x <= currPart.br.x,
          currPart.br.y >= clickCoord.y,
          clickCoord.y >= currPart.tl.y,
        ].includes(false)
      ) {
        return {
          success: true,
          payload: bodyPart,
        }
      }
    }

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

  return (
    <View className="mx-auto w-11/12">
      <TouchableOpacity onPress={handleClick} activeOpacity={0.7}>
        <Image
          style={styles.bodyImage}
          source={require('./../../../../assets/anatomic-position.png')}
          alt="Representação do corpo humano para a identificação anatômica dos ferimentos"
          resizeMode="contain"
        />
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
