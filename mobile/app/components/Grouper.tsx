import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import { Feather, AntDesign } from '@expo/vector-icons'

type Grouperprops = {
  title: string
  desc: string
  isCompleted?: number
  howManyItems?: number
}

export default function Grouper(props: Grouperprops) {
  let color = '#0AC800'
  let icon = <Feather name="check" size={30} color="white" />

  if (props.isCompleted === 0) {
    color = 'white'
    icon = <Feather name="check" size={30} color="white" />
  } else if (
    props.isCompleted &&
    props.isCompleted >= 1 &&
    props.isCompleted <= 3
  ) {
    color = 'orange'
    icon = <AntDesign name="minus" size={40} color="white" />
  } else if (props.isCompleted === 4) {
    icon = <Feather name="check" size={30} color="white" />
  }

  const completedCount = props.isCompleted ?? 0
  return (
    <View
      style={styles.boxShadow}
      className=" m-auto mb-5 w-5/6 flex-row rounded-[7px] bg-white p-3 shadow-lg"
    >
      <View className="w-5/6 bg-transparent">
        <Text className="mb-7 text-[18px] font-bold uppercase">
          {props.title}
        </Text>
        <Text className="text text-[16px] leading-[16px]">{props.desc}</Text>
      </View>
      <View className="w-1/6 items-center justify-between">
        <View
          id="colorContainer"
          style={[styles.colorContainer, { backgroundColor: color }]}
          className="aspect-square w-[40px] items-center justify-center rounded-full"
        >
          {icon}
        </View>
        <Text className="text-center text-lg">
          {completedCount}/{props.howManyItems || 4}
        </Text>
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
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
})
