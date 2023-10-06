import { View, ScrollView, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons'
import React, { useState } from 'react'
import Header from '@app/components/Header'
import Footer from '@app/components/Footer'
import Options from '@app/components/optionsIntroducao'
import InputLowPadding from '@app/components/InputLowPadding'
import { styles as s } from '@app/styles/boxShadow'
import InputDatePicker from '@app/components/InputDatePIcker'
import { RootState } from '@src/redux/stores/stores'
import { useSelector } from 'react-redux'
import updateReport from '@src/api/reports/updateReport'
import MainButton from '@app/components/MainButton'

export default function Introducao({ navigation }) {
  const { bottom, top } = useSafeAreaInsets()
  const reportId = useSelector((state: RootState) => state.report.reportId)
  const ownerId = useSelector((state: RootState) => state.auth.userId)

  const [reportDate, setReportDate] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  const [reportPlace, setReportPlace] = useState('')
  const [bloodPressure, setBloodPressure] = useState(0)
  const [bodyTemp, setBodyTemp] = useState(0)
  const [bodyPulse, setBodyPulse] = useState(0)
  const [breathing, setBreathing] = useState(0)
  const [saturation, setSaturation] = useState(0)

  console.log(reportId)

  const handleSubmitIntroduction = async () => {
    try {
      const response = await updateReport(
        ownerId,
        reportId,
        reportDate,
        name,
        age,
        gender,
        cpf,
        phone,
        reportPlace,
        bloodPressure,
        bodyTemp,
        bodyPulse,
        breathing,
        saturation,
      )

      console.log(response)
    } catch (error) {
      console.error(error)
    }

    console.log(name)
  }

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
            <InputLowPadding
              title="Nome"
              size="regular"
              alignText="left"
              value={name}
              placeholder={name || ''}
              onChangeText={(e) => setName(e)}
            />
            <InputLowPadding
              title="Idade"
              size="small"
              keyBoardType="numeric"
              value={age}
              onChangeText={(e) => setAge(e)}
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
        <MainButton
          innerText="SALVAR"
          onPress={() => handleSubmitIntroduction()}
        />
      </View>
      <Footer />
    </ScrollView>
  )
}
