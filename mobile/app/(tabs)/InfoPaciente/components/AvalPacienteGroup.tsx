import React, { useEffect, useState } from 'react'
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native'
import AvalPacienteModal from '@app/modal/AvalPacienteModal'
import { styles as s } from '@app/styles/boxShadow'
import { useDispatch, useSelector } from 'react-redux'
import { setGlasgowData } from '@src/redux/actions/dataActions'
import findGlasgow from '@src/api/reports/glasgow/findGlasgow'
import findReports from '@src/api/reports/findReport'
import { RootState } from '@src/redux/stores/stores'

export default function AvalPacienteGroup() {
  const dispatch = useDispatch()
  const [aberturaOcular, setAberturaOcular] = useState(0)
  const [respostaVerbal, setRespostaVerbal] = useState(0)
  const [respostaMotora, setRespostaMotora] = useState(0)
  const [modalAberturaOcularVisible, setAberturaOcularModalVisible] =
    useState(false)
  const [modalRespostaVerbalVisible, setRespostaVerbalModalVisible] =
    useState(false)
  const [modalRespostaMotoraVisible, setRespostaMotoraModalVisible] =
    useState(false)
  const [isMaiorQueCincoAnos, setIsMaiorQueCincoAnos] = useState(false)

  function validateGlasgow(): Boolean {
    return ![aberturaOcular, respostaVerbal, respostaMotora].includes(0)
  }

  function calcGlasgow(): Number {
    return (
      Number(aberturaOcular) + Number(respostaVerbal) + Number(respostaMotora)
    )
  }

  function handleAberturaOcular(valueAberturaOcular: number) {
    setAberturaOcular(valueAberturaOcular)
  }

  function handleRespostaVerbal(valueRespostaVerbal: number) {
    setRespostaVerbal(valueRespostaVerbal)
  }

  function handleRespostaMotora(valueRespostaMotora: number) {
    setRespostaMotora(valueRespostaMotora)
  }

  const glasgowId = useSelector((state: RootState) => state.glasgow.glasgowId)

  useEffect(() => {
    const findGlasgowData = async () => {
      const response = await findGlasgow(glasgowId)

      const eyeOpeningOwnerId = response.glasgow.eyeOpeningOwnerId
      const verbalResponseOwnerId = response.glasgow.verbalResponseOwnerId
      const motorResponseOwnerId = response.glasgow.motorResponseOwnerId

      setAberturaOcular(eyeOpeningOwnerId)
      setRespostaVerbal(verbalResponseOwnerId)
      setRespostaMotora(motorResponseOwnerId)
    }
    findGlasgowData()
  }, [glasgowId])

  useEffect(() => {
    const onChangeGlasgowInfoData = () => {
      const glasgowDataInfo = {
        aberturaOcular,
        respostaVerbal,
        respostaMotora,
      }
      dispatch(setGlasgowData(glasgowDataInfo))
    }

    onChangeGlasgowInfoData()
  }, [aberturaOcular, respostaVerbal, respostaMotora, dispatch])

  const reportId = useSelector((state: RootState) => state.report.reportId)

  useEffect(() => {
    const findReportData = async () => {
      const ageResponse = await findReports(reportId)

      if (Number(ageResponse.report.age) >= 5) {
        setIsMaiorQueCincoAnos(true)
      } else {
        setIsMaiorQueCincoAnos(false)
      }
    }
    findReportData()
  }, [reportId])

  return (
    <View className=" mx-auto" style={s.boxShadow}>
      <View className="flex-col px-5 py-3">
        <TouchableOpacity
          className="border-lg rounded"
          onPress={() => {
            setAberturaOcularModalVisible(true)
          }}
        >
          <View className="border-lg flex h-[42px] flex-row justify-between rounded-[7px] border-width1 border-black p-[10px]">
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
          {isMaiorQueCincoAnos ? (
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
          ) : (
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
          )}
        </Modal>
      </View>
      <View className="flex-col px-5 py-3">
        <TouchableOpacity
          className="border-lg rounded"
          onPress={() => {
            setRespostaVerbalModalVisible(true)
          }}
        >
          <View className="border-lg flex h-[42px] flex-row justify-between rounded-[7px] border-width1 border-black p-[10px]">
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
          {isMaiorQueCincoAnos ? (
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
          ) : (
            <AvalPacienteModal
              handleOptionSelection={handleRespostaVerbal}
              setModalVisible={setRespostaVerbalModalVisible}
              modalTitle="Resposta Verbal"
              options={[
                { value: '5', description: 'Palavras e frases apropriadas' },
                { value: '4', description: 'Palavras inapropriadas' },
                { value: '3', description: 'Choro persistente e/ou gritos' },
                { value: '2', description: 'Sons incompreensiveis' },
                { value: '1', description: 'Nenuma resposta verbal' },
              ]}
            />
          )}
        </Modal>
      </View>
      <View className="flex-col px-5 py-3">
        <TouchableOpacity
          className="border-lg rounded"
          onPress={() => {
            setRespostaMotoraModalVisible(true)
          }}
        >
          <View className="border-lg flex h-[42px] flex-row justify-between rounded-[7px] border-width1 border-black p-[10px]">
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
          {isMaiorQueCincoAnos ? (
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
          ) : (
            <AvalPacienteModal
              handleOptionSelection={handleRespostaMotora}
              setModalVisible={setRespostaMotoraModalVisible}
              modalTitle="Resposta Motora"
              options={[
                { value: '6', description: 'Obedece Prontamente' },
                { value: '5', description: 'Localiza dor ou estímulo tatil' },
                { value: '4', description: 'Retirada do segmento estimulado' },
                { value: '3', description: 'Flexão anormal (Decorticação)' },
                { value: '2', description: 'Extensão anormal (Descerebração)' },
                {
                  value: '1',
                  description: 'Ausência (Paralisia flácida, Hipotônia)',
                },
              ]}
            />
          )}
        </Modal>
      </View>
      <View className=" w-full flex-row items-center justify-center gap-2 px-5 py-3">
        <Text className="text-bold color-[#202020] text-base">Total GCS</Text>
        <Text className="text-bold color-[#202020aa] text-base">
          {'(3 - 15):'}
        </Text>
        <View className="border-b-[1px] border-black">
          <Text className="text-bold color-[#202020] w-[150px] text-base">
            {validateGlasgow()
              ? calcGlasgow().toString()
              : 'Glasgow incompleta'}
          </Text>
        </View>
      </View>
    </View>
  )
}
