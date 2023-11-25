import { ScrollView, SafeAreaView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Options from '@app/components/PickOne'
import { styles as s } from '../../styles/boxShadow'
import InputLowPadding from '@app/components/InputLowPadding'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Footer from '@app/components/Footer'
import InputNumeric from '@app/components/inputNumeric'
import MainButton from '@app/components/MainButton'
import updateTransport from '@src/api/reports/infoTransport/updateTransport'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/redux/stores/stores'
import { determineCompletness } from './utils/determineCompletness'
import { saveInfoTransportCompletness } from '@src/redux/reducers/completnessReducer'
import { useToast } from 'native-base'
import { useNavigation } from '@react-navigation/core'
import findTransport from '@src/api/reports/infoTransport/findTransport'
import findUser from '@src/api/users/findUser'

type RemoveMetaPropertiesType = {
  id: number
  createdAt: string
  updatedAt: string
  ReportOwnerId: string
}
export default function InfoTransporte() {
  const dispatch = useDispatch()
  const toast = useToast()
  const navigation = useNavigation()
  const [numberUSB, setNumberUSB] = useState(0)
  const [numberOcorr, setNumberOcorr] = useState(0)
  const [forwardingAgent, setForwardingAgent] = useState('')
  const [HcH, setHcH] = useState('')
  const [kmFinal, setKmFinal] = useState(0)
  const [code, setCode] = useState<'IR' | 'PS' | null>(null)
  const [codeSUS, setCodeSUS] = useState(0)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleIRPS = (selectedIRPS: 'IR' | 'PS' | null) => {
    setCode(selectedIRPS)
  }

  const ReportOwnerId = useSelector((state: RootState) => state.report.reportId)
  useEffect(() => {
    setNumberOcorr(ReportOwnerId)
  }, [ReportOwnerId])
  const InfoTransportId = useSelector(
    (state: RootState) => state.infoTransport.infoTransportId,
  )

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)

        const infoTransportResponse = await findTransport(InfoTransportId)

        const HchResponse = infoTransportResponse.transport.HcH
        const codeResponse = infoTransportResponse.transport.code
        const codeSUSResponse = infoTransportResponse.transport.codeSUS
        const forwardingAgentResponse =
          infoTransportResponse.transport.forwardingAgent
        const kmFinalResponse = infoTransportResponse.transport.kmFinal
        const numberUSBResponse = infoTransportResponse.transport.numberUSB

        setNumberUSB(numberUSBResponse)
        setForwardingAgent(forwardingAgentResponse)
        setHcH(HchResponse)
        setKmFinal(kmFinalResponse)
        setCode(codeResponse)
        setCodeSUS(codeSUSResponse)

        console.log(infoTransportResponse)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [InfoTransportId])

  const dataToSend = {}

  const removeMetaProperties = (
    obj: RemoveMetaPropertiesType,
  ): Omit<
    RemoveMetaPropertiesType,
    'id' | 'createdAt' | 'updatedAt' | 'ReportOwnerId'
  > => {
    // eslint-disable-next-line no-unused-vars
    const { id, createdAt, updatedAt, ReportOwnerId, ...withoutMeta } = obj
    return withoutMeta
  }

  const handleSubmitTransport = async () => {
    try {
      setButtonLoading(true)

      const response = await updateTransport(
        ReportOwnerId,
        InfoTransportId,
        numberUSB,
        numberOcorr,
        forwardingAgent,
        HcH,
        kmFinal,
        code,
        codeSUS,
      )

      console.log(JSON.stringify(dataToSend, null, 2))

      const infoTransportWithoutMeta = removeMetaProperties(
        response.updatedTransport,
      ) as Record<string, any>

      let transportEmpty = 0

      for (const key in infoTransportWithoutMeta) {
        if (
          infoTransportWithoutMeta[key] === '' ||
          infoTransportWithoutMeta[key] === 0 ||
          infoTransportWithoutMeta[key] === false ||
          (Array.isArray(infoTransportWithoutMeta[key]) &&
            infoTransportWithoutMeta[key].length === 0) ||
          infoTransportWithoutMeta[key] === null
        ) {
          transportEmpty++
        }
      }

      const infoTransportCompletness = determineCompletness(transportEmpty)

      if (response && response.updatedTransport) {
        if (infoTransportCompletness !== undefined) {
          dispatch(saveInfoTransportCompletness(infoTransportCompletness))
        }
        navigation.navigate('ocorrencia' as never)
        toast.show({
          description: 'Informações de Finalização salvas com sucesso.',
          duration: 3000,
          placement: 'bottom',
          style: { backgroundColor: '#0AC800' },
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setButtonLoading(false)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
        <View className="h-[90vh] flex-1 items-center justify-center ">
          <>
            <Title iconName="ambulance" title="Informações de Transporte" />
            <View style={s.boxShadow} className="mx-auto">
              <View className="flex-col-reverse">
                <View className="w-6/6 h-24">
                  <InputLowPadding
                    title="Despachante"
                    value={forwardingAgent}
                    onChangeText={(e) => setForwardingAgent(e)}
                  ></InputLowPadding>
                </View>
                <View className="w-6/6">
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
                <View className="w-6/6">
                  <InputNumeric
                    disabled={false}
                    title="N° Ocorr."
                    size="big"
                    numberWidth={85}
                    value={numberOcorr}
                    onChangeText={(e) => setNumberOcorr(e)}
                  />
                </View>
                <View className="w-6/6">
                  <InputNumeric
                    title="N° USB"
                    size="big"
                    value={numberUSB}
                    numberWidth={85}
                    onChangeText={(e) => setNumberUSB(e)}
                  />
                </View>
                <View className="w-6/6">
                  <InputNumeric
                    title="KM Final"
                    size="big"
                    value={kmFinal}
                    numberWidth={85}
                    onChangeText={(e) => setKmFinal(e)}
                  />
                </View>
              </View>

              <View className="flex-row">
                <View className="w-3/6">
                  <InputLowPadding
                    title="H. CH"
                    value={HcH}
                    onChangeText={(e) => setHcH(e)}
                  ></InputLowPadding>
                </View>

                <View className="w-3/6">
                  <InputNumeric
                    title="Cód. SIA/SUS"
                    size="big"
                    numberWidth={130}
                    value={codeSUS}
                    onChangeText={(e) => setCodeSUS(e)}
                  />
                </View>
              </View>
            </View>
            <MainButton
              innerText="SALVAR"
              isLoading={buttonLoading}
              onPress={() => handleSubmitTransport()}
            />
          </>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  )
}
