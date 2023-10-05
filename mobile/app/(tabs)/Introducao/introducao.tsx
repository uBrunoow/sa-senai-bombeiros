import { View, ScrollView, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import Header from '@app/components/Header'
import Footer from '@app/components/Footer'
import Options from '@app/components/optionsIntroducao'
import InputLowPadding from '@app/components/InputLowPadding'
import { styles as s } from '@app/styles/boxShadow'
// import { RootState } from '@src/redux/stores/stores'
// import { useSelector } from 'react-redux'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import InputDatePicker from '@app/components/InputDatePIcker'

export default function Introducao({ navigation }) {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        <Header />
        <View className="mb-[40px] mt-[34px] flex-row items-center justify-center">
          <FontAwesome5 name="suitcase" size={24} color="#A00E00" />
          <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
            Introdução
          </Text>
        </View>
        <View
          style={s.boxShadow}
          className=" mx-auto mb-12 w-[90%] rounded-[14px] bg-white px-[17px] py-[30px] shadow-md"
        >
          <View className="w-full flex-1 flex-row items-center">
            <View className="w-3/6 p-2">
              <InputDatePicker />
            </View>
            <View className="w-3/6 items-center justify-between">
              <Options title="Sexo" Option1="Masc." Option2="Fem."></Options>
            </View>
          </View>
          <View className="mx-auto flex-1 flex-row">
            <InputLowPadding title="Nome" size="regular" alignText="left" />
            <InputLowPadding
              title="Idade"
              size="small"
              keyBoardType="numeric"
            />
          </View>
          <InputLowPadding
            title="RG/CPF"
            placeholder="___.___.___-__"
            isCPF={true}
            keyBoardType="numeric"
          />
          <InputLowPadding
            title="Fone"
            placeholder="(__) _____-____"
            isTelefone={true}
            keyBoardType="numeric"
          />
          <InputLowPadding title="Local da Ocorrência" />
          <View className="mx-auto flex-1 flex-row">
            <InputLowPadding title="Acompanhante" size="regular" />
            <InputLowPadding
              title="Idade"
              size="small"
              keyBoardType="numeric"
            />
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  )
}
