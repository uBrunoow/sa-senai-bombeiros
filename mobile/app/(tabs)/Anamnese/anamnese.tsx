import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import InputFull from '../../components/InputFull'
import YesOrNo from '../../components/YesOrNo'
import { AntDesign } from '@expo/vector-icons'
import MainButton from '../../components/MainButton'
import InputClock from '../../components/InputClock'
import { useSelector } from 'react-redux'
import { RootState } from '../../../src/redux/stores/stores'
import updateAnamnesis from '../../../src/api/updateAnamnesis'
import findAnamnesis from '../../../src/api/findAnamnesis'

export default function Anamnese({ navigation }) {
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
  const [horasMedicacao, setHorasMedicacao] = useState('20:00')
  const [quaisMedicacoes, setQuaisMedicacoes] = useState('')
  const [alergia, setAlergia] = useState(false)
  const [quaisAlergias, setQuaisAlergias] = useState('')
  const [ingeriuAlimento, setIngeriuAlimento] = useState(false)
  const [horasIngeriuAlimento, setHorasIngeriuAlimento] = useState('21:00')
  const [observacoesFinais, setObservacoesFinais] = useState('')

  const handleOutrasVezesChange = (option: 'SIM' | 'NÃO') => {
    setOutrasVezes(option === 'SIM')
  }

  const handleProblemaSaudeChange = (option: 'SIM' | 'NÃO') => {
    setProblemaSaude(option === 'SIM')
  }

  const handleUsoMedicacaoChange = (option: 'SIM' | 'NÃO') => {
    setUsoMedicacao(option === 'SIM')
  }

  const handleAlergiaChange = (option: 'SIM' | 'NÃO') => {
    setAlergia(option === 'SIM')
  }

  const handleIngeriuAlimentoChange = (option: 'SIM' | 'NÃO') => {
    setIngeriuAlimento(option === 'SIM')
  }

  useEffect(() => {
    const findAnamnesisData = async () => {
      try {
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
      }
    }
    findAnamnesisData()
  }, [])

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
    if (response && response.updatedAnamnese) {
      navigation.navigate('ocorrencia')
    }
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
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
            className="mb-12 w-full rounded-[14px] bg-white px-[10] py-[30] shadow-md"
            style={styles.boxShadow}
          >
            <View className="justfy-between aling-items w-347 h-1041 flex-1">
              <InputFull
                title="Sinais e Sintomas"
                placeholder={sinaisESintomas || ''}
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
              <InputFull
                title="A quanto tempo isso aconteceu?"
                value={tempoAconteceu}
                placeholder={tempoAconteceu || ''}
                onChangeText={(e) => setTempoAconteceu(e)}
              />
              <View className="just-between aling-items flex-1">
                <YesOrNo
                  Question="Possui algum problema de saúde?"
                  selectedOption={problemaSaude ? 'SIM' : 'NÃO'}
                  onSelectOption={handleProblemaSaudeChange}
                />
              </View>
              <InputFull
                title="Quais?"
                value={quaisProblemas}
                placeholder={quaisProblemas || ''}
                onChangeText={(e) => setQuaisProblemas(e)}
              />
              <View className="just-between aling-items flex-1">
                <YesOrNo
                  Question="Faz uso de medicação?"
                  selectedOption={usoMedicacao ? 'SIM' : 'NÃO'}
                  onSelectOption={handleUsoMedicacaoChange}
                />
              </View>
              {/* TERMINAR ESSA PÁGINA!!! */}
              <InputFull
                title="Quais?"
                value={quaisMedicacoes}
                placeholder={quaisMedicacoes || ''}
                onChangeText={(e) => setQuaisMedicacoes(e)}
              />
              {/* <InputFull title="Horário Ultima Med." isCalendar={true} /> */}
              <InputClock title="Horário Ultima Med." />
              <View className="just-between aling-items flex-1">
                <YesOrNo
                  Question="Tem alguma alergia?"
                  selectedOption={alergia ? 'SIM' : 'NÃO'}
                  onSelectOption={handleAlergiaChange}
                />
              </View>
              <InputFull
                title="Quais?"
                value={quaisAlergias}
                placeholder={quaisAlergias || ''}
                onChangeText={(e) => setQuaisAlergias(e)}
              />
              <View className="w-92 h-67 flex-1">
                <View className="just-between aling-items flex-1">
                  <YesOrNo
                    Question="Ingeriu alimento/líquido nas últimas 6 horas?"
                    selectedOption={ingeriuAlimento ? 'SIM' : 'NÃO'}
                    onSelectOption={handleIngeriuAlimentoChange}
                  />
                </View>
                <View className="just-between aling-items flex-1">
                  {/* <InputFull title="Que Horas" isCalendar={true} /> */}
                  <InputClock title="Que horas?" />
                </View>
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
