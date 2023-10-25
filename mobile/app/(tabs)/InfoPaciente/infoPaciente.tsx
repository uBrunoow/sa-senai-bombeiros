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
import { RootState } from '@src/redux/stores/stores'
import { useSelector } from 'react-redux'
import updateSinaisVitaisReport from '@src/api/reports/sinaisVitais/updateSinaisVitais'
import updateSuspectProblems from '@src/api/reports/suspectProblems/updateSuspectProblems'
import updateGlasgow from '@src/api/reports/glasgow/updateGlasgow'
import { useToast } from 'native-base'

export default function InfoPatient({ navigation }: any) {
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

  // Infos paciente, problemas suspeitos data
  const transportSuboptionsData =
    SuspectProblemsData?.suspectProblems?.transportSuboptions || {}
  const diabetesSuboptionsData =
    SuspectProblemsData?.suspectProblems?.diabetesSuboptions || {}
  const obstericoSuboptionsData =
    SuspectProblemsData?.suspectProblems?.obstericoSuboptions || {}
  const respiratorioSuboptionsData =
    SuspectProblemsData?.suspectProblems?.respiratorioSuboptions || {}

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

  const handleSubmitInfoPaciente = async () => {
    try {
      const SinaisVitaisResponse = await updateSinaisVitaisReport(
        ownerId,
        reportId,
        diastolicBloodPressure,
        systolicBloodPressure,
        bodyTemp,
        bodyPulse,
        breathing,
        saturation,
      )

      const SuspectProblemsResponse = await updateSuspectProblems(
        ReportOwnerId,
        suspectProblemsId,
        transportSuboptions,
        diabetesSuboptions,
        obstericoSuboptions,
        respiratorioSuboptions,
      )

      const GlasgowResponse = await updateGlasgow(
        ReportOwnerId,
        glasgowId,
        Number(aberturaOcular),
        Number(respostaVerbal),
        Number(respostaMotora),
      )

      console.log(SinaisVitaisResponse)
      console.log(SuspectProblemsResponse)
      console.log(GlasgowResponse)

      if (
        SuspectProblemsResponse &&
        SuspectProblemsResponse.updatedSuspectProblems &&
        GlasgowResponse &&
        GlasgowResponse.updatedGlasgow &&
        SinaisVitaisResponse &&
        SinaisVitaisResponse.updatedReport
      ) {
        navigation.navigate('ocorrencia')
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
    }
  }

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
          <MainButton innerText="SALVAR" onPress={handleSubmitInfoPaciente} />
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
