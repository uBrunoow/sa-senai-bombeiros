import { View, ScrollView, SafeAreaView, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import InfoPacienteTitle from '@app/(tabs)/InfoPaciente/components/InfoPacienteTitle'
import SinaisInfoPaciente from '@app/(tabs)/InfoPaciente/components/SinaisInfoPaciente'
import AvalPacienteGroup from '@app/(tabs)/InfoPaciente/components/AvalPacienteGroup'
import ProblemasSuspeitos from '@app/(tabs)/InfoPaciente/components/ProblemasSuspeitos'
import MainButton from '../../components/MainButton'
import { MaterialIcons } from '@expo/vector-icons'

export default function Ocorrencia() {
  return (
    <SafeAreaView className="m-0 flex-1 p-0">
      <ScrollView>
        <View className="">
          <Header />
          <View className=" mt-[34px] flex-row items-center justify-center">
            <MaterialIcons name="person-search" size={24} color="#A00e00" />
            <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
              Info. Paciente
            </Text>
          </View>
          <View>
            <InfoPacienteTitle content="Sinais Vitais" />
            <SinaisInfoPaciente />
          </View>
          <View>
            <InfoPacienteTitle content="Aval. do Paciênte (GLASGOW)" />
            <AvalPacienteGroup />
          </View>
          <View>
            <InfoPacienteTitle content="Problemas suspeitos encontrados" />
            <ProblemasSuspeitos />
          </View>
          <MainButton innerText="SALVAR" onPress={() => ({})} />
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
