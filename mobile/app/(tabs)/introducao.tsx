import { View, ScrollView, Text, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Options from '../components/optionsIntroducao'
import InputLowPadding from '../components/InputLowPadding'
import { styles as s } from '../components/styles/boxShadow'

export default function Introducao() {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        <Header />
        <View className="mb-[40px] mt-[34px] flex-row items-center justify-center">
          <FontAwesome5 name="fire" size={24} color="#A00E00" />
          <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
            Introdução
          </Text>
        </View>
        <View className=" flex-1 flex-row">
          <View className=" items-centerjustify-around w-3/6 flex-col  border">
            <Text>DATA</Text>
            <TextInput> |DATA|</TextInput>
          </View>
          <View className=" w-3/6 items-center justify-between border">
            <Options title="Sexo"></Options>
          </View>
        </View>
        <View className="mx-auto w-5/6 flex-1 flex-row">
          <InputLowPadding title="Nome" size="regular" />
          <InputLowPadding title="Idade" size="small" />
        </View>
        <InputLowPadding title="RG/CPF" />
        <InputLowPadding title="Fone" />
        <InputLowPadding title="Local da Ocorrência" />
        <View className="mx-auto w-5/6 flex-1 flex-row">
          <InputLowPadding title="Acompanhante" size="regular" />
          <InputLowPadding title="Idade" size="small" />
        </View>
      </View>
      <Footer />
    </ScrollView>
  )
}
