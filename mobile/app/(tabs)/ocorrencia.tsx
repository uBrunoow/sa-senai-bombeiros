import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Grouper from '../components/Grouper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Footer from '../components/Footer'
import { FontAwesome5 } from '@expo/vector-icons'
import MainButton from '../components/MainButton'

export default function Ocorrencia({ navigation }) {
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
            Ocorrência
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(`introducao`)}>
          <Grouper
            title="Introdução"
            desc="Dados da vítima, tipo ocorr..."
            isCompleted={4}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(`anamnese`)}>
          <Grouper
            title="Anamnese de Emergência"
            desc="Sinais e sintomas, observações..."
            isCompleted={2}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(`info-paciente`)}>
          <Grouper
            title="Info. do paciente"
            desc="Aval. paciente, sinais vitais..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(`local-traumas`)}>
          <Grouper
            title="Localizações da Fratura"
            desc="Local dos traumas, tipo trau..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`info-transporte`)}
        >
          <Grouper
            title="Info. de Transporte"
            desc="Condução, condição transp..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`info-hospitalares`)}
        >
          <Grouper
            title="Info. Hospitalares"
            desc="Procedimentos efetuados..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`anamnese-gestacional`)}
        >
          <Grouper
            title="Anamnese Gestacional"
            desc="Período gestação, pré-natal..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(`finalizacao`)}>
          <Grouper
            title="Finalização"
            desc="Observações, objetos..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <MainButton innerText="FINALIZAR" />
      </View>
      <Footer />
    </ScrollView>
  )
}
