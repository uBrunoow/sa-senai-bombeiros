import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InputFull from '../components/InputFull'
import YesOrNo from '../components/YesOrNo'
import { AntDesign } from '@expo/vector-icons'
import MainButton from '../components/MainButton'
import InputClock from '../components/InputClock'
import InputClock2 from '../components/InputClock2'

export default function Anamnese() {
  const { bottom, top } = useSafeAreaInsets()

  const [sinaisESintomas, setSinaisESintomas] = useState('')
  const [outrasVezes, setOutrasVezes] = useState(false) // Pode ser um valor booleano
  const [tempoAconteceu, setTempoAconteceu] = useState('')
  const [problemaSaude, setProblemaSaude] = useState(false) // Pode ser um valor booleano
  const [quaisProblemas, setQuaisProblemas] = useState('')
  const [usoMedicacao, setUsoMedicacao] = useState(false) // Pode ser um valor booleano
  const [quaisMedicacoes, setQuaisMedicacoes] = useState('')
  const [alergia, setAlergia] = useState(false) // Pode ser um valor booleano
  const [quaisAlergias, setQuaisAlergias] = useState('')
  const [ingeriuAlimento, setIngeriuAlimento] = useState(false) // Pode ser um valor booleano
  const [horasIngeriuAlimento, setHorasIngeriuAlimento] = useState('')
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

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        <Header />
        <View className="justfy-between aling-items w-347 h-1203 mb-4 flex-1">
          <View className="mb-[25px] mt-[34px] flex-row items-center justify-center">
            <AntDesign name="questioncircle" size={24} color="#A00E00" />
            <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
              Ocorrência
            </Text>
          </View>
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
            <InputFull
              title="A quanto tempo isso aconteceu?"
              value={tempoAconteceu}
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
                <InputClock2 title="Que horas?" />
              </View>
            </View>
            <InputFull
              title="Observações Finais"
              isBig={true}
              value={observacoesFinais}
              onChangeText={(e) => setObservacoesFinais(e)}
            />
          </View>
          <MainButton innerText={'VOLTAR'}></MainButton>
        </View>
        <Footer />
      </View>
    </ScrollView>
  )
}
