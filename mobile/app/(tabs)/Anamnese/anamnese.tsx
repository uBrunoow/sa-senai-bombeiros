import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@app/components/Header'
import Title from '@app/components/Title'
import Footer from '@app/components/Footer'
import InputFull from '@app/components/InputFull'
import YesOrNo from '@app/components/YesOrNo'
import MainButton from '@app/components/MainButton'
import InputClock from '@app/components/InputClock'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/redux/stores/stores'
import updateAnamnesis from '@src/api/reports/anamnesis/updateAnamnesis'
import findAnamnesis from '@src/api/reports/anamnesis/findAnamnesis'
import { useToast } from 'native-base'
import Loader from '@app/components/Loader'
import { determineCompletness } from './utils/determineCompletness'
import { saveAnamnesisCompletness } from '@src/redux/reducers/completnessReducer'
import { useNavigation } from '@react-navigation/core'
export default function Anamnese() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const reportId = useSelector((state: RootState) => state.report.reportId)
  const anamnesisId = useSelector(
    (state: RootState) => state.anamnesis.anamnesisId,
  )

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
  const [buttonLoading, setButtonLoading] = useState(false)

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

  const toast = useToast()

  const handleSubmitAnamnesis = async () => {
    try {
      setButtonLoading(true)
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

      // eslint-disable-next-line no-unused-vars
      const { id, createdAt, updatedAt, ReportOwnerId, ...anameseWithoutMeta } =
        response?.updatedAnamnese

      let emptyOrFalseCount = 0

      for (const key in anameseWithoutMeta) {
        if (
          anameseWithoutMeta[key] === '' ||
          anameseWithoutMeta[key] === false
        ) {
          emptyOrFalseCount++
        }
      }

      const anamnesisCompletness: number | null =
        determineCompletness(emptyOrFalseCount)

      if (response && response.updatedAnamnese) {
        dispatch(saveAnamnesisCompletness(anamnesisCompletness))
        navigation.navigate('ocorrencia' as never)
        toast.show({
          description: 'Informações de Anamnese salvas com sucesso.',
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
          <View>
            <Header />
            <View className="justfy-between aling-items mb-4 flex-1 px-[21.5px]">
              <Title
                iconName="question-circle"
                title="Anamnese de Emergência"
              />
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
                  <YesOrNo
                    Question="Aconteceu outras vezes?"
                    selectedOption={outrasVezes ? 'SIM' : 'NÃO'}
                    onSelectOption={handleOutrasVezesChange}
                  />
                  {outrasVezes && (
                    <InputFull
                      title="A quanto tempo isso aconteceu?"
                      value={tempoAconteceu}
                      placeholder={tempoAconteceu || ''}
                      onChangeText={(e) => setTempoAconteceu(e)}
                    />
                  )}
                  <YesOrNo
                    Question="Possui algum problema de saúde?"
                    selectedOption={problemaSaude ? 'SIM' : 'NÃO'}
                    onSelectOption={handleProblemaSaudeChange}
                  />
                  {problemaSaude && (
                    <InputFull
                      title="Quais?"
                      value={quaisProblemas}
                      placeholder={quaisProblemas || ''}
                      onChangeText={(e) => setQuaisProblemas(e)}
                    />
                  )}
                  <YesOrNo
                    Question="Faz uso de medicação?"
                    selectedOption={usoMedicacao ? 'SIM' : 'NÃO'}
                    onSelectOption={handleUsoMedicacaoChange}
                  />
                  {usoMedicacao && (
                    <>
                      <InputFull
                        title="Quais?"
                        value={quaisMedicacoes}
                        placeholder={quaisMedicacoes || ''}
                        onChangeText={(e) => setQuaisMedicacoes(e)}
                      />
                      <InputClock
                        title="Horário Ultima Med."
                        initialValue={horasMedicacao}
                        onChange={(newValue) => setHorasMedicacao(newValue)}
                      />
                    </>
                  )}
                  <YesOrNo
                    Question="Tem alguma alergia?"
                    selectedOption={alergia ? 'SIM' : 'NÃO'}
                    onSelectOption={handleAlergiaChange}
                  />
                  {alergia && (
                    <InputFull
                      title="Quais?"
                      value={quaisAlergias}
                      placeholder={quaisAlergias || ''}
                      onChangeText={(e) => setQuaisAlergias(e)}
                    />
                  )}
                  <View className="w-92 h-67 flex-1">
                    <YesOrNo
                      Question="Ingeriu alimento/líquido nas últimas 6 horas?"
                      selectedOption={ingeriuAlimento ? 'SIM' : 'NÃO'}
                      onSelectOption={handleIngeriuAlimentoChange}
                    />
                    {ingeriuAlimento && (
                      <InputClock
                        title="Que horas?"
                        initialValue={horasIngeriuAlimento}
                        onChange={(newValue) =>
                          setHorasIngeriuAlimento(newValue)
                        }
                      />
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
                isLoading={buttonLoading}
                onPress={() => handleSubmitAnamnesis()}
              />
            </View>
            <Footer />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
