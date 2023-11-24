import { ScrollView, SafeAreaView, View } from 'react-native'
import React, { useState } from 'react'
import Options from '@app/components/PickOne'
import { styles as s } from '../../styles/boxShadow'
import InputLowPadding from '@app/components/InputLowPadding'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Footer from '@app/components/Footer'
import InputNumeric from '@app/components/inputNumeric'
import MainButton from '@app/components/MainButton'
import updateTransport from '@src/api/reports/infoTransport/updateTransport'
import { useSelector } from 'react-redux'
import { RootState } from '@src/redux/stores/stores'

export default function InfoTransporte() {
  const [numberUSB, setNumberUSB] = useState(0)
  const [numberOcorr, setNumberOcorr] = useState(0)
  const [forwardingAgent, setForwardingAgent] = useState('')
  const [HcH, setHcH] = useState('')
  const [kmFinal, setKmFinal] = useState(0)
  const [code, setCode] = useState<'IR' | 'PS' | null>(null)
  const [codeSUS, setCodeSUS] = useState(0)

  const handleIRPS = (selectedIRPS: 'IR' | 'PS' | null) => {
    setCode(selectedIRPS)
  }

  const dataToSend = {
    numberUSB,
    numberOcorr,
    forwardingAgent,
    HcH,
    kmFinal,
    code,
    codeSUS,
  }

  const ReportOwnerId = useSelector((state: RootState) => state.report.reportId)
  const InfoTransoportId = useSelector(
    (state: RootState) => state.infoTransport.infoTransportId,
  )

  const handleSubmitTransport = async () => {
    const response = await updateTransport(
      ReportOwnerId,
      InfoTransoportId,
      dataToSend,
    )

    console.log(response)
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
        <Title iconName="ambulance" title="Informações de Transporte" />
        <View style={s.boxShadow} className="mx-auto">
          <View className="flex-row">
            <View className="w-2/6">
              <InputNumeric
                title="N° USB"
                size="big"
                value={numberUSB}
                onChangeText={(e) => setNumberUSB(e)}
              />
            </View>
            <View className="w-2/6">
              <Options
                title={'Código'}
                selectedOptionValue={code}
                onSelectOption={handleIRPS}
                leftOption={{
                  key: 'IR',
                  value: 'IR',
                }}
                rightOption={{
                  key: 'PS',
                  value: 'PS',
                }}
              />
            </View>
          </View>

          <View className="flex-row">
            <View className="w-2/6">
              <InputNumeric
                title="N° Ocorr."
                size="big"
                value={numberOcorr}
                onChangeText={(e) => setNumberOcorr(e)}
              />
            </View>
            <View className="w-4/6">
              <InputLowPadding
                title="Despachante"
                value={forwardingAgent}
                onChangeText={(e) => setForwardingAgent(e)}
              ></InputLowPadding>
            </View>
          </View>

          <View className="flex-row">
            <View className="w-2/6">
              <InputLowPadding
                title="H. CH"
                value={HcH}
                onChangeText={(e) => setHcH(e)}
              ></InputLowPadding>
            </View>
            <View className="w-2/6">
              <InputNumeric
                title="KM Final"
                size="big"
                value={kmFinal}
                onChangeText={(e) => setKmFinal(e)}
              />
            </View>
            <View className="w-2/6">
              <InputNumeric
                title="Cód. SIA/SUS"
                size="big"
                value={codeSUS}
                onChangeText={(e) => setCodeSUS(e)}
              />
            </View>
          </View>
        </View>
        <MainButton
          innerText="SALVAR"
          // isLoading={buttonLoading}
          onPress={() => handleSubmitTransport()}
        />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  )
}
