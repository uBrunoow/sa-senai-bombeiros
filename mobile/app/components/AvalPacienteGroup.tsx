import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import AvalPacienteModal from './../modal/AvalPacienteModal'

export default function AvalPacienteGroup() {
  const [aberturaOcular, setAberturaOcular] = useState(0)
  const [respostaVerbal, setRespostaVerbal] = useState(0)
  const [respostaMotora, setRespostaMotora] = useState(0)
  const [modalAberturaOcularVisible, setAberturaOcularModalVisible] =
    useState(false)
  const [modalRespostaVerbalVisible, setRespostaVerbalModalVisible] =
    useState(false)
  const [modalRespostaMotoraVisible, setRespostaMotoraModalVisible] =
    useState(false)

  function validateGlasgow(): Boolean {
    return ![aberturaOcular, respostaVerbal, respostaMotora].includes(0)
  }

  function calcGlasgow(): Number {
    return (
      Number(aberturaOcular) + Number(respostaVerbal) + Number(respostaMotora)
    )
  }

  console.log(
    `${[aberturaOcular, respostaVerbal, respostaMotora]} = ${calcGlasgow()}`,
  )

  function handleAberturaOcular(valueAberturaOcular: number): void {
    setAberturaOcular(valueAberturaOcular)
  }

  function handleRespostaVerbal(valueRespostaVerbal: number): void {
    setRespostaVerbal(valueRespostaVerbal)
  }

  function handleRespostaMotora(valueRespostaMotora: number): void {
    setRespostaMotora(valueRespostaMotora)
  }

  return (
    <View className="mx-auto w-5/6 flex-col rounded-md bg-white py-10 shadow-2xl">
      <View className="flex-col p-5">
        <TouchableOpacity
          className="border-lg rounded"
          onPress={() => {
            setAberturaOcularModalVisible(true)
          }}
        >
          <View className="border-lg flex flex-row justify-between rounded-[7px] border-width1 border-black p-2">
            <Text>Abertura ocular</Text>
            <Text>{aberturaOcular !== 0 ? `${aberturaOcular}` : '...'}</Text>
          </View>
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={modalAberturaOcularVisible}
          onRequestClose={() => {
            setAberturaOcularModalVisible(false)
          }}
        >
          <AvalPacienteModal
            handleOptionSelection={handleAberturaOcular}
            setModalVisible={setAberturaOcularModalVisible}
            modalTitle="Abertura Ocular"
            options={[
              { value: '4', description: 'Espontânea' },
              { value: '3', description: 'Comando verbal' },
              { value: '2', description: 'Estímulo doloroso' },
              { value: '1', description: 'Nenhuma' },
            ]}
          />
        </Modal>
      </View>
      <View className="flex-col p-5">
        <TouchableOpacity
          className="border-lg rounded"
          onPress={() => {
            setRespostaVerbalModalVisible(true)
          }}
        >
          <View className="border-lg flex flex-row justify-between rounded-[7px] border-width1 border-black p-2">
            <Text>Resposta Verbal</Text>
            <Text>{respostaVerbal !== 0 ? `${respostaVerbal}` : '...'}</Text>
          </View>
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={modalRespostaVerbalVisible}
          onRequestClose={() => {
            setRespostaVerbalModalVisible(false)
          }}
        >
          <AvalPacienteModal
            handleOptionSelection={handleRespostaVerbal}
            setModalVisible={setRespostaVerbalModalVisible}
            modalTitle="Resposta Verbal"
            options={[
              { value: '5', description: 'Orientado' },
              { value: '4', description: 'Confuso' },
              { value: '3', description: 'Palavras inapropriadas' },
              { value: '2', description: 'Palavras incompreensíveis' },
              { value: '1', description: 'Nenhuma' },
            ]}
          />
        </Modal>
      </View>
      <View className="flex-col p-5">
        <TouchableOpacity
          className="border-lg rounded"
          onPress={() => {
            setRespostaMotoraModalVisible(true)
          }}
        >
          <View className="border-lg flex flex-row justify-between rounded-[7px] border-width1 border-black p-2">
            <Text>Resposta Motora</Text>
            <Text>{respostaMotora !== 0 ? `${respostaMotora}` : '...'}</Text>
          </View>
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={modalRespostaMotoraVisible}
          onRequestClose={() => {
            setRespostaMotoraModalVisible(false)
          }}
        >
          <AvalPacienteModal
            handleOptionSelection={handleRespostaMotora}
            setModalVisible={setRespostaMotoraModalVisible}
            modalTitle="Resposta Motora"
            options={[
              { value: '6', description: 'Obedece comandos' },
              { value: '5', description: 'Localiza dor' },
              { value: '4', description: 'Movimento de retirada' },
              { value: '3', description: 'Flexão anormal' },
              { value: '2', description: 'Extensão anormal' },
              { value: '1', description: 'Nenhuma' },
            ]}
          />
        </Modal>
      </View>
      <View className="w-full flex-row gap-2">
        <Text className="text-extrabold color-[#202020] text-2xl">
          Total GCS
        </Text>
        <Text className="text-extrabold color-[#202020aa] text-xl">
          {'(3 - 15):'}
        </Text>
        <Text className="text-extrabold color-[#202020] text-2xl">
          {validateGlasgow()
            ? calcGlasgow().toString()
            : 'Avaliação de Glasgow incompleta'}
        </Text>
      </View>
    </View>
  )
}
