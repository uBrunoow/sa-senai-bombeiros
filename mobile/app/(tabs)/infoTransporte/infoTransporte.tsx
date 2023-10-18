import { ScrollView, View, Text, SafeAreaView } from 'react-native'
import Header from '../../components/Header'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import Options from '@app/components/optionsIntroducao'
import { styles as s } from '../../styles/boxShadow'
import InputLowPadding from '@app/components/InputLowPadding'

export default function InfoTransporte() {
  const [IRPS, setIRPS] = useState(' ')
  const handleIRPS = (selectedIRPS: 'MASC' | 'FEM') => {
    setIRPS(selectedIRPS)
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
        <View className="mb-[40px] mt-[34px] flex-row items-center justify-center">
          <FontAwesome5 name="ambulance" size={24} color="#A00E00" />
          <Text className="ml-[10px] text-[20px] leading-[20px]">
            Informações de Transporte
          </Text>
        </View>
        <View style={s.boxShadow} className="mx-auto">
          <View className="flex-row">
            <View className="w-3/6">
              <InputLowPadding title="Número USB."></InputLowPadding>
            </View>
            <View className="w-3/6">
              <Options
                title="Código"
                Option1="IR"
                Option2="PS"
                selectedOption={IRPS}
                onSelectOption={handleIRPS}
              />
            </View>
          </View>

          <View className="flex-row">
            <View className="w-2/6">
              <InputLowPadding title="N° Ocorr."></InputLowPadding>
            </View>
            <View className="w-4/6">
              <InputLowPadding title="Despachante"></InputLowPadding>
            </View>
          </View>

          <View className="flex-row">
            <View className="w-2/6">
              <InputLowPadding title="H. CH."></InputLowPadding>
            </View>
            <View className="w-2/6">
              <InputLowPadding title="KM final"></InputLowPadding>
            </View>
            <View className="w-2/6">
              <InputLowPadding title="Cód. SIA/SUS"></InputLowPadding>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
