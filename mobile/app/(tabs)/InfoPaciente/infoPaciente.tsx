import { View, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SinaisInfoPaciente from '@app/(tabs)/InfoPaciente/components/SinaisInfoPaciente'
import AvalPacienteGroup from '@app/(tabs)/InfoPaciente/components/AvalPacienteGroup'
import ProblemasSuspeitos from '@app/(tabs)/InfoPaciente/components/ProblemasSuspeitos'
import MainButton from '../../components/MainButton'
import Title from '@app/components/Title'
import { RootState } from '@src/redux/stores/stores'
import { useDispatch, useSelector } from 'react-redux'
import updateSinaisVitaisReport from '@src/api/reports/sinaisVitais/updateSinaisVitais'
import updateSuspectProblems from '@src/api/reports/suspectProblems/updateSuspectProblems'
import updateGlasgow from '@src/api/reports/glasgow/updateGlasgow'
import { useToast } from 'native-base'
import { determineCompletness } from './utils/determineCompletness'
import { saveInfoPacienteCompletness } from '@src/redux/reducers/completnessReducer'
import Subtitle from '@app/components/Subtitle'

export default function InfoPatient({ navigation }: any) {
  const dispatch = useDispatch()
  const [buttonLoading, setButtonLoading] = useState(false)

  const InfoPatient = useSelector(
    (state: RootState) => state.infoPaciente.patientInfo,
  )
  const SuspectProblemsData = useSelector(
    (state: RootState) => state.suspectProblemsData.suspectProblems,
  )
  const GlasgowData = useSelector(
    (state: RootState) => state.glasgowData.glasgow,
  )

  const reportId = useSelector((state: RootState) => state.report.reportId)
  const ownerId = useSelector((state: RootState) => state.auth.userId)
  const ReportOwnerId = useSelector((state: RootState) => state.report.reportId)
  const suspectProblemsId = useSelector(
    (state: RootState) => state.suspectProblems.suspectProblemsId,
  )
  const glasgowId = useSelector((state: RootState) => state.glasgow.glasgowId)

  // Infos paciente, sinais vitais data
  const diastolicBloodPressure =
    InfoPatient?.patientInfo?.diastolicBloodPressure
  const systolicBloodPressure = InfoPatient?.patientInfo?.systolicBloodPressure
  const bodyTemp = InfoPatient?.patientInfo?.bodyTemp
  const bodyPulse = InfoPatient?.patientInfo?.bodyPulse
  const breathing = InfoPatient?.patientInfo?.breathing
  const saturation = InfoPatient?.patientInfo?.saturation
  const perfusion = InfoPatient?.patientInfo?.perfusion

  console.log(perfusion)

  // Infos paciente, problemas suspeitos data
  const transportSuboptionsData =
    SuspectProblemsData?.suspectProblems?.transportSuboptions || {}
  const diabetesSuboptionsData =
    SuspectProblemsData?.suspectProblems?.diabetesSuboptions || {}
  const obstericoSuboptionsData =
    SuspectProblemsData?.suspectProblems?.obstericoSuboptions || {}
  const respiratorioSuboptionsData =
    SuspectProblemsData?.suspectProblems?.respiratorioSuboptions || {}
  const psiquiatricoSuboptionsData =
    SuspectProblemsData?.suspectProblems?.psiquiatricoSuboptions || false
  const Another = SuspectProblemsData?.suspectProblems?.AnotherData || ''

  const transportSuboptions = Object.entries(transportSuboptionsData)
    .filter(([key, value]) => value)
    .map(([key]) => key)

  const diabetesSuboptions = Object.entries(diabetesSuboptionsData)
    .filter(([key, value]) => value)
    .map(([key]) => key)

  const obstericoSuboptions = Object.entries(obstericoSuboptionsData)
    .filter(([key, value]) => value)
    .map(([key]) => key)

  const respiratorioSuboptions = Object.entries(respiratorioSuboptionsData)
    .filter(([key, value]) => value)
    .map(([key]) => key)

  // Infos paciente, glasgow data
  const aberturaOcular = GlasgowData?.glasgow?.aberturaOcular
  const respostaMotora = GlasgowData?.glasgow?.respostaMotora
  const respostaVerbal = GlasgowData?.glasgow?.respostaVerbal

  const toast = useToast()

  const removeMetaProperties = (obj) => {
    const {
      id,
      createdAt,
      updatedAt,
      ReportOwnerId,
      ownerId,
      reportPlace,
      phone,
      cpf,
      gender,
      age,
      name,
      reportDate,
      followUp,
      followUpAge,
      ...withoutMeta
    } = obj
    return withoutMeta
  }

  const handleSubmitInfoPaciente = async () => {
    try {
      setButtonLoading(true)
      const SinaisVitaisResponse = await updateSinaisVitaisReport(
        ownerId,
        reportId,
        diastolicBloodPressure,
        systolicBloodPressure,
        bodyTemp,
        bodyPulse,
        breathing,
        saturation,
        perfusion,
      )

      const sinaisVitaisWithoutMeta = removeMetaProperties(
        SinaisVitaisResponse.updatedReport,
      )

      let sinaisVitaisEmpty = 0
      const emptyFields = []

      for (const key in sinaisVitaisWithoutMeta) {
        if (
          sinaisVitaisWithoutMeta[key] === '' ||
          sinaisVitaisWithoutMeta[key] === 0 ||
          sinaisVitaisWithoutMeta[key] === false ||
          (Array.isArray(sinaisVitaisWithoutMeta[key]) &&
            sinaisVitaisWithoutMeta[key].length === 0) ||
          sinaisVitaisWithoutMeta[key] === null
        ) {
          sinaisVitaisEmpty++
          emptyFields.push(key)
        }
      }

      console.log('Campos vazios em Glasgow:', emptyFields)

      console.log(SinaisVitaisResponse)

      const SuspectProblemsResponse = await updateSuspectProblems(
        ReportOwnerId,
        suspectProblemsId,
        transportSuboptions,
        diabetesSuboptions,
        obstericoSuboptions,
        respiratorioSuboptions,
        psiquiatricoSuboptionsData,
        Another,
      )

      const suspectProblemsWithoutMeta = removeMetaProperties(
        SuspectProblemsResponse.updatedSuspectProblems,
      )

      let suspectProblemsEmpty = 0

      for (const key in suspectProblemsWithoutMeta) {
        if (
          suspectProblemsWithoutMeta[key] === '' ||
          suspectProblemsWithoutMeta[key] === 0 ||
          suspectProblemsWithoutMeta[key] === false ||
          (Array.isArray(suspectProblemsWithoutMeta[key]) &&
            suspectProblemsWithoutMeta[key].length === 0) ||
          suspectProblemsWithoutMeta[key] === null
        ) {
          suspectProblemsEmpty++
        }
      }

      const GlasgowResponse = await updateGlasgow(
        ReportOwnerId,
        glasgowId,
        Number(aberturaOcular),
        Number(respostaVerbal),
        Number(respostaMotora),
      )

      const glasgowWithoutMeta = removeMetaProperties(
        GlasgowResponse.updatedGlasgow,
      )

      let glasgowEmpty = 0

      for (const key in glasgowWithoutMeta) {
        if (
          glasgowWithoutMeta[key] === '' ||
          glasgowWithoutMeta[key] === 0 ||
          glasgowWithoutMeta[key] === false ||
          (Array.isArray(glasgowWithoutMeta[key]) &&
            glasgowWithoutMeta[key].length === 0) ||
          glasgowWithoutMeta[key] === null
        ) {
          glasgowEmpty++
        }
      }

      const infoPacienteCompletness = determineCompletness(
        sinaisVitaisEmpty,
        suspectProblemsEmpty,
        glasgowEmpty,
      )

      if (
        SuspectProblemsResponse &&
        SuspectProblemsResponse.updatedSuspectProblems &&
        GlasgowResponse &&
        GlasgowResponse.updatedGlasgow &&
        SinaisVitaisResponse &&
        SinaisVitaisResponse.updatedReport
      ) {
        navigation.navigate('ocorrencia')
        dispatch(saveInfoPacienteCompletness(infoPacienteCompletness))
        toast.show({
          description: 'Informações de Info Paciente salvas com sucesso.',
          duration: 3000,
          placement: 'bottom',
          style: { backgroundColor: '#0AC800' },
        })
      }
    } catch (error) {
      console.error(error)
      toast.show({
        description: 'Erro ao salvar informações de Info Paciente.',
        duration: 3000,
        placement: 'bottom',
        style: { backgroundColor: 'red' },
      })
    } finally {
      setButtonLoading(false)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Header />
          <Title iconName="user-alt" title="Informações do Paciente" />
          <Subtitle content="Sinais Vitais" />
          <SinaisInfoPaciente />
          <Subtitle content="Aval. do Paciênte (GLASGOW)" />
          <AvalPacienteGroup />
          <Subtitle content="Problemas suspeitos encontrados" />
          <ProblemasSuspeitos />
          <MainButton
            innerText="SALVAR"
            isLoading={buttonLoading}
            onPress={handleSubmitInfoPaciente}
          />
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
