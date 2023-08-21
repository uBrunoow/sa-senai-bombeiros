import React from 'react'
import { TextInput, Text, View } from 'react-native'

export default function GestationPeriod() {
  return (
    <View className=" m-auto mb-4 w-4/6 flex-row flex-wrap justify-around">
      <Text className="mb-2 w-full text-center text-lg">
        Período de Gestação
      </Text>
      <TextInput className=" flex-1 rounded-lg border px-2"></TextInput>
      <Text className="mx-5 text-lg"> - </Text>
      <TextInput className="flex-1 rounded-lg border px-2"></TextInput>
    </View>
  )
}
