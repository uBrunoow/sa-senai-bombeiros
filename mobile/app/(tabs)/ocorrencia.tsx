import { View, ScrollView, Text } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Grouper from '../components/Grouper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Ocorrencia() {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        <Header />
        <Text>Ocorrencia</Text>
        <Grouper title="Introdução" desc="Dados da vítima, tipo ocorr..." />
        <Grouper
          title="Anamnese de Emergência"
          desc="Sinais e sintomas, observações..."
        />
        <Grouper
          title="Info. do paciente"
          desc="Aval. paciente, sinais vitais..."
        />
        <Grouper
          title="Localizações da Fratura"
          desc="Local dos traumas, tipo trau..."
        />
        <Grouper
          title="Info. de Transporte"
          desc="Condução, condição transp..."
        />
        <Grouper title="Info. Hospitalares" desc="Procedimentos efetuados..." />
        <Grouper
          title="Anamnese Gestacional"
          desc="Período gestação, pré-natal..."
        />
        <Grouper title="Finalização" desc="Observações, objetos..." />
      </View>
    </ScrollView>
  )
}
