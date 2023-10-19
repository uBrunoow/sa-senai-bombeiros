import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { styles as s } from '@app/styles/boxShadow'
import { MaterialIcons } from '@expo/vector-icons'
import Footer from '../../components/Footer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PickOne from '../../components/PickOne'
import AvalPacienteModal from '@app/modal/AvalPacienteModal'

export default function LocalTraumas() {
  const { bottom, top } = useSafeAreaInsets()

  const [side, setSide] = useState<string | null>(null)
  const [face, setFace] = useState<string | null>(null)

  const [tipoFerimento, setTipoFerimento] = useState('')

  function handleSetTipoFerimento(newTipoFerimento: string) {
    setTipoFerimento(newTipoFerimento)
  }

  const [modalFerimentoVisible, setFerimentoModalVisible] = useState(false)

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        <Header />
        <View className=" mt-[34px] flex-row items-center justify-center">
          <MaterialIcons name="person" size={24} color="#A00e00" />
          <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
            Local Traumass
          </Text>
        </View>
        <View style={s.boxShadow}>
          <Text>Mano</Text>
        </View>
        <View className="mt-[34px] w-[5/6] items-center justify-center">
          <Text className="mb-[10px] ml-[10px] text-[20px] font-medium leading-[20px]">
            Biceps (conceito)
          </Text>
          <View className="mb-[10px]">
            <PickOne
              selectedOptionValue={side}
              onSelectOption={setSide}
              leftOption={{ key: 'Esquerdo', value: 'left' }}
              rightOption={{ key: 'Direito', value: 'right' }}
              title="Lado"
            />
            <PickOne
              selectedOptionValue={face}
              onSelectOption={setFace}
              leftOption={{ key: 'Frontal', value: 'front' }}
              rightOption={{ key: 'Traseira', value: 'back' }}
              title="Face"
            />
          </View>
        </View>
        <Text>Tipo de Ferimento:</Text>
        <TouchableOpacity
          className="border-lg rounded"
          onPress={() => {
            setFerimentoModalVisible(true)
          }}
        >
          <View className="border-lg mx-auto flex h-[42px] w-5/6 flex-row justify-between rounded-[7px] border-width1 border-black p-[10px]">
            <Text>Selecione</Text>
            <Text>{tipoFerimento || 'Nenhum'}</Text>
          </View>
        </TouchableOpacity>
        <Modal visible={modalFerimentoVisible}>
          <AvalPacienteModal
            handleOptionSelection={handleSetTipoFerimento}
            setModalVisible={setFerimentoModalVisible}
            modalTitle="Tipo de Ferimento"
            options={[
              { value: 'fratura', description: 'Fratura' },
              { value: 'diversos', description: 'Ferimentos diversos' },
              { value: 'hemorragias', description: 'Hemorragias' },
              { value: 'esvisceracao', description: 'Esvisceração' },
              { value: 'fav_faf', description: 'F.A.V. / F.A.F.' },
              { value: 'amputacao', description: 'Amputação' },
              { value: 'queimadura_1grau', description: 'Queimadura 1º Grau' },
              { value: 'queimadura_2grau', description: 'Queimadura 2º Grau' },
              { value: 'queimadura_3grau', description: 'Queimadura 3º Grau' },
            ]}
          />
        </Modal>
        <Footer />
      </View>
    </ScrollView>
  )
}
