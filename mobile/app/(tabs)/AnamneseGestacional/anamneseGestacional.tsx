import {
  View,
  ScrollView,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@app/components/Header'
import Title from '@app/components/Title'
import Footer from '@app/components/Footer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons'
import MainButton from '@app/components/MainButton'
import YesOrNo from '@app/components/YesOrNo'
import GestationPeriod from '@app/(tabs)/AnamneseGestacional/components/GestationPeriod'
import InputFull from '@app/components/InputFull'
import { styles as s } from '@app/styles/boxShadow'
import findGestacionalAnamnesis from '@src/api/reports/gestacionalAnamnesis/findGestacionalAnamnesis'
import { RootState } from '@src/redux/stores/stores'
import { useSelector } from 'react-redux'
import updateGesAnamnesis from '@src/api/reports/gestacionalAnamnesis/updateGestacionalAnamnesis'

export default function AnamneseGestacional({ navigation }: any) {
  const { bottom, top } = useSafeAreaInsets()

  const [PreNatal, setPreNatal] = useState(false)
  const [Complications, setComplications] = useState(false)
  const [HiPressure, setHiPressure] = useState(false)
  const [BagRuptured, setBagRuptured] = useState(false)
  const [VisualInspection, setVisualInspection] = useState(false)
  const [Childbirth, setChildbirth] = useState(false)
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  const gestacionalAnamnesisId = useSelector(
    (state: RootState) => state.gestacionalAnamnesis.gestacionalAnamnesisId,
  )
  const ReportOwnerId = useSelector((state: RootState) => state.report.reportId)

  useEffect(() => {
    const findGesAnamnesisData = async () => {
      try {
        setLoading(true)
        const response = await findGestacionalAnamnesis(gestacionalAnamnesisId)

        const preNatalResponse = response.gestacionalAnamnesis.PreNatal
        const complicationsResponse =
          response.gestacionalAnamnesis.Complications
        const hiPressureResponse = response.gestacionalAnamnesis.HiPressure
        const bagRupturedResponse = response.gestacionalAnamnesis.BagRuptured
        const visualInspectionResponse =
          response.gestacionalAnamnesis.VisualInspection
        const childbirthResponse = response.gestacionalAnamnesis.Childbirth

        setPreNatal(preNatalResponse || false)
        setComplications(complicationsResponse || false)
        setHiPressure(hiPressureResponse || false)
        setBagRuptured(bagRupturedResponse || false)
        setVisualInspection(visualInspectionResponse || false)
        setChildbirth(childbirthResponse || false)

        console.log(response)
      } catch (error) {
        console.error('Error fetching ges anamnesis data:', error)
      } finally {
        setLoading(false)
      }
    }
    findGesAnamnesisData()
  }, [gestacionalAnamnesisId])

  const handlePreNatal = (option: 'SIM' | 'NÃO') => {
    setPreNatal(option === 'SIM')
  }
  const handleComplications = (option: 'SIM' | 'NÃO') => {
    setComplications(option === 'SIM')
  }
  const handleHiPressure = (option: 'SIM' | 'NÃO') => {
    setHiPressure(option === 'SIM')
  }
  const handleBagRuptured = (option: 'SIM' | 'NÃO') => {
    setBagRuptured(option === 'SIM')
  }
  const handleVisualInspection = (option: 'SIM' | 'NÃO') => {
    setVisualInspection(option === 'SIM')
  }
  const handleChildbirth = (option: 'SIM' | 'NÃO') => {
    setChildbirth(option === 'SIM')
  }

  console.log(PreNatal)

  const handleSubmitGesAnamnesis = async () => {
    try {
      setButtonLoading(true)

      const response = await updateGesAnamnesis(
        gestacionalAnamnesisId,
        ReportOwnerId,
        PreNatal,
        Complications,
        HiPressure,
        BagRuptured,
        VisualInspection,
        Childbirth,
      )
      console.log(response)

      if (response && response.updatedGestacionalAnamnesis) {
        navigation.navigate('ocorrencia', { gestacionalAnamnesisId })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setButtonLoading(false)
    }
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      {loading ? (
        <View className="mx-auto h-screen w-[320px] items-center justify-center">
          <ActivityIndicator size="large" color="#ff0000" />
          <Text className="mt-3 text-center text-lg font-bold uppercase">
            Carregando...
          </Text>
        </View>
      ) : (
        <>
          <View>
            <Header />
            <Title iconName="baby" title="Anamnese Gestacional" />
            <View
              style={s.boxShadow}
              className=" mx-auto mb-12 w-[90%] rounded-[14px] bg-white py-[30px] shadow-md"
            >
              <GestationPeriod />
              <YesOrNo
                Question="Fez pré-natal?"
                selectedOption={PreNatal ? 'SIM' : 'NÃO'}
                onSelectOption={handlePreNatal}
              />
              <InputFull title="Nome do médico"></InputFull>
              <YesOrNo
                Question="Possibilidade de complicações?"
                selectedOption={Complications ? 'SIM' : 'NÃO'}
                onSelectOption={handleComplications}
              />
              <YesOrNo
                Question="Pressão no quadril/vontade de evacuar?"
                selectedOption={HiPressure ? 'SIM' : 'NÃO'}
                onSelectOption={handleHiPressure}
              />
              <YesOrNo
                Question="Já houve ruptura da bolsa?"
                selectedOption={BagRuptured ? 'SIM' : 'NÃO'}
                onSelectOption={handleBagRuptured}
              />
              <YesOrNo
                Question="Foi feito inspeção visual?"
                selectedOption={VisualInspection ? 'SIM' : 'NÃO'}
                onSelectOption={handleVisualInspection}
              />
              <YesOrNo
                Question="Parto realizado?"
                selectedOption={Childbirth ? 'SIM' : 'NÃO'}
                onSelectOption={handleChildbirth}
              />
            </View>
            <Pressable onPress={() => navigation.navigate(`ocorrencia`)}>
              <MainButton
                isLoading={buttonLoading}
                innerText="SALVAR"
                onPress={handleSubmitGesAnamnesis}
              ></MainButton>
            </Pressable>
          </View>
          <Footer />
        </>
      )}
    </ScrollView>
  )
}
