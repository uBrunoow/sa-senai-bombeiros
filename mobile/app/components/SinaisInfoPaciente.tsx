import { View, Text } from 'react-native'
import React from 'react'
import InputLowPadding from './InputLowPadding'
import YesOrNo from './YesOrNo'
import Options from './optionsIntroducao'

export default function SinaisInfoPaciente() {
  return (
    <View className="mx-auto w-5/6 flex-col rounded-md bg-white shadow-2xl">
      <View className="flex-row">
        <View className="center-between w-3/6 flex-1 items-center  ">
          <View className="w-6/6 mx-auto flex-1 flex-row" border-b>
            <InputLowPadding title="Pressão" />
            <InputLowPadding title="Arterial" />
          </View>
          <View className="w-6/6 border-2"></View>
        </View>
        <View className="center-between w-3/6 flex-1 items-center">
          <View className="mx-auto w-5/6 flex-1 flex-row">
            <InputLowPadding title="Temp." />
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
