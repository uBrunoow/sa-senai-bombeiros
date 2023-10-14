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
import { Select } from 'native-base'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import registerPreHospitalarMethods from '@src/api/reports/preHospitalarMethod/registerPreHospitalarMethod'
import registerSignsAndSymptoms from '@src/api/reports/symptoms/registerSymptoms'
import findPreHospitalarMethodByReport from '@src/api/reports/preHospitalarMethod/findPreHospitalarMethodByReport'

export default function Introducao({ navigation }: any) {
  const { bottom, top } = useSafeAreaInsets()
  const reportId = useSelector((state: RootState) => state.report.reportId)
  const ownerId = useSelector((state: RootState) => state.auth.userId)

  const [reportDateTime, setReportDateTime] = useState('')
  const [name, setName] = useState(' ')
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState(' ')
  const [cpf, setCpf] = useState('0')
  const [phone, setPhone] = useState('0')
  const [reportPlace, setReportPlace] = useState(' ')
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [preHospitalar, setPreHospitalar] = useState([])
  const [sinaisESintomas, setSinaisESintomas] = useState([])
  const [service, setService] = useState('')

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

    const findPreHospitalarMethodByReportData = async () => {
      try {
        setLoading(true)

        const response = await findPreHospitalarMethodByReport(reportId)

        const descriptions = response.preHospitalarMethods.map(
          (method) => method.description,
        )

        setPreHospitalar(descriptions)

        console.log(response)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    findReportsData()
    findPreHospitalarMethodByReportData()
  }, [reportId])

  console.log(preHospitalar)

  const handleSubmitIntroduction = async () => {
    try {
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
    }
  }

  const handleSubmitPreHospitalarMethod = async () => {
    try {
      const response = await registerPreHospitalarMethods(
        preHospitalar,
        reportId,
      )

      if (response) {
        navigation.navigate('ocorrencia')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmitSignsAndSymptoms = async () => {
    try {
      const response = await registerSignsAndSymptoms(sinaisESintomas, reportId)

      if (response) {
        navigation.navigate('ocorrencia')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSave = async () => {
    try {
      setButtonLoading(true)

      await handleSubmitIntroduction()
      await handleSubmitPreHospitalarMethod()
      await handleSubmitSignsAndSymptoms()
    } catch (error) {
      console.error(error)
    } finally {
      setButtonLoading(false)
    }
  }

  const handleSelectGender = (selectedGender: 'MASC' | 'FEM') => {
    setGender(selectedGender)
  }

  const preHospitalarData = [
    { value: 'Afogamento' },
    { value: 'Agressão' },
    { value: 'Atropelamento' },
    { value: 'Causado por animais' },
    { value: 'Choque elétrico' },
    { value: 'Com meio de transporte' },
    { value: 'Desabamento' },
    { value: 'Desmoronamento' },
    { value: 'Doméstico' },
    { value: 'Emergência médica' },
    { value: 'Esportivo' },
    { value: 'Intoxicação' },
    { value: 'Queda bicicleta' },
    { value: 'Queda moto' },
    { value: 'Queda menor que 2m' },
    { value: 'Queda maior que 2m' },
    { value: 'Queda própria altura' },
    { value: 'Tentativa de suicídio' },
    { value: 'Trabalho' },
    { value: 'Transferência' },
  ]

  const sinaisESintomasData = [
    { value: 'Abd. Sensível/Rígido' },
    { value: 'Afundamento de crânio' },
    { value: 'Agitação' },
    { value: 'Amnésia' },
    { value: 'Angina de Peito' },
    { value: 'Apinéia' },
    { value: 'Bradicardia' },
    { value: 'Bradipnéia' },
    { value: 'Bronco-Aspirando' },
    { value: 'Cefaléia' },
    { value: 'Cianose lábios' },
    { value: 'Cianose extremidades' },
    { value: 'Convulsão' },
    { value: 'Decorticação' },
    { value: 'Deformidade' },
    { value: 'Descerebração' },
    { value: 'Desmaio' },
    { value: 'Desvio de traquéia' },
    { value: 'Dispnéia' },
    { value: 'Dor local' },
    { value: 'Edema generalizado' },
    { value: 'Edema localizado' },
    { value: 'Enfisema subcutâneo' },
    { value: 'Êstase da jugular' },
    { value: 'Face pálida' },
    { value: 'Hemorragia interna' },
    { value: 'Hemorragia externa' },
    { value: 'Hipertensão' },
    { value: 'Hipotensão' },
    { value: 'Náuseas/vômitos' },
    { value: 'Nasoragia' },
    { value: 'Óbito' },
    { value: 'Otorréia' },
    { value: 'Otorragia' },
    { value: 'O.V.A.C.E' },
    { value: 'Parada cardíaca' },
    { value: 'Parada respiratória' },
    { value: 'Priaprismo' },
    { value: 'Prurido na pele' },
    { value: 'Anisocoria NÃO reagente' },
    { value: 'Anisocoria reagente' },
    { value: 'Isocoria NÃO reagente' },
    { value: 'Isocoria reagente' },
    { value: 'Midríase NÃO reagente' },
    { value: 'Midríase reagente' },
    { value: 'Miose NÃO reagente' },
    { value: 'Miose reagente' },
    { value: 'Sede' },
    { value: 'Sinal de battle' },
    { value: 'Sinal de guaxinim' },
    { value: 'Sudorese' },
    { value: 'Taquipinéia' },
    { value: 'Taquicardia' },
    { value: 'Tontura' },
  ]
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
            <View className="mx-auto flex-1 flex-col">
              {/* <View className="mb-[40px] mt-[34px] flex-row items-center justify-center">
                <FontAwesome5 name="suitcase" size={24} color="#A00E00" />
                <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
                  Introdução
                </Text>
              </View> */}
              <MultipleSelectList
                setSelected={(val) => setPreHospitalar(val)}
                data={preHospitalarData}
                save="value"
                label="Pré-Hospitalar"
                boxStyles={{
                  flexGrow: 1,
                  width: 305,
                  flex: 1,
                  borderColor: 'black',
                  borderRadius: 8,
                }}
                badgeStyles={{
                  backgroundColor: '#A00E00',
                  paddingHorizontal: 10,
                }}
                placeholder="PRÉ-HOSPITALAR"
                searchPlaceholder="Escolha quantos forem necessários"
                notFoundText="Nenhuma categoria encontrada"
                maxHeight={450}
              />
            </View>
            <View className="mx-auto flex-1 flex-row">
              <MultipleSelectList
                setSelected={(val) => setSinaisESintomas(val)}
                data={sinaisESintomasData}
                save="value"
                label="Sinais e Sintomas"
                boxStyles={{
                  flexGrow: 1,
                  width: 305,
                  flex: 1,
                  borderColor: 'black',
                  borderRadius: 8,
                }}
                badgeStyles={{
                  backgroundColor: '#A00E00',
                  paddingHorizontal: 10,
                }}
                placeholder="SINAIS E SINTOMAS"
                searchPlaceholder="Escolha quantos for necessário"
                notFoundText="Nenhuma categoria encontrada"
                maxHeight={750}
              />
            </View>
            <Select
              selectedValue={service}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
              }}
              mt={1}
              onValueChange={(itemValue) => setService(itemValue)}
            >
              <Select.Item label="UX Research" value="ux" />
              <Select.Item label="Web Development" value="web" />
              <Select.Item label="Cross Platform Development" value="cross" />
              <Select.Item label="UI Designing" value="ui" />
              <Select.Item label="Backend Development" value="backend" />
            </Select>
          </View>

          <MainButton
            innerText="SALVAR"
            onPress={() => handleSave()}
            isLoading={buttonLoading}
          />
          <Footer />
        </>
      )}
    </ScrollView>
  )
}
