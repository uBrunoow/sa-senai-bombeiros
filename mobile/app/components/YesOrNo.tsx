import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

type YesOrNoProps = {
  Question: String
}

export default function YesOrNo(props: YesOrNoProps) {
  return (
    <View className="m-auto mb-4 w-4/6 flex-row flex-wrap justify-around">
      <Text className="mb-2 w-full text-center text-lg">{props.Question}</Text>
      <TouchableOpacity
        style={(styles.button, styles.selected)}
        className="border"
      >
        <Text className="text-white">SIM</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} className="border">
        <Text>NÃO</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingRight: 50,
    paddingLeft: 50,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.28)',
  },

  selected: {
    paddingRight: 50,
    paddingLeft: 50,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: '#A00E00',
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.28)',
  },
})
