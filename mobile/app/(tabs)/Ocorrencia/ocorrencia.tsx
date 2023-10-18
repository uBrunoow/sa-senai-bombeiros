import {
  ScrollView,
  Text,
  TouchableOpacity,
  Button,
  Modal,
  ActivityIndicator,
  View,
  Pressable,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@app/components/Header'
import Grouper from '@app/components/Grouper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Footer from '@app/components/Footer'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import MainButton from '@app/components/MainButton'
import { useDispatch, useSelector } from 'react-redux'
import registerAnamnesis from '@src/api/reports/anamnesis/registerAnamnesis'
import { RootState } from '@src/redux/stores/stores'
import {
  clearAnamnesisId,
  clearFinalizationId,
  clearGestacionalAnamnesisId,
  clearReportId,
  saveAnamnesisId,
  saveFinalizationId,
  saveGestacionalAnamnesisId,
} from '@src/redux/actions/reportActions'
import ExcluirOcorrenciaModal from '@app/modal/ExcluirOcorrenciaModal'
import { styles as s } from '@app/styles/boxShadow'
import deleteReport from '@src/api/reports/deleteReport'
import registerGesAnamnesis from '@src/api/reports/gestacionalAnamnesis/registerGestacionalAnamnesis'
import registerFinalization from '@src/api/reports/finalization/registerFinalization'

export default function Ocorrencia({ navigation }: any) {
  const ReportOwnerId = useSelector((state: RootState) => state.report.reportId)

  const { bottom, top } = useSafeAreaInsets()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })

    navigation.navigate('home')
  }

  const existingAnamnesisId = useSelector(
    (state: RootState) => state.anamnesis.anamnesisId,
  )

  const handleClickAnamnese = async () => {
    if (existingAnamnesisId) {
      navigation.navigate('anamnese', {
        screen: 'anamnese',
        params: { anamnesisId: existingAnamnesisId },
      })
    } else {
      const response = await registerAnamnesis(ReportOwnerId)

      if (response && response.anamnesis) {
        dispatch(saveAnamnesisId(response.anamnesis.id))
        console.log('Anamnese n°: ', response.anamnesis.id)

        navigation.navigate('anamnese', {
          screen: 'anamnese',
          params: { anamnesisId: response.anamnesis.id },
        })
      }
    }
  }

  const existingGestacionalAnamnesisId = useSelector(
    (state: RootState) => state.gestacionalAnamnesis.gestacionalAnamnesisId,
  )

  const handleClickGestacionalAnamnese = async () => {
    if (existingGestacionalAnamnesisId) {
      navigation.navigate('anamnese-gestacional', {
        screen: 'anamnese-gestacional',
        params: { gestacionalAnamnesisId: existingGestacionalAnamnesisId },
      })
    } else {
      const response = await registerGesAnamnesis(ReportOwnerId)
      console.log(response)

      if (response && response.gesAnamnesis) {
        dispatch(saveGestacionalAnamnesisId(response.gesAnamnesis.id))
        console.log('Ges Anamnese n°: ', response.gesAnamnesis.id)

        navigation.navigate('anamnese-gestacional', {
          screen: 'anamnese-gestacional',
          params: { gestacionalAnamnesisId: response.gesAnamnesis.id },
        })
      }
    }
  }

  const existingFinalizationId = useSelector(
    (state: RootState) => state.finalization.finalizationId,
  )

  const handleClickFinalization = async () => {
    if (existingFinalizationId) {
      navigation.navigate('finalizacao', {
        screen: 'finalizacao',
        params: { finalizationId: existingFinalizationId },
      })
    } else {
      const response = await registerFinalization(ReportOwnerId)
      console.log(response)

      if (response && response.finalization) {
        dispatch(saveFinalizationId(response.finalization.id))
        console.log('Finalization n°: ', response.finalization.id)

        navigation.navigate('finalizacao', {
          screen: 'finalizacao',
          params: { finalizationId: response.finalization.id },
        })
      }
    }
  }

  const [showModal, setShowModal] = useState(false)
  const reportId = useSelector((state: RootState) => state.report.reportId)

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      if (reportId) {
        setShowModal(true)
        e.preventDefault()
      }
    })

    return unsubscribe
  }, [navigation, reportId])

  const [loading, setLoading] = useState(false)

  const handleDeleteReport = async () => {
    try {
      setLoading(true)
      const response = await deleteReport(reportId)
      console.log(response)
      if (response.msg) {
        dispatch(clearReportId())
        dispatch(clearAnamnesisId())
        dispatch(clearGestacionalAnamnesisId())
        dispatch(clearFinalizationId())
        setShowModal(false)
        navigation.navigate('home')
      }
    } catch (error) {
      console.error('Error deleting report:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleModalCancel = () => {
    setShowModal(false)
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        <Header />
        <View className="mb-[40px] mt-[34px] flex-row items-center justify-center">
          <FontAwesome5 name="fire" size={24} color="#A00E00" />
          <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
            Ocorrência
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(`introducao`)}
          activeOpacity={0.7}
        >
          <Grouper
            title="Introdução"
            desc="Dados da vítima, tipo ocorr..."
            isCompleted={4}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClickAnamnese} activeOpacity={0.7}>
          <Grouper
            title="Anamnese de Emergência"
            desc="Sinais e sintomas, observações..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`info-paciente`)}
          activeOpacity={0.7}
        >
          <Grouper
            title="Info. do paciente"
            desc="Aval. paciente, sinais vitais..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`local-traumas`)}
          activeOpacity={0.7}
        >
          <Grouper
            title="Localizações da Fratura"
            desc="Local dos traumas, tipo trau..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`info-transporte`)}
          activeOpacity={0.7}
        >
          <Grouper
            title="Info. de Transporte"
            desc="Condução, condição transp..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`info-hospitalares`)}
          activeOpacity={0.7}
        >
          <Grouper
            title="Info. Hospitalares"
            desc="Procedimentos efetuados..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleClickGestacionalAnamnese}
          activeOpacity={0.7}
        >
          <Grouper
            title="Anamnese Gestacional"
            desc="Período gestação, pré-natal..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClickFinalization} activeOpacity={0.7}>
          <Grouper
            title="Finalização"
            desc="Observações, objetos..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <Pressable onPress={() => navigation.navigate(`home`)}>
          <MainButton innerText="FINALIZAR" />
        </Pressable>
        <Button title="Logout" onPress={handleLogout} />
        {showModal && (
          <Modal
            transparent={true}
            animationType="fade"
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
          >
            <View className="flex-1 items-center justify-center bg-[#0000007f]">
              <View
                style={s.modalContent}
                className="rounded-[7px] bg-white p-4 "
              >
                <View className="relative flex-row items-center justify-center">
                  {loading ? (
                    <View className="mx-auto h-[120px] w-[320px] items-center justify-center">
                      <ActivityIndicator size="large" color="#ff0000" />
                      <Text className="mt-3 text-center text-lg font-bold uppercase">
                        Carregando...
                      </Text>
                      <Text className=" mt-3 text-center text-[#979797b0]">
                        (Esspere sua ocorrência ser excluída, enquanto isso
                        pegue um café.)
                      </Text>
                    </View>
                  ) : (
                    <>
                      <ExcluirOcorrenciaModal
                        handleDeleteReport={handleDeleteReport}
                        handleCancel={handleModalCancel}
                      />
                      <Pressable
                        onPress={() => setShowModal(false)}
                        className="absolute right-1 top-1 z-50"
                      >
                        <AntDesign name="closecircle" size={24} color="red" />
                      </Pressable>
                    </>
                  )}
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
      <Footer />
    </ScrollView>
  )
}
