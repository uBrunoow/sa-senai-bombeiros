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

export default function Ocorrencia() {
  const ProcedimentosEfetuadosData = useSelector(
    (state: RootState) =>
      state.procedimentosEfetuadosData?.procedimentosEfetuadosDataInfo,
  )
  const MateriaisUtilizadosDescartavelData = useSelector(
    (state: RootState) =>
      state.materialUtilizadoDescartavelData
        ?.materialUtilizadoDescartavelDataInfo,
  )
  const MateriaisDeixadosNoHospitalData = useSelector(
    (state: RootState) =>
      state.materialDeixadoNoHostpitalData?.materialDeixadoNoHostpitalDataInfo,
  )

  console.log(
    JSON.stringify(
      ProcedimentosEfetuadosData?.procedimentosEfetuadosDataInfo
        ?.procedimentosEfetuados,
      null,
      2,
    ),
  )

  const procedimentosComSizes = Object.entries(
    ProcedimentosEfetuadosData?.procedimentosEfetuadosDataInfo
      ?.procedimentosEfetuados || {},
  )
    .filter(
      ([key, value]) =>
        (value as { sizes?: string | null })?.sizes !== undefined,
    )
    .reduce((acc, [key, value]) => {
      acc[key as UProcedimentosEfetuadosNames] =
        value as TProcedimentosEfetuadosTypes[UProcedimentosEfetuadosNames]
      return acc
    }, {} as Partial<TProcedimentosEfetuadosTypes>)

  console.log(JSON.stringify(procedimentosComSizes, null, 2))

  const procedimentosComOptions = Object.entries(
    ProcedimentosEfetuadosData?.procedimentosEfetuadosDataInfo
      ?.procedimentosEfetuados || {},
  )
    .filter(
      ([key, value]) =>
        (value as { options?: string[] })?.options !== undefined,
    )
    .reduce((acc, [key, value]) => {
      acc[key as UProcedimentosEfetuadosNames] =
        value as TProcedimentosEfetuadosTypes[UProcedimentosEfetuadosNames]
      return acc
    }, {} as Partial<TProcedimentosEfetuadosTypes>)

  console.log(JSON.stringify(procedimentosComOptions, null, 2))

  const procedimentosComLPM = Object.entries(
    ProcedimentosEfetuadosData?.procedimentosEfetuadosDataInfo
      ?.procedimentosEfetuados || {},
  )
    .filter(([key, value]) => (value as { LPM?: number })?.LPM !== undefined)
    .reduce((acc, [key, value]) => {
      acc[key as UProcedimentosEfetuadosNames] =
        value as TProcedimentosEfetuadosTypes[UProcedimentosEfetuadosNames]
      return acc
    }, {} as Partial<TProcedimentosEfetuadosTypes>)

  console.log(JSON.stringify(procedimentosComLPM, null, 2))

  const materiaisComSizes = Object.entries(
    MateriaisUtilizadosDescartavelData?.materialUtilizadoDescartavelDataInfo
      ?.materialUtilizadoDescartavel || {},
  )
    .filter(
      ([key, value]) =>
        (
          value as {
            sizes?: { selectedSize: string | null; entries: string[] } | null
          }
        ).sizes !== undefined,
    )
    .reduce((acc, [key, value]) => {
      acc[key as UMaterialDescartaveisNames] =
        value as TMaterialUtilizadoDescartavelTypes[UMaterialDescartaveisNames]
      return acc
    }, {} as Partial<TMaterialUtilizadoDescartavelTypes>)

  console.log(JSON.stringify(materiaisComSizes, null, 2))

  const materiaisDeixadosComSizes = Object.entries(
    MateriaisDeixadosNoHospitalData?.materialDeixadoNoHostpitalDataInfo
      ?.materialDeixadoNoHostpital || {},
  )
    .filter(
      ([key, value]) =>
        (
          value as {
            sizes?: { selectedSize: string | null; entries: string[] } | null
          }
        ).sizes !== undefined,
    )
    .reduce((acc, [key, value]) => {
      acc[key as UMaterialDeixadoNoHospitalNames] =
        value as TMaterialDeixadoNoHostpitalTypes[UMaterialDeixadoNoHospitalNames]
      return acc
    }, {} as Partial<TMaterialDeixadoNoHostpitalTypes>)

  console.log(JSON.stringify(materiaisDeixadosComSizes, null, 2))

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
