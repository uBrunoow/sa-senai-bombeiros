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
import { name } from 'classnames'
import { formatReportDate } from '@src/utils/formatReportDate'
import { MultipleSelectList } from 'react-native-dropdown-select-list'

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
  const [bloodPressure, setBloodPressure] = useState(0)
  const [bodyTemp, setBodyTemp] = useState(0)
  const [bodyPulse, setBodyPulse] = useState(0)
  const [breathing, setBreathing] = useState(0)
  const [saturation, setSaturation] = useState(0)

  const [categories, setCategories] = React.useState([])

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
      <View>
        <Header />
        <View className="mb-[40px] mt-[34px] flex-row items-center justify-center">
          <FontAwesome5 name="suitcase" size={24} color="#A00E00" />
          <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
            Introdução
          </Text>
        </View>
        <View style={s.boxShadow} className=" mx-auto mb-12">
          <View className="w-full flex-1 flex-row items-center">
            <View className="w-3/6 p-2">
              <InputDatePicker
                reportDate={reportDateTime}
                setReportDate={setReportDateTime}
              />
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
              keyBoardType="default"
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
            value={cpf}
            onChangeText={(e) => setCpf(e)}
          />
          <InputLowPadding
            title="Fone"
            placeholder="(__) _____-____"
            isTelefone={true}
            keyBoardType="numeric"
            value={phone}
            onChangeText={(e) => setPhone(e)}
          />
          <InputLowPadding
            title="Local da Ocorrência"
            keyBoardType="default"
            value={reportPlace}
            onChangeText={(e) => setReportPlace(e)}
          />
          <View className="mx-auto flex-1 flex-row">
            <InputLowPadding title="Acompanhante" size="regular" />
            <InputLowPadding
              title="Idade"
              size="small"
              keyBoardType="numeric"
            />
          </View>
          {/* Pré-Hospitalar */}
          <MultipleSelectList
            setSelected={(val) => setCategories(val)}
            data={preHospitalarData}
            save="value"
            label="Pré-Hospitalar"
            boxStyles={{ padding: 10 }}
            badgeStyles={{
              backgroundColor: '#A00E00',
              paddingHorizontal: 10,
            }}
            placeholder="PRÉ-HOSPITALAR"
            searchPlaceholder="Escolha quantos for necessário"
            notFoundText="Nenhuma categoria encontrada"
            maxHeight={450}
          />
          {/* Sinais e Sintomas */}
          <MultipleSelectList
            setSelected={(val) => setCategories(val)}
            data={sinaisESintomasData}
            save="value"
            label="Sinais e Sintomas"
            boxStyles={{ padding: 10 }}
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
        <MainButton
          innerText="SALVAR"
          onPress={() => handleSubmitIntroduction()}
        />
      </View>
      <Footer />
    </ScrollView>
  )
}
