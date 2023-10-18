import { ScrollView, View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import Options from '@app/components/optionsIntroducao'
import { styles as s } from '../../styles/boxShadow'
import InputLowPadding from '@app/components/InputLowPadding'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Footer from '@app/components/Footer'

export default function InfoTransporte() {
  const [IRPS, setIRPS] = useState(' ')
  const handleIRPS = (selectedIRPS: 'MASC' | 'FEM') => {
    setIRPS(selectedIRPS)
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
        <Title iconName="ambulance" title="Informações de Transporte" />
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
        <Footer />
      </ScrollView>
    </SafeAreaView>
  )
}
