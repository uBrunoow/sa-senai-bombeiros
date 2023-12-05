import { SafeAreaView, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@app/components/Header'
import Title from '@app/components/Title'
import Footer from '@app/components/Footer'
import MainButton from '@app/components/MainButton'
import YesOrNo from '@app/components/YesOrNo'
import {
  GestationalPeriodEndPicker,
  GestationalPeriodStartPicker,
} from '@app/(tabs)/AnamneseGestacional/components/GestationPeriod'
import { styles as s } from '@app/styles/boxShadow'
import findGestacionalAnamnesis from '@src/api/reports/gestacionalAnamnesis/findGestacionalAnamnesis'
import { RootState } from '@src/redux/stores/stores'
import { useDispatch, useSelector } from 'react-redux'
import updateGesAnamnesis from '@src/api/reports/gestacionalAnamnesis/updateGestacionalAnamnesis'
import { FormControl, TextArea, useToast } from 'native-base'
import Options from '@app/components/optionsIntroducao'
import InputClock from '@app/components/InputClock'
import { formatReportDate } from '@src/utils/formatReportDate'
import InputNumeric from '@app/components/inputNumeric'
import InputFull from '@app/components/InputFull'
import InputDuration from './components/InputDuration'
import InputInterval from './components/InputInterval'
import Loader from '@app/components/Loader'
import {
  parseDurationString,
  parseIntervalString,
} from './utils/parseIntervalString'
import { determineCompletness } from './utils/determineCompletness'
import { saveGesAnamnesisCompletness } from '@src/redux/reducers/completnessReducer'
import { useNavigation } from '@react-navigation/core'

type RemoveMetaPropertiesType = {
  id: number
  createdAt: string
  updatedAt: string
  ReportOwnerId: string
}
export default function AnamneseGestacional() {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [PreNatal, setPreNatal] = useState(false)
  const [Complications, setComplications] = useState(false)
  const [HiPressure, setHiPressure] = useState(false)
  const [BagRuptured, setBagRuptured] = useState(false)
  const [VisualInspection, setVisualInspection] = useState(false)
  const [Childbirth, setChildbirth] = useState(false)
  const [gender, setGender] = useState('')
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
  const [horarioNascimento, setHorarioNascimento] = useState('')
  const [BabyName, setBabyName] = useState('')
  const [observacoesFinais, setObservacoesFinais] = useState('')

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
        const gestationalPeriodStartResponse =
          response.gestacionalAnamnesis.gestationalPeriodStart
        const gestationalPeriodEndResponse =
          response.gestacionalAnamnesis.gestationalPeriodEnd
        const ContractionSchedule =
          response.gestacionalAnamnesis.ContractionSchedule
        const intervalString = response.gestacionalAnamnesis.Interval
        const durationString = response.gestacionalAnamnesis.Duration
        const { intervalHours, intervalMinutes, intervalSeconds } =
          parseIntervalString(intervalString)
        const { durationMinutes, durationSeconds } =
          parseDurationString(durationString)
        const BabyGenderResponse = response.gestacionalAnamnesis.BabyGender
        const BornHour = response.gestacionalAnamnesis.BornHour
        const BabyName = response.gestacionalAnamnesis.BabyName
        const FinalRemarks = response.gestacionalAnamnesis.FinalRemarks

        setPreNatal(preNatalResponse || false)
        setComplications(complicationsResponse || false)
        setHiPressure(hiPressureResponse || false)
        setBagRuptured(bagRupturedResponse || false)
        setVisualInspection(visualInspectionResponse || false)
        setChildbirth(childbirthResponse || false)
        setDoctorName(doctorNameResponse)
        setNumberSon(NumberSonResponse)
        setGestationalPeriod(
          {
            start: gestationalPeriodStartResponse,
            end: gestationalPeriodEndResponse,
          } || null,
        )
        setHorasInicioContracao(ContractionSchedule)
        setIntervalHours(intervalHours)
        setIntervalMinutes(intervalMinutes)
        setIntervalSeconds(intervalSeconds)
        setDurationMinutes(durationMinutes)
        setDurationSeconds(durationSeconds)
        setGender(BabyGenderResponse)
        setHorarioNascimento(BornHour)
        setBabyName(BabyName)
        setObservacoesFinais(FinalRemarks)
      } catch (error) {
        console.error('Error fetching ges anamnesis data:', error)
      } finally {
        setLoading(false)
      }
    }
    findGesAnamnesisData()
  }, [gestacionalAnamnesisId])

  const handleDurationChange = (minutes: number, seconds: number) => {
    setDurationMinutes(minutes)
    setDurationSeconds(seconds)
  }

  const handleIntervalChange = (
    hours: number,
    minutes: number,
    seconds: number,
  ) => {
    setIntervalHours(hours)
    setIntervalMinutes(minutes)
    setIntervalSeconds(seconds)
  }

  const handleSelectGender = (selectedGender: 'Male' | 'Female' | null) => {
    if (selectedGender !== null) {
      setGender(selectedGender)
    }
  }

  const handleObservacoesChange = (newValue: string) => {
    setObservacoesFinais(newValue)
  }

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

    if (!Childbirth) {
      setGender('')
      setHorarioNascimento('')
      setBabyName('')
    }
  }

  const toast = useToast()

  const gestationalPeriodStart = formatReportDate(gestationalPeriod.start)
  const gestationalPeriodEnd = formatReportDate(gestationalPeriod.end)
  const Interval = `${intervalHours} hr ${intervalMinutes} min ${intervalSeconds} segs`
  const Duration = `${durationMinutes} min ${durationSeconds}`
  const FinalRemarks = observacoesFinais

  const removeMetaProperties = (
    obj: RemoveMetaPropertiesType,
  ): Omit<
    RemoveMetaPropertiesType,
    'id' | 'createdAt' | 'updatedAt' | 'ReportOwnerId'
  > => {
    // eslint-disable-next-line no-unused-vars
    const { id, createdAt, updatedAt, ReportOwnerId, ...withoutMeta } = obj
    return withoutMeta
  }

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
        horasInicioContracao,
        Interval,
        Duration,
        gender,
        horarioNascimento,
        BabyName,
        FinalRemarks,
      )

      const gesAnamnesisWithoutMeta = removeMetaProperties(
        response.updatedGestacionalAnamnesis,
      ) as Record<string, any>

      let gesAnamnesisEmpty = 0

      for (const key in gesAnamnesisWithoutMeta) {
        if (
          gesAnamnesisWithoutMeta[key] === '' ||
          gesAnamnesisWithoutMeta[key] === 0 ||
          gesAnamnesisWithoutMeta[key] === '0 min 0' ||
          gesAnamnesisWithoutMeta[key] === '0 hr 0 min 0 segs' ||
          gesAnamnesisWithoutMeta[key] === false ||
          gesAnamnesisWithoutMeta[key] === null
        ) {
          gesAnamnesisEmpty++
        }
      }

      const gesAnamnesisCompletness = determineCompletness(gesAnamnesisEmpty)

      if (response && response.updatedGestacionalAnamnesis) {
        navigation.navigate('ocorrencia' as never)
        dispatch(saveGesAnamnesisCompletness(gesAnamnesisCompletness))
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
    <SafeAreaView>
      <ScrollView>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View>
              <Header />
              <Title iconName="baby" title="Anamnese Gestacional" />
              <View style={s.boxShadow} className="mx-auto">
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
                <View className="flex-row px-4">
                  <InputNumeric
                    title="Filho de número"
                    value={NumberSon}
                    onChangeText={(e) => setNumberSon(e)}
                  />
                  <InputClock
                    title="Início das contrações"
                    initialValue={horasInicioContracao}
                    onChange={(newValue) => setHorasInicioContracao(newValue)}
                  />
                </View>

                <View className="mx-auto w-[90%] flex-row justify-evenly">
                  <InputDuration
                    title="Duração"
                    onChangeDuration={(minutes, seconds) =>
                      handleDurationChange(minutes, seconds)
                    }
                    minutes={durationMinutes}
                    seconds={durationSeconds}
                  />
                  <InputInterval
                    title="Intervalo"
                    onChangeInterval={(hours, minutes, seconds) =>
                      handleIntervalChange(hours, minutes, seconds)
                    }
                    hours={intervalHours}
                    minutes={intervalMinutes}
                    seconds={intervalSeconds}
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
                {Childbirth && (
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
                      <InputClock
                        title="Horário nasc."
                        initialValue={horarioNascimento}
                        onChange={(newValue) => {
                          setHorarioNascimento(newValue)
                        }}
                      />
                    </View>
                    <InputFull
                      title="Nome do bebê"
                      value={BabyName}
                      onChangeText={(e) => setBabyName(e)}
                    />
                  </View>
                )}
                <FormControl>
                  <FormControl.Label mt={5}>
                    Observações Finais
                  </FormControl.Label>
                  <TextArea
                    autoCompleteType={''}
                    h={20}
                    w="100%"
                    onChange={(e) =>
                      handleObservacoesChange(e.nativeEvent.text)
                    }
                    value={observacoesFinais}
                  />
                </FormControl>
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
    </SafeAreaView>
  )
}
