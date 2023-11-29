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
  TMaterialUtilizadoDescartavelTypes,
  UMaterialDescartaveisNames,
  TMaterialDeixadoNoHostpitalTypes,
  UMaterialDeixadoNoHospitalNames,
} from './utils/usageTableMaterials'
import Checkboxes from './components/Checkboxes'
import {
  ProcedimentosEfetuadosDef,
  TProcedimentosEfetuadosTypes,
  UProcedimentosEfetuadosNames,
} from './utils/prodAccomplished'
import { useSelector } from 'react-redux'
import { RootState } from '@src/redux/stores/stores'
import updateInfoHospitalar from '@src/api/reports/infoHospitalar/updateInfoHospitalar'
import MainButton from '@app/components/MainButton'

export default function Ocorrencia() {
  const ProcedimentosEfetuadosData = useSelector(
    (state: RootState) =>
      state?.procedimentosEfetuadosData?.procedimentosEfetuadosDataInfo,
  )
  const MateriaisUtilizadosDescartavelData = useSelector(
    (state: RootState) =>
      state?.materialUtilizadoDescartavelData
        ?.materialUtilizadoDescartavelDataInfo,
  )
  const MateriaisDeixadosNoHospitalData = useSelector(
    (state: RootState) =>
      state?.materialDeixadoNoHostpitalData?.materialDeixadoNoHostpitalDataInfo,
  )

  // Assuming you have these functions to adapt the data
  const adaptProcedimentosEfetuados = (data) => {
    return Object.entries(data).map(([key, value]) => ({
      name: value?.name,
      state: value?.state || false,
      sizes: value?.sizes || null,
      LPM: value?.LPM || null,
      options: value?.options || [''],
    }))
  }

  const adaptMateriaisDescartaveis = (data) => {
    return Object.entries(data).map(([key, value]) => ({
      state: value?.state || false,
      name: value?.name || '',
      quantity: value?.quantity || null,
      sizes: value?.sizes || null,
    }))
  }

  const adaptMateriaisDeixadosNoHospital = (data) => {
    return Object.entries(data).map(([key, value]) => ({
      state: value?.state || false,
      name: value?.name || '',
      quantity: value?.quantity || null,
      sizes: value?.sizes || null,
    }))
  }

  // Adapt the data
  const adaptedProcedimentosEfetuados = adaptProcedimentosEfetuados(
    ProcedimentosEfetuadosData?.procedimentosEfetuadosDataInfo
      ?.procedimentosEfetuados || {},
  )
  const adaptedMateriaisDescartaveis = adaptMateriaisDescartaveis(
    MateriaisUtilizadosDescartavelData?.materialUtilizadoDescartavelDataInfo
      ?.materialUtilizadoDescartavel || {},
  )
  const adaptedMateriaisDeixadosNoHospital = adaptMateriaisDeixadosNoHospital(
    MateriaisDeixadosNoHospitalData?.materialDeixadoNoHostpitalDataInfo
      ?.materialDeixadoNoHostpital || {},
  )

  console.log(JSON.stringify(adaptedProcedimentosEfetuados, null, 2))
  console.log(JSON.stringify(adaptedMateriaisDescartaveis, null, 2))
  console.log(JSON.stringify(adaptedMateriaisDeixadosNoHospital, null, 2))

  const infoHospitalarId = useSelector(
    (state: RootState) => state.infoHospitalar.infoHospitalarId,
  )
  const ReportOwnerId = useSelector((state: RootState) => state.report.reportId)

  const handleSubmitInfoHospitalares = async () => {
    const response = await updateInfoHospitalar(
      infoHospitalarId,
      ReportOwnerId,
      adaptedProcedimentosEfetuados,
      adaptedMateriaisDescartaveis,
      adaptedMateriaisDeixadosNoHospital,
    )
  }

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
          <MainButton
            innerText={'ENVIAR'}
            onPress={handleSubmitInfoHospitalares}
          />

          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
