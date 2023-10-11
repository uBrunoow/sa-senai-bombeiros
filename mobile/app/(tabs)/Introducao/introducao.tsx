import { View, ScrollView, Text, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
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
import { formatReportDate } from '@src/utils/formatReportDate'
import InputNumeric from '@app/components/inputNumeric'
import findReports from '@src/api/reports/findReport'
import InputCpf from '@app/components/inputCpf'
import InputTelefone from '@app/components/inputTelefone'

export default function Introducao({ navigation }) {
  const { bottom, top } = useSafeAreaInsets()
  const reportId = useSelector((state: RootState) => state.report.reportId)
  const ownerId = useSelector((state: RootState) => state.auth.userId)

  const [reportDateTime, setReportDateTime] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  const [reportPlace, setReportPlace] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  useEffect(() => {
    const findReportsData = async () => {
      try {
        setLoading(true)

        const response = await findReports(reportId)

        const ageResponse = response.report.age
        const nameResponse = response.report.name
        const phoneResponse = response.report.phone
        const cpfReposnse = response.report.cpf
        const reportDateTimeResponse = response.report.reportDate
        const reportPlaceResponse = response.report.reportPlace
        const genderResponse = response.report.gender

        setAge(ageResponse)
        setName(nameResponse)
        setPhone(phoneResponse)
        setCpf(cpfReposnse)
        setReportDateTime(reportDateTimeResponse)
        setReportPlace(reportPlaceResponse)
        setGender(genderResponse)

        console.log(response)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    findReportsData()
  }, [reportId])

  const handleSubmitIntroduction = async () => {
    try {
      setButtonLoading(true)
      const reportDate = formatReportDate(reportDateTime)

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
      )

      if (response && response.updatedReport) {
        navigation.navigate('ocorrencia')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setButtonLoading(false)
    }
  }

  const handleSelectGender = (selectedGender: 'MASC' | 'FEM') => {
    setGender(selectedGender)
  }

  console.log(buttonLoading)

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
                  <InputDatePicker
                    reportDate={reportDateTime}
                    setReportDate={setReportDateTime}
                  />
                </View>
                <View className="h-full w-3/6 items-center justify-center">
                  <Options
                    title="Sexo"
                    Option1="Masc."
                    Option2="Fem."
                    selectedOption={gender}
                    onSelectOption={handleSelectGender}
                  />
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
                <InputNumeric
                  title="Idade"
                  size="small"
                  value={age}
                  onChangeText={(e) => setAge(e)}
                />
              </View>
              <InputCpf
                title="RG/CPF"
                placeholder="___.___.___-__"
                value={cpf}
                onChangeText={(e) => setCpf(e)}
              />
              <InputTelefone
                title="Fone"
                placeholder="(__) _____-____"
                value={phone}
                onChangeText={(e) => setPhone(e)}
              />
              <InputLowPadding
                title="Local da Ocorrência"
                value={reportPlace}
                onChangeText={(e) => setReportPlace(e)}
              />
              <View className="mx-auto flex-1 flex-row">
                <InputLowPadding title="Acompanhante" size="regular" />
                <InputLowPadding title="Idade" size="small" />
              </View>
            </View>
            <MainButton
              innerText="SALVAR"
              onPress={() => handleSubmitIntroduction()}
              isLoading={buttonLoading}
            />
          </View>
          <Footer />
        </>
      )}
    </ScrollView>
  )
}
