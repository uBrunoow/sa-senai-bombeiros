import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InfoPacienteTitle from '../components/InfoPacienteTitle'
import SinaisInfoPaciente from '../components/SinaisInfoPaciente'
import AvalPacienteroup from '../components/AvalPacienteGroup'

export default function Ocorrencia({ navigation }) {
  return (
    <SafeAreaView className="m-0 flex-1 p-0">
      <ScrollView>
        <View className="">
          <Header />
          <Text>Info. Paciente</Text>
          <View>
            <InfoPacienteTitle content="Sinais Vitais" />
            <SinaisInfoPaciente />
          </View>
          <View>
            <InfoPacienteTitle content="Aval. do Paciênte (GLASGOW)" />
            <AvalPacienteroup />
          </View>
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
