import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InputFull from '../components/InputFull'
import YesOrNo from '../components/YesOrNo'

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
          <Text>Anamnese</Text>
          <View className="justfy-between aling-items w-347 h-1041 flex-1">
            <InputFull title="Sinais e Sintomas" />
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
            <InputFull title="Horário Ultima Med." isCalendar={true} />
            <View className="just-between aling-items flex-1">
              <YesOrNo Question="Tem alguma alergia?" />
            </View>
            <InputFull title="Quais?" />
            <View className="w-92 h-67 flex-1">
              <View className="just-between aling-items flex-1">
                <YesOrNo Question="Ingeriu alimento/líquido nas últimas 6 horas?" />
              </View>
              <View className="just-between aling-items flex-1">
                <InputFull title="Que Horas" isCalendar={true} />
              </View>
            </View>
            <InputFull title="Observações Finais" />
          </View>
        </View>
        <Footer />
      </View>
    </ScrollView>
  )
}
