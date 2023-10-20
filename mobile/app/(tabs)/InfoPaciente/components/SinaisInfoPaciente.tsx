import { View, Text } from 'react-native'
import React, { useState } from 'react'
import InputLowPadding from '@app/components/InputLowPadding'
import Perfusaoinfo from './Perfusaoinfo'
import { styles as s } from '@app/styles/boxShadow'
import Options from '@app/components/optionsIntroducao'

type perfusaoInfoOption = '>2seg' | '<2seg' | ''

export default function SinaisInfoPaciente() {
  const [perfusaoOption, setPerfusaoOption] = useState<perfusaoInfoOption>('')

  function handleSetPerfusaoInfo(option: perfusaoInfoOption) {
    setPerfusaoOption(option)
  }

  return (
    <View
      style={s.boxShadow}
      className=" mx-auto w-[90%] rounded-[14px] bg-white px-[17px] py-[30px] shadow-md"
    >
      <View className="w-full flex-row pb-3">
        <View className="mt-3 w-full flex-row border-b-[1px] border-black pb-3">
          <View className="center-between w-3/6 flex-1 items-center">
            <Text className="text-center text-base font-medium">
              Pressão arterial
            </Text>
            <View className="flex-row items-center justify-center">
              <InputLowPadding />
              <Text className="uppercase">X</Text>
              <InputLowPadding />
              <Text>mmHg</Text>
            </View>
          </View>
          <View className="center-between w-3/6 flex-1 items-center">
            <Text className="text-center text-base font-medium">Temper.</Text>
            <View className="w-[130px] flex-row items-center justify-center">
              <InputLowPadding />
              <Text className="uppercase">°C</Text>
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
            <Perfusaoinfo
              selectedOption={perfusaoOption}
              onSelectOption={handleSetPerfusaoInfo}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
