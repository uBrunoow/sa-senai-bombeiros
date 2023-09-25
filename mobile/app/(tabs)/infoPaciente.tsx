import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InfoPacienteTitle from '../components/InfoPacienteTitle'
import InfoPacienteGroup from '../components/InfoPacienteGroup'

export default function Ocorrencia({ navigation }) {
  return (
    <SafeAreaView className="m-0 flex-1 p-0">
      <ScrollView>
        <View className="">
          <Header />
          <Text>Info. Paciente</Text>
          <View>
            <InfoPacienteTitle content="Sinais Vitais" />
            <InfoPacienteGroup />
          </View>
          <View>
            <InfoPacienteTitle content="Aval. do Paciênte (GLASGOW)" />
            <InfoPacienteGroup />
          </View>
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
