import { View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import { styles as s } from '../../styles/boxShadow'
import Subtitle from '@app/components/Subtitle'
import InputLowPadding from '@app/components/InputLowPadding'
import ProcedEfetuados from './components/procedEfetuados'
import MateriaisUtilizados from './components/materiaisUtilizados'
import MateriaisUtilizadosDeixados from './components/materiaisDeixados'
export default function Ocorrencia() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Header />
          <Title iconName="ambulance" title="Informações Hospitalares" />
          <Subtitle content="Equipe de Atendimento" />
          <View style={s.boxShadow} className="mx-auto">
            <InputLowPadding alignText="left" title="Médico" />
            <InputLowPadding alignText="left" title="S1" />
            <InputLowPadding alignText="left" title="S2" />
            <InputLowPadding alignText="left" title="S3" />
            <InputLowPadding alignText="left" title="Demandante" />
            <InputLowPadding alignText="left" title="Equipe" />
          </View>
          <Subtitle content="Procedimentos efetuados" />
          <ProcedEfetuados />
          <Subtitle content="Materiais utilizados" />
          <MateriaisUtilizados />
          <Subtitle content="Materiais utilizados (deixados no hospital)" />
          <MateriaisUtilizadosDeixados />
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
