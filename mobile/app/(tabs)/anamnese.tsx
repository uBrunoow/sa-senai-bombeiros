import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InputFull from '../components/inputs/InputFull'
import YesOrNo from '../components/YesOrNo'
import { AntDesign } from '@expo/vector-icons'
import MainButton from '../components/MainButton'
import InputClock from '../components/inputs/InputClock'

export default function Anamnese() {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        <Header />
        <View className="justfy-between aling-items w-347 h-1203 mb-4 flex-1">
          <View className="mb-[25px] mt-[34px] flex-row items-center justify-center">
            <AntDesign name="questioncircle" size={24} color="#A00E00" />
            <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
              Ocorrência
            </Text>
          </View>
          <View className="justfy-between aling-items w-347 h-1041 flex-1">
            <InputFull title="Sinais e Sintomas" isBig={true} />
            <View className="just-between aling-items flex-1">
              <YesOrNo Question="Aconteceu outras vezes?" />
            </View>
            <InputFull title="A quanto tempo isso aconteceu?" />
            <View className="just-between aling-items flex-1">
              <YesOrNo Question="Possui algum problema de saúde?" />
            </View>
            <InputFull title="Quais?" />
            <View className="just-between aling-items flex-1">
              <YesOrNo Question="Faz uso de medicação?" />
            </View>
            {/* TERMINAR ESSA PÁGINA!!! */}
            <InputFull title="Quais?" />
            {/* <InputFull title="Horário Ultima Med." isCalendar={true} /> */}
            <InputClock title="Horário Ultima Med." />
            <View className="just-between aling-items flex-1">
              <YesOrNo Question="Tem alguma alergia?" />
            </View>
            <InputFull title="Quais?" />
            <View className="w-92 h-67 flex-1">
              <View className="just-between aling-items flex-1">
                <YesOrNo Question="Ingeriu alimento/líquido nas últimas 6 horas?" />
              </View>
              <View className="just-between aling-items flex-1">
                {/* <InputFull title="Que Horas" isCalendar={true} /> */}
                <InputClock title="Que horas?" />
              </View>
            </View>
            <InputFull title="Observações Finais" isBig={true} />
          </View>
          <MainButton innerText={'VOLTAR'}></MainButton>
        </View>
        <Footer />
      </View>
    </ScrollView>
  )
}
