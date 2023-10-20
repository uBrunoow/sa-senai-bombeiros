import { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import bodyCoordinates from './../utils/bodyCoordinates.json'

type BodyCoordinate = {
  x: Number | null
  y: Number | null
}

export default function Body() {
  const [clickCoord, setClickCoord] = useState<BodyCoordinate>({
    x: null,
    y: null,
  })

  function getClickBodyPlace(clickCoord: BodyCoordinate) {
    for (const bodyPart in bodyCoordinates) {
      console.log(`Mano: '${bodyPart}'`)
    }

    return 'Ok'
  }

  function handleClick(clickEvent: any) {
    const x = clickEvent.nativeEvent.locationX
    const y = clickEvent.nativeEvent.locationY
    const clickCoordinates = { x, y }
    getClickBodyPlace(clickCoordinates)
    setClickCoord(clickCoordinates)
  }

  return (
    <View className="w-11/12">
      <TouchableOpacity onPress={handleClick}>
        <Image
          style={styles.bodyImage}
          source={require('./../../../../assets/anatomic-position.png')}
          // source={{
          //   //   uri: './../../../../assets/anatomic-position.png',
          //   uri: './anatomic-position.png',
          // }}
          alt="Representação do corpo humano para a identificação anatômica dos ferimentos"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text>Mano: {JSON.stringify(clickCoord)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  bodyImage: {
    width: '100%',
    resizeMode: 'cover',
  },
})
