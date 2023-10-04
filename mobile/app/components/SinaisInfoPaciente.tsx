import { View, Text } from 'react-native'
import React from 'react'
import InputLowPadding from './InputLowPadding'
import YesOrNo from './YesOrNo'
import Options from './optionsIntroducao'

export default function SinaisInfoPaciente() {
  return (
    <View className="mx-auto w-5/6 flex-col rounded-md bg-white shadow-2xl">
      <View className="mx-5 flex-row border-b-[1px] border-black">
        <View className="center-between w-3/6 flex-1 items-center  ">
          <View className="w-6/6 mx-auto flex-1 ">
            <Text className="text-center text-lg">Pressão arterial</Text>
            <View className="w-[150px] flex-row items-center justify-center">
              <InputLowPadding />
              <Text className="text-[20px]">X</Text>
              <InputLowPadding />
              <Text>mmHg</Text>
            </View>
          </View>
        </View>
        <View className="center-between ml-7 w-3/6 flex-1 items-center">
          <View className="w-6/6 mx-auto flex-1 ">
            <Text className="text-center text-lg">Temper.</Text>
            <View className="flex-row items-center justify-center">
              <InputLowPadding />
              <Text>°C</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-row">
        <View className="center-between w-3/6 flex-1 items-center">
          <View className="mx-auto w-5/6 flex-1 flex-row">
            <InputLowPadding title="Pulso" />
          </View>
        </View>
        <View className="center-between w-3/6 flex-1 items-center">
          <View className="w-6/6 mx-auto flex-1 flex-row">
            <InputLowPadding title="Respiração" />
          </View>
        </View>
      </View>
      <View className="flex-row">
        <View className="center-between w-3/6 flex-1 items-center">
          {/* <Text>Saturação</Text> */}
          <View className="w-6/6 mx-auto flex-1 flex-row">
            <InputLowPadding title="Saturação" />
          </View>
        </View>
        <View className="center-between w-3/6 flex-1 items-center">
          <View className="w-6/6 mx-auto flex-1 flex-row">
            <Options title="" Option1=">2 seg" Option2="" />
          </View>
        </View>
      </View>
    </View>
  )
}
