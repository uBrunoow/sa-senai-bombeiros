import { View, ScrollView, Text, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Options from '../../components/optionsIntroducao'
import InputLowPadding from '../../components/InputLowPadding'
import { styles as s } from '../../styles/boxShadow'
import { RootState } from '@src/redux/stores/stores'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Introducao({ navigation }) {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        <Header />
        <View className="mb-[40px] mt-[34px] flex-row items-center justify-center">
          <FontAwesome5 name="suitcase" size={24} color="#A00E00" />
          <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
            Introdução
          </Text>
        </View>
        <View style={s.boxShadow}>
          <View className="w-full flex-1 flex-row">
            <View className="w-3/6 flex-col items-center justify-around">
              <Text>DATA</Text>
              <TextInput> |DATA|</TextInput>
            </View>
            <View className="w-3/6 items-center justify-between">
              <Options title="Sexo" Option1="Masc." Option2="Fem."></Options>
            </View>
          </View>
          <View className="mx-auto flex-1 flex-row">
            <InputLowPadding title="Nome" size="regular" alignText="left" />
            <InputLowPadding title="Idade" size="small" />
          </View>
          <InputLowPadding title="RG/CPF" placeholder="___.___.___-__" />
          <InputLowPadding title="Fone" placeholder="(__) _____-____" />
          <InputLowPadding title="Local da Ocorrência" />
          <View className="mx-auto flex-1 flex-row">
            <InputLowPadding title="Acompanhante" size="regular" />
            <InputLowPadding title="Idade" size="small" />
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  )
}
