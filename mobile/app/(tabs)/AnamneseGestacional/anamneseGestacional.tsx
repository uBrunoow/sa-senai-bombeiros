import { View, ScrollView, Text, Pressable } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Footer from '../../components/Footer'
import { FontAwesome5 } from '@expo/vector-icons'
import MainButton from '../../components/MainButton'
import YesOrNo from '../../components/YesOrNo'
import GestationPeriod from '../../components/GestationPeriod'
import InputFull from '../../components/InputFull'

export default function AnamneseGestacional({ navigation }) {
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
            Anamnese Gestacional
          </Text>
        </View>
        <GestationPeriod />
        <YesOrNo Question="Fez pré-natal?"></YesOrNo>
        <InputFull title="Nome do médico"></InputFull>
        <YesOrNo Question="Possibilidade de complicações?"></YesOrNo>
        <YesOrNo Question="Pressão no quadril/vontade de evacuar?"></YesOrNo>
        <YesOrNo Question="Já houve ruptura da bolsa?"></YesOrNo>
        <YesOrNo Question="Foi feito inspeção visual?"></YesOrNo>
        {/* TERMINAR ESSA PÁGINA!!! */}
        <YesOrNo Question="Parto realizado?"></YesOrNo>
        <Pressable onPress={() => navigation.navigate(`ocorrencia`)}>
          <MainButton innerText="VOLTAR"></MainButton>
        </Pressable>
      </View>
      <Footer />
    </ScrollView>
  )
}
