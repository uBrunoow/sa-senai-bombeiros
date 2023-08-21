import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

type Grouperprops = {
  title: string
  desc: string
}

export default function Grouper(props: Grouperprops) {
  return (
    <TouchableOpacity>
      <View
        style={styles.boxShadow}
        className=" m-auto mb-5 w-5/6 flex-row rounded-[7px] bg-white p-3 shadow-lg"
      >
        <View className="b-black w-5/6">
          <Text className="mb-7 text-xl font-bold uppercase">
            {props.title}
          </Text>
          <Text className="text text-[16px] leading-[16px]">{props.desc}</Text>
        </View>
        <View className="w-1/6 items-center justify-between">
          <View className="aspect-square w-[40px] items-center justify-center rounded-full bg-[#0AC800]">
            <Feather name="check" size={30} color="white" />
          </View>
          <Text className="text-center text-lg">4/4</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOpacity: 0,
    shadowRadius: 4,
    textShadowOffset: { width: 8, height: 2 },
  },
})
