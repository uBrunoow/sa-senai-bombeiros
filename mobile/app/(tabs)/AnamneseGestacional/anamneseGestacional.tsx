import { View, ScrollView, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Header from '@app/components/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Footer from '@app/components/Footer'
import { FontAwesome5 } from '@expo/vector-icons'
import MainButton from '@app/components/MainButton'
import YesOrNo from '@app/components/YesOrNo'
import GestationPeriod from '@app/(tabs)/AnamneseGestacional/components/GestationPeriod'
import InputFull from '@app/components/InputFull'
import { styles as s } from '@app/styles/boxShadow'

export default function AnamneseGestacional({ navigation }) {
  const { bottom, top } = useSafeAreaInsets()

  const [PreNatal, setPreNatal] = useState(false)
  const [Complications, setComplications] = useState(false)
  const [HiPressure, setHiPressure] = useState(false)
  const [BagRuptured, setBagRuptured] = useState(false)
  const [VisualInspection, setVisualInspection] = useState(false)
  const [Childbirth, setChildbirth] = useState(false)

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

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        <Header />
        <View className="mb-[40px] mt-[34px] flex-row items-center justify-center">
          <FontAwesome5 name="fire" size={24} color="#A00E00" />
          <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
            Anamnese Gestacional
          </Text>
        </View>
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
          <MainButton innerText="SALVAR"></MainButton>
        </Pressable>
      </View>
      <Footer />
    </ScrollView>
  )
}
