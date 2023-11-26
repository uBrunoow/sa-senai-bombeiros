import { View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import { styles as s } from '../../styles/boxShadow'
import Subtitle from '@app/components/Subtitle'
import InputLowPadding from '@app/components/InputLowPadding'
import UsageTableDesc from './components/UsageTableDesc'
import UsageTableHosp from './components/UsageTableHosp'
import {
  MaterialUtilizadoDescartavelDef,
  MaterialDeixadoNoHostpitalDef,
} from './utils/usageTableMaterials'
import Checkboxes from './components/Checkboxes'
import { ProcedimentosEfetuadosDef } from './utils/prodAccomplished'

export default function Ocorrencia() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Header />
          <Title iconName="ambulance" title="Informações Hospitalares" />
          <Subtitle content="Equipe de Atendimento" />
          <View style={s.boxShadow} className="mx-auto">
            <View className="flex-row">
              <InputLowPadding alignText="left" title="Médico" />
              <InputLowPadding alignText="left" title="S1" />
            </View>
            <View className="flex-row">
              <InputLowPadding alignText="left" title="S2" />
              <InputLowPadding alignText="left" title="S3" />
            </View>
            <View className="flex-row">
              <InputLowPadding alignText="left" title="Demandante" />
              <InputLowPadding alignText="left" title="Equipe" />
            </View>
          </View>
          <Subtitle content="Procedimentos efetuados" />
          <View style={s.boxShadow} className="mx-auto">
            <Checkboxes checkboxEntries={ProcedimentosEfetuadosDef} />
          </View>
          <Subtitle content="Materiais descartáveis utilizados" />
          <UsageTableDesc
            MaterialUtilizadoDescartavelDef={MaterialUtilizadoDescartavelDef}
          />
          <Subtitle content="Materiais deixados no hospital" />
          <UsageTableHosp
            MaterialDeixadoNoHostpitalDef={MaterialDeixadoNoHostpitalDef}
          />
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
