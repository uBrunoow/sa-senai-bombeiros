import { View, Text } from 'react-native'
import React from 'react'
import InputLowPadding from '@app/components/InputLowPadding'
import Options from '@app/components/optionsIntroducao'
import { styles as s } from '@app/styles/boxShadow'

export default function SinaisInfoPaciente() {
  return (
    <View
      style={s.boxShadow}
      className=" mx-auto w-[90%] rounded-[14px] bg-white px-[17px] py-[30px] shadow-md"
    >
      <View className="w-full flex-row border-b border-black pb-3">
        <View className="w-3/6 flex-1 items-center  ">
          <View className="w-6/6 mx-auto flex-1 ">
            <Text className="text-center text-base font-medium">
              Pressão arterial
            </Text>
            <View className="w-[150px] flex-row items-center justify-center">
              <InputLowPadding size="small" />
              <Text className="text-[20px]">X</Text>
              <InputLowPadding size="small" />
              <Text>mmHg</Text>
            </View>
          </View>
        </View>
        <View className="center-between ml-7 w-3/6 flex-1 items-center">
          <View className="w-6/6 mx-auto flex-1 ">
            <Text className="text-center text-base font-medium">Temper.</Text>
            <View className="w-[100px] flex-row items-center justify-center">
              <InputLowPadding />
              <Text>°C</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="mt-3 w-full flex-row border-b-[1px] border-black pb-3">
        <View className="center-between w-3/6 flex-1 items-center">
          <Text className="text-center text-base font-medium">Pulso</Text>
          <View className="w-[130px] flex-row items-center justify-center">
            <InputLowPadding />
            <Text className="uppercase">b.c.p.m</Text>
          </View>
        </View>
        <View className="center-between w-3/6 flex-1 items-center">
          <Text className="text-center text-base font-medium">Respiração</Text>
          <View className="w-[130px] flex-row items-center justify-center">
            <InputLowPadding />
            <Text className="uppercase">m.r.m</Text>
          </View>
        </View>
      </View>
      <View className="mt-3 w-full flex-row">
        <View className="center-between w-3/6 flex-1 items-center">
          <Text className="text-center text-base font-medium">Saturação</Text>
          <View className="w-[130px] flex-row items-center justify-center">
            <InputLowPadding />
            <Text>%</Text>
          </View>
        </View>
        <View className="center-between w-3/6 flex-1 items-center">
          <Text className="text-center text-base font-medium">Perfusão</Text>
          <View className="">
            <Options Option1=">2 seg." Option2="<2 seg." />
          </View>
        </View>
      </View>
    </View>
  )
}
