import { ScrollView, Text, ActivityIndicator, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@app/components/Header'
import Title from '@app/components/Title'
import Footer from '@app/components/Footer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MainButton from '@app/components/MainButton'
import YesOrNo from '@app/components/YesOrNo'
import {
  GestationalPeriodEndPicker,
  GestationalPeriodStartPicker,
} from '@app/(tabs)/AnamneseGestacional/components/GestationPeriod'
import { styles as s } from '@app/styles/boxShadow'
import findGestacionalAnamnesis from '@src/api/reports/gestacionalAnamnesis/findGestacionalAnamnesis'
import { RootState } from '@src/redux/stores/stores'
import { useSelector } from 'react-redux'
import updateGesAnamnesis from '@src/api/reports/gestacionalAnamnesis/updateGestacionalAnamnesis'
import { useToast } from 'native-base'
import Options from '@app/components/optionsIntroducao'
import InputClock from '@app/components/InputClock'
import { formatReportDate } from '@src/utils/formatReportDate'
import InputNumeric from '@app/components/inputNumeric'
import InputFull from '@app/components/InputFull'
import InputDuration from './components/InputDuration'
import InputInterval from './components/InputInterval'
export default function AnamneseGestacional({ navigation }: any) {
  const { bottom, top } = useSafeAreaInsets()

  const [PreNatal, setPreNatal] = useState(false)
  const [Complications, setComplications] = useState(false)
  const [HiPressure, setHiPressure] = useState(false)
  const [BagRuptured, setBagRuptured] = useState(false)
  const [VisualInspection, setVisualInspection] = useState(false)
  const [Childbirth, setChildbirth] = useState(false)
  const [gender, setGender] = useState(' ')
  const [NumberSon, setNumberSon] = useState(0)
  const [gestationalPeriod, setGestationalPeriod] = useState({
    start: '',
    end: '',
  })
  const [doctorName, setDoctorName] = useState('')
  const [horasInicioContracao, setHorasInicioContracao] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [durationMinutes, setDurationMinutes] = useState(0)
  const [durationSeconds, setDurationSeconds] = useState(0)
  const [intervalMinutes, setIntervalMinutes] = useState(0)
  const [intervalSeconds, setIntervalSeconds] = useState(0)
  const [intervalHours, setIntervalHours] = useState(0)

  const handleDurationChange = (minutes, seconds) => {
    setDurationMinutes(minutes)
    setDurationSeconds(seconds)
  }

  console.log(durationMinutes, 'MIN', durationSeconds, 'SEGS')

  const handleIntervalChange = (hours, minutes, seconds) => {
    setIntervalHours(hours)
    setIntervalMinutes(minutes)
    setIntervalSeconds(seconds)
  }
  console.log(
    intervalHours,
    'HR',
    intervalMinutes,
    'MIN',
    intervalSeconds,
    'SEGS',
  )

  const handleGestationalPeriodChange = (start, end) => {
    setGestationalPeriod({ start, end })
  }

  const handleSelectGender = (selectedGender: 'MASC' | 'FEM') => {
    setGender(selectedGender)
  }

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
        const doctorNameResponse = response.gestacionalAnamnesis.DoctorName
        const NumberSonResponse = response.gestacionalAnamnesis.NumberSon

        setPreNatal(preNatalResponse || false)
        setComplications(complicationsResponse || false)
        setHiPressure(hiPressureResponse || false)
        setBagRuptured(bagRupturedResponse || false)
        setVisualInspection(visualInspectionResponse || false)
        setChildbirth(childbirthResponse || false)
        setDoctorName(doctorNameResponse)
        setNumberSon(NumberSonResponse)

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

  const toast = useToast()

  const gestationalPeriodStart = formatReportDate(gestationalPeriod.start)
  const gestationalPeriodEnd = formatReportDate(gestationalPeriod.end)

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
        gestationalPeriodStart,
        gestationalPeriodEnd,
        doctorName,
        NumberSon,
      )
      console.log(response)

      if (response && response.updatedGestacionalAnamnesis) {
        navigation.navigate('ocorrencia', { gestacionalAnamnesisId })
        toast.show({
          description:
            'Informações de Anamnese Gestacional salvas com sucesso.',
          duration: 3000,
          placement: 'bottom',
          style: { backgroundColor: '#0AC800' },
        })
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
              <GestationalPeriodStartPicker
                gestationalPeriod={gestationalPeriod.start}
                setGestationalPeriod={(value) =>
                  setGestationalPeriod({
                    ...gestationalPeriod,
                    start: String(value),
                  })
                }
                label="Começo do Período de Gestação"
              />

              <GestationalPeriodEndPicker
                gestationalPeriod={gestationalPeriod.end}
                setGestationalPeriod={(value) =>
                  setGestationalPeriod({
                    ...gestationalPeriod,
                    end: String(value),
                  })
                }
                label="Fim do Período de Gestação"
              />
              <YesOrNo
                Question="Fez pré-natal?"
                selectedOption={PreNatal ? 'SIM' : 'NÃO'}
                onSelectOption={handlePreNatal}
              />
              <InputFull
                title="Nome do médico"
                value={doctorName}
                onChangeText={(e) => setDoctorName(e)}
              />
              <YesOrNo
                Question="Possibilidade de complicações?"
                selectedOption={Complications ? 'SIM' : 'NÃO'}
                onSelectOption={handleComplications}
              />
              <InputNumeric
                title="Filho de número"
                value={NumberSon}
                onChangeText={(e) => setNumberSon(e)}
              />
              <InputClock
                title="Início das contrações"
                initialValue={horasInicioContracao}
                onChange={(newValue) => setHorasInicioContracao(newValue)}
              ></InputClock>

              <View className="flex-row justify-evenly">
                <InputDuration
                  title="Duração"
                  onChangeDuration={handleDurationChange}
                />
                <InputInterval
                  title="Intervalo"
                  onChangeInterval={handleIntervalChange}
                />
              </View>
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
              {/* View que guarda os três inputs caso o parto seja realizado */}
              <View>
                <View className="mx-6 flex-row justify-around">
                  <Options
                    title="Sexo"
                    Option1="Masc."
                    Option2="Fem."
                    selectedOption={gender}
                    onSelectOption={handleSelectGender}
                  />
                  <View className="w-[10px]" />
                  <InputClock title="Horário nasc." />
                </View>
              </View>
              <InputFull title="Nome do bebê" />
            </View>
            <MainButton
              isLoading={buttonLoading}
              innerText="SALVAR"
              onPress={handleSubmitGesAnamnesis}
            ></MainButton>
          </View>
          <Footer />
        </>
      )}
    </ScrollView>
  )
}
