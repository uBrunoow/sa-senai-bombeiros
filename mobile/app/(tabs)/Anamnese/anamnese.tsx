import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@app/components/Header'
import Footer from '@app/components/Footer'
import InputFull from '@app/components/InputFull'
import YesOrNo from '@app/components/YesOrNo'
import { AntDesign } from '@expo/vector-icons'
import MainButton from '@app/components/MainButton'
import InputClock from '@app/components/InputClock'
import { useSelector } from 'react-redux'
import { RootState } from '@src/redux/stores/stores'
import updateAnamnesis from '@src/api/reports/anamnesis/updateAnamnesis'
import findAnamnesis from '@src/api/reports/anamnesis/findAnamnesis'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type RootStackParamList = {
  anamnese: {
    anamnesisId: number
  }
  ocorrencia: {
    reportId: number
  }
}

type AnamneseScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'anamnese'
>
type AnamneseScreenRouteProp = RouteProp<RootStackParamList, 'anamnese'>

interface AnamneseProps {
  navigation: AnamneseScreenNavigationProp
  route: AnamneseScreenRouteProp
}

export default function Anamnese({ navigation }: AnamneseProps) {
  const reportId = useSelector((state: RootState) => state.report.reportId)
  const anamnesisId = useSelector(
    (state: RootState) => state.anamnesis.anamnesisId,
  )

  const { bottom, top } = useSafeAreaInsets()

  const [sinaisESintomas, setSinaisESintomas] = useState('')
  const [outrasVezes, setOutrasVezes] = useState(false)
  const [tempoAconteceu, setTempoAconteceu] = useState('')
  const [problemaSaude, setProblemaSaude] = useState(false)
  const [quaisProblemas, setQuaisProblemas] = useState('')
  const [usoMedicacao, setUsoMedicacao] = useState(false)
  const [horasMedicacao, setHorasMedicacao] = useState('')
  const [quaisMedicacoes, setQuaisMedicacoes] = useState('')
  const [alergia, setAlergia] = useState(false)
  const [quaisAlergias, setQuaisAlergias] = useState('')
  const [ingeriuAlimento, setIngeriuAlimento] = useState(false)
  const [horasIngeriuAlimento, setHorasIngeriuAlimento] = useState('')
  const [observacoesFinais, setObservacoesFinais] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const findAnamnesisData = async () => {
      try {
        setLoading(true)
        const response = await findAnamnesis(anamnesisId)

        const sinaisESintomasResponse = response.anamese.SignsAndSymptoms
        const outrasVezesResponse = response.anamese.HappenedTimes
        const tempoAconteceuResponse = response.anamese.SinceHappened
        const problemaSaudeResponse = response.anamese.HealthProblem
        const quaisProblemasResponse = response.anamese.HealthProlemsWhich
        const usoMedicacaoResponse = response.anamese.Medication
        const horasMedicacaoResponse = response.anamese.HourMedication
        const quaisMedicacoesResponse = response.anamese.MedicationWhich
        const alergiaResponse = response.anamese.Allergies
        const quaisAlergiasResponse = response.anamese.AllergiesWhich
        const ingeriuAlimentoResponse = response.anamese.IngestedFood
        const horasIngeriuAlimentoResponse = response.anamese.WhatTimeFood
        const observacoesFinaisResponse = response.anamese.FinalRemarks

        setSinaisESintomas(sinaisESintomasResponse || '')
        setOutrasVezes(outrasVezesResponse || false)
        setTempoAconteceu(tempoAconteceuResponse || '')
        setProblemaSaude(problemaSaudeResponse || false)
        setQuaisProblemas(quaisProblemasResponse || '')
        setUsoMedicacao(usoMedicacaoResponse || false)
        setHorasMedicacao(horasMedicacaoResponse || '')
        setQuaisMedicacoes(quaisMedicacoesResponse || '')
        setAlergia(alergiaResponse || false)
        setQuaisAlergias(quaisAlergiasResponse || '')
        setIngeriuAlimento(ingeriuAlimentoResponse || false)
        setHorasIngeriuAlimento(horasIngeriuAlimentoResponse || '')
        setObservacoesFinais(observacoesFinaisResponse || '')
      } catch (error) {
        console.error('Error fetching anamnesis data:', error)
      } finally {
        setLoading(false)
      }
    }
    findAnamnesisData()
  }, [anamnesisId])

  const handleOutrasVezesChange = (option: 'SIM' | 'NÃO') => {
    setOutrasVezes(option === 'SIM')

    if (option === 'NÃO') {
      setTempoAconteceu('')
    }
  }

  const handleProblemaSaudeChange = (option: 'SIM' | 'NÃO') => {
    setProblemaSaude(option === 'SIM')

    if (option === 'NÃO') {
      setQuaisProblemas('')
    }
  }

  const handleUsoMedicacaoChange = (option: 'SIM' | 'NÃO') => {
    setUsoMedicacao(option === 'SIM')

    if (option === 'NÃO') {
      setQuaisMedicacoes('')
      setHorasMedicacao('')
    }
  }

  const handleAlergiaChange = (option: 'SIM' | 'NÃO') => {
    setAlergia(option === 'SIM')

    if (option === 'NÃO') {
      setQuaisAlergias('')
    }
  }

  const handleIngeriuAlimentoChange = (option: 'SIM' | 'NÃO') => {
    setIngeriuAlimento(option === 'SIM')

    if (option === 'NÃO') {
      setHorasIngeriuAlimento('')
    }
  }

  const handleSubmitAnamnesis = async () => {
    const response = await updateAnamnesis(
      reportId,
      anamnesisId,
      sinaisESintomas,
      outrasVezes,
      tempoAconteceu,
      problemaSaude,
      quaisProblemas,
      usoMedicacao,
      quaisMedicacoes,
      horasMedicacao,
      alergia,
      quaisAlergias,
      ingeriuAlimento,
      horasIngeriuAlimento,
      observacoesFinais,
    )

    console.log(response)

    if (response && response.updatedAnamnese) {
      navigation.navigate('ocorrencia', { reportId })
    }
  }

  console.log(tempoAconteceu)

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
        <View>
          <Header />
          <View className="justfy-between aling-items mb-4 flex-1 px-[21.5px]">
            <View className="mb-[25px] mt-[34px] flex-row items-center justify-center">
              <AntDesign name="questioncircle" size={24} color="#A00E00" />
              <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
                Anamnese de emergência
              </Text>
            </View>
            <View
              className=" mx-auto mb-12 rounded-[14px] bg-white py-[30px] shadow-md"
              style={styles.boxShadow}
            >
              <View className="justfy-between aling-items w-347 h-1041 flex-1">
                <InputFull
                  title="Sinais e Sintomas"
                  isBig={true}
                  value={sinaisESintomas}
                  onChangeText={(e) => setSinaisESintomas(e)}
                />
                <View className="just-between aling-items flex-1">
                  <YesOrNo
                    Question="Aconteceu outras vezes?"
                    selectedOption={outrasVezes ? 'SIM' : 'NÃO'}
                    onSelectOption={handleOutrasVezesChange}
                  />
                </View>
                {outrasVezes && (
                  <InputFull
                    title="A quanto tempo isso aconteceu?"
                    value={tempoAconteceu}
                    placeholder={tempoAconteceu || ''}
                    onChangeText={(e) => setTempoAconteceu(e)}
                  />
                )}
                <View className="just-between aling-items flex-1">
                  <YesOrNo
                    Question="Possui algum problema de saúde?"
                    selectedOption={problemaSaude ? 'SIM' : 'NÃO'}
                    onSelectOption={handleProblemaSaudeChange}
                  />
                </View>
                {problemaSaude && (
                  <InputFull
                    title="Quais?"
                    value={quaisProblemas}
                    placeholder={quaisProblemas || ''}
                    onChangeText={(e) => setQuaisProblemas(e)}
                  />
                )}
                <View className="just-between aling-items flex-1">
                  <YesOrNo
                    Question="Faz uso de medicação?"
                    selectedOption={usoMedicacao ? 'SIM' : 'NÃO'}
                    onSelectOption={handleUsoMedicacaoChange}
                  />
                </View>
                {usoMedicacao && (
                  <>
                    <InputFull
                      title="Quais?"
                      value={quaisMedicacoes}
                      placeholder={quaisMedicacoes || ''}
                      onChangeText={(e) => setQuaisMedicacoes(e)}
                    />
                    <View className="h-[100px]">
                      <InputClock
                        title="Horário Ultima Med."
                        initialValue={horasMedicacao}
                        onChange={(newValue) => setHorasMedicacao(newValue)}
                      />
                    </View>
                  </>
                )}
                <View className="just-between aling-items flex-1">
                  <YesOrNo
                    Question="Tem alguma alergia?"
                    selectedOption={alergia ? 'SIM' : 'NÃO'}
                    onSelectOption={handleAlergiaChange}
                  />
                </View>
                {alergia && (
                  <InputFull
                    title="Quais?"
                    value={quaisAlergias}
                    placeholder={quaisAlergias || ''}
                    onChangeText={(e) => setQuaisAlergias(e)}
                  />
                )}
                <View className="w-92 h-67 flex-1">
                  <View className="flex-1">
                    <YesOrNo
                      Question="Ingeriu alimento/líquido nas últimas 6 horas?"
                      selectedOption={ingeriuAlimento ? 'SIM' : 'NÃO'}
                      onSelectOption={handleIngeriuAlimentoChange}
                    />
                  </View>
                  {ingeriuAlimento && (
                    <View className=" flex-1">
                      {/* <InputFull title="Que Horas" isCalendar={true} /> */}
                      <InputClock
                        title="Que horas?"
                        initialValue={horasIngeriuAlimento}
                        onChange={(newValue) =>
                          setHorasIngeriuAlimento(newValue)
                        }
                      />
                    </View>
                  )}
                </View>
                <InputFull
                  title="Observações Finais"
                  isBig={true}
                  placeholder={observacoesFinais || ''}
                  value={observacoesFinais}
                  onChangeText={(e) => setObservacoesFinais(e)}
                />
              </View>
            </View>
            <MainButton
              innerText="SALVAR"
              onPress={() => handleSubmitAnamnesis()}
            />
          </View>
          <Footer />
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowopacity: 0,
    shadowradius: 4,
    textshadowoffset: {
      width: 8,
      height: 2,
    },
  },
})
