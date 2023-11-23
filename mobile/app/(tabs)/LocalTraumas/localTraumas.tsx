import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { styles as s } from '@app/styles/boxShadow'
import Footer from '../../components/Footer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PickOne from '../../components/PickOne'
import AvalPacienteModal from '@app/modal/AvalPacienteModal'
import classNames from 'classnames'
import Body from './components/Body'
import Title from '@app/components/Title'
import registerLocalTrauma from '@src/api/reports/localTraumas/registerLocalTraumas'
import { useSelector } from 'react-redux'
import { RootState } from '@src/redux/stores/stores'
import { ILocalTrauma } from '@src/interfaces/IReport'
import findManyLocalTraumas from '@src/api/reports/localTraumas/findManyLocalTraumas'
import MainButton from '@app/components/MainButton'
import CreatedTraumas from './components/CreatedTraumas'

export default function LocalTraumas() {
  const { bottom, top } = useSafeAreaInsets()

  const [localTraumas, setLocalTraumas] = useState<ILocalTrauma[]>([])
  const [side, setSide] = useState<string | null>(null)
  const [face, setFace] = useState<string | null>(null)
  const [bodyPart, setBodyPart] = useState<string | null>(null)
  const [tipoFerimento, setTipoFerimento] = useState('')
  const [bodyPartSelected, setBodyPartSelected] = useState(false)
  const [modalFerimentoVisible, setFerimentoModalVisible] = useState(false)
  const [clickedBodyPartText, setClickedBodyPartText] = useState(
    'Nenhuma selecionada',
  )

  function handleSetTipoFerimento(newTipoFerimento: string) {
    setTipoFerimento(newTipoFerimento)
  }

  async function saveTrauma() {
    if (!bodyPart || !side || !face) return

    setFace(null)
    setSide(null)
    setBodyPart(null)
    setTipoFerimento('')
    setBodyPartSelected(false)
    setClickedBodyPartText('Nenhuma selecionada')

    const response = await registerLocalTrauma(
      reportId,
      bodyPart,
      tipoFerimento,
      side,
      face,
    )

    if (response.localTraumas) {
      setLocalTraumas([...localTraumas, response.localTraumas])
    }
  }

  const tipoFerimentoClasses = classNames({
    'w-11/12 mx-auto mb-8': true,
    '': bodyPartSelected,
    'hidden ': !bodyPartSelected,
  })

  const reportId = useSelector((state: RootState) => state.report.reportId)

  useEffect(() => {
    const findReportData = async () => {
      const localTraumasData = await findManyLocalTraumas(reportId)

      if (!localTraumasData.localTraumas) {
        console.log('Nenhum dado coletado de Local Traumas')
      } else {
        setLocalTraumas(localTraumasData.localTraumas)
      }

      console.log(localTraumasData)
    }
    findReportData()
  }, [reportId])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        <Header />
        <Title iconName="user-alt" title="Localização do Traumas" />
        <View style={s.boxShadow} className="mx-auto">
          <Body
            bodyPartValueHandler={setBodyPart}
            bodyPartChangeHandler={setBodyPartSelected}
            setSide={setSide}
            setFace={setFace}
            clickedBodyPartText={clickedBodyPartText}
            setClickedBodyPartText={setClickedBodyPartText}
          />
          <View className="mt-[34px] w-[5/6] items-center justify-center">
            <Text className="mb-[10px] ml-[10px] text-[20px] font-medium leading-[20px]">
              Localização do Trauma
            </Text>
            <View className="mb-[10px]">
              <PickOne
                selectedOptionValue={side}
                onSelectOption={setSide}
                leftOption={{ key: 'Esquerdo', value: 'LEFT' }}
                rightOption={{ key: 'Direito', value: 'RIGHT' }}
                title="Lado"
              />
              <PickOne
                selectedOptionValue={face}
                onSelectOption={setFace}
                leftOption={{ key: 'Frontal', value: 'FRONT' }}
                rightOption={{ key: 'Traseira', value: 'BACK' }}
                title="Face"
              />
            </View>
          </View>
          <View className={tipoFerimentoClasses}>
            <Text className="pb-1 pl-2 text-lg font-bold">
              Tipo de Ferimento:
            </Text>
            <TouchableOpacity
              className="border-lg rounded"
              onPress={() => {
                setFerimentoModalVisible(true)
              }}
            >
              <View className="border-lg mx-auto flex h-[42px] w-full flex-row justify-between rounded-[7px] border-width1 border-black p-[10px]">
                <Text>Selecione</Text>
                <Text>{tipoFerimento || 'Nenhum'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="mx-auto mb-3 w-11/12 rounded-md border p-3"
            disabled={!bodyPart || !side || !face}
            onPress={saveTrauma}
          >
            <Text className="text-center text-xl">Salvar Trauma</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={modalFerimentoVisible}>
          <AvalPacienteModal
            handleOptionSelection={handleSetTipoFerimento}
            setModalVisible={setFerimentoModalVisible}
            modalTitle="Tipo de Ferimento"
            options={[
              { value: 'FRATURA', description: 'Fratura' },
              { value: 'DIVERSOS', description: 'Ferimentos diversos' },
              { value: 'HEMORRAGIAS', description: 'Hemorragias' },
              { value: 'ESVICERACAO', description: 'Esvisceração' },
              { value: 'FAV_FAV', description: 'F.A.V. / F.A.F.' },
              { value: 'AMPUTACAO', description: 'Amputação' },
              { value: 'QUEIMADURA_1GRAU', description: 'Queimadura 1º Grau' },
              { value: 'QUEIMADURA_2GRAU', description: 'Queimadura 2º Grau' },
              { value: 'QUEIMADURA_3GRAU', description: 'Queimadura 3º Grau' },
            ]}
          />
        </Modal>
        <MainButton innerText="SALVAR" isLoading={false} onPress={() => {}} />
        <CreatedTraumas localTraumas={localTraumas} />
        <Footer />
      </View>
    </ScrollView>
  )
}
