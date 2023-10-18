import { View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import InfoPacienteTitle from '@app/(tabs)/InfoPaciente/components/InfoPacienteTitle'
import SinaisInfoPaciente from '@app/(tabs)/InfoPaciente/components/SinaisInfoPaciente'
import AvalPacienteGroup from '@app/(tabs)/InfoPaciente/components/AvalPacienteGroup'
import ProblemasSuspeitos from '@app/(tabs)/InfoPaciente/components/ProblemasSuspeitos'
import MainButton from '../../components/MainButton'
import Title from '@app/components/Title'

export default function Ocorrencia() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Header />
          <Title iconName="user-alt" title="Informações do Paciente" />
          <InfoPacienteTitle content="Sinais Vitais" />
          <SinaisInfoPaciente />
          <InfoPacienteTitle content="Aval. do Paciênte (GLASGOW)" />
          <AvalPacienteGroup />
          <InfoPacienteTitle content="Problemas suspeitos encontrados" />
          <ProblemasSuspeitos />
          <MainButton innerText="SALVAR" onPress={() => ({})} />
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
