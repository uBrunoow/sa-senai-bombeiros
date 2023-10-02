import { View, Text } from 'react-native'
import React from 'react'
import InputFull from './InputFull'

export default function SinaisInfoPaciente() {
  return (
    <View className="mx-auto w-5/6 flex-col rounded-md bg-white shadow-2xl">
      <View className="h-2/6 flex-1 ">
        <View className="w-3/6 flex-1">
          <Text>Pressão Arterial</Text>
          <View>
            <View className="rouded-lg border">
              <InputFull title="" size="small" />
            </View>
            <View>
              <Text>X</Text>
            </View>
            <View className="rouded-lg border">
              <InputFull title="" size="small" />
            </View>
          </View>
        </View>
        <View className="w-3/6 flex-1">
          <View className="rouded-lg border">
            <InputFull title="Temper." size="small" />
          </View>
        </View>
      </View>
      <View>
        <View className="w-3/6 flex-1">
          <View className="rouded-lg border">
            <InputFull title="Pulso" size="small" />
          </View>
          <View className="w-3/6 flex-1">
            <View className="rouded-lg border">
              <InputFull title="Respiração" size="small" />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
