import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

type Grouperprops = {
  title: string
  desc: string
  isCompleted?: number
}

export default function Grouper(props: Grouperprops) {
  return (
    <View
      style={styles.boxShadow}
      className=" m-auto mb-5 w-5/6 flex-row rounded-[7px] bg-white p-3 shadow-lg"
    >
      <View className="b-black w-5/6">
        <Text className="mb-7 text-[18px] font-bold uppercase">
          {props.title}
        </Text>
        <Text className="text text-[16px] leading-[16px]">{props.desc}</Text>
      </View>
      <View className="w-1/6 items-center justify-between">
        <View
          id="colorContainer"
          style={styles.colorContainer}
          className="aspect-square w-[40px] items-center justify-center rounded-full"
        >
          <Feather name="check" size={30} color="white" />
        </View>
        <Text className="text-center text-lg">{props.isCompleted}/4</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOpacity: 0,
    shadowRadius: 4,
    textShadowOffset: { width: 8, height: 2 },
  },
  colorContainer: {
    backgroundColor: '#0AC800',
  },
})
