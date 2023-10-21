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

export default function InfoPatient() {
  const InfoPatient = useSelector(
    (state: RootState) => state.infoPaciente.patientInfo,
  )
  const reportId = useSelector((state: RootState) => state.report.reportId)
  const ownerId = useSelector((state: RootState) => state.auth.userId)

  const diastolicBloodPressure = InfoPatient.patientInfo?.diastolicBloodPressure
  const systolicBloodPressure = InfoPatient.patientInfo?.systolicBloodPressure
  const bodyTemp = InfoPatient.patientInfo?.bodyTemp
  const bodyPulse = InfoPatient.patientInfo?.bodyPulse
  const breathing = InfoPatient.patientInfo?.breathing
  const saturation = InfoPatient.patientInfo?.saturation

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

      console.log(SinaisVitaisResponse)
    } catch (error) {
      console.error(error)
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
