import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@app/components/Header'
import Title from '@app/components/Title'
import Footer from '@app/components/Footer'
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons'

import { MultipleSelectList } from 'react-native-dropdown-select-list'
// import findAnamnesis from '../../../src/api/findAnamnesis'
// import { calculateAnamnesisCompleteness } from '../../../src/utils/calculateAnamnesisCompleteness'
import { useSelector } from 'react-redux'
import { RootState } from '@src/redux/stores/stores'
import findUser from '@src/api/users/findUser'
import FInalizacaoModal from '@app/modal/FInalizacaoModal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import InputFull from '../../components/InputFull'

import { styles as s } from '@app/styles/boxShadow'
import InputLowPadding from '@app/components/InputLowPadding'
import Cinematica from './components/Cinematica'
import findFinalization from '@src/api/reports/finalization/findFinalization'
import updateCinematic from '@src/api/reports/cinematicAvaliation/updateCinematicAvaliation'
import MainButton from '@app/components/MainButton'
import updateFinalization from '@src/api/reports/finalization/updateFinalization'
import { Checkbox } from 'native-base'

const Finalizacao = ({ navigation }: any) => {
  const [selected, setSelected] = useState('')
  const [categories, setCategories] = useState([])
  const [isPressed, setIsPressed] = useState(false)
  const [selectedOption, setSelectedOption] = useState(``)
  const [changeResponsable, setChangeResponsable] = useState(false)
  const [responsable, setResponsable] = useState('')
  const [observacoesFinais, setObservacoesFinais] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [isCheckedDeitada, setIsCheckedDeitada] = useState(false)
  const [isCheckedSemiDeitada, setIsCheckedSemiDeitada] = useState(false)
  const [isCheckedSentada, setIsCheckedSentada] = useState(false)

  const handleOptionPress = (option) => {
    setSelectedOption(option)
  }

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const getButtonStyle = (option: any) => {
    return {
      borderColor: selectedOption === option ? '#6d1111' : 'transparent',
      borderWidth: 5,
      borderRadius: 7,
    }
  }

  const handleChangeName = () => {
    setChangeResponsable(!changeResponsable)
  }

  const ownerId = useSelector((state: RootState) => state.auth.userId)
  const finalizationId = useSelector(
    (state: RootState) => state.finalization.finalizationId,
  )

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)

        const finalizationResponse = await findFinalization(finalizationId)
        const conductionResponse = finalizationResponse.finalization.conduction
        const finalRemarksResponse =
          finalizationResponse.finalization.finalRemarks
        const transportationResponse =
          finalizationResponse.finalization.transportation

        setIsCheckedDeitada(conductionResponse?.includes('DEITADA') || false)
        setIsCheckedSemiDeitada(
          conductionResponse?.includes('SEMI-DEITADA') || false,
        )
        setIsCheckedSentada(conductionResponse?.includes('SENTADA') || false)
        setObservacoesFinais(finalRemarksResponse)
        setSelectedOption(transportationResponse)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [ownerId, finalizationId])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)

        const finalizationResponse = await findFinalization(finalizationId)

        console.log(finalizationResponse)

        if (finalizationResponse.finalization.responsable === null || '') {
          if (ownerId) {
            const response = await findUser(ownerId)
            const userNameResponse = response.user.name
            setResponsable(userNameResponse)
          }
        } else {
          const responsableResponse =
            finalizationResponse.finalization.responsable
          setResponsable(responsableResponse)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [ownerId, finalizationId])

  const { bottom, top } = useSafeAreaInsets()

  const handleModalClose = () => {
    setChangeResponsable(false)
  }

  const handleResponsableChange = (newResponsable: string) => {
    setResponsable(newResponsable)
  }

  const ReportOwnerId = useSelector((state: RootState) => state.report.reportId)
  const cinematicId = useSelector(
    (state: RootState) => state.cinematicAvaliation.cinematicAvaliationId,
  )
  const cinematicData = useSelector(
    (state: RootState) => state.cinematicData.cinematic,
  )

  const comportamentalDisturb = cinematicData?.cinematic?.comportamentalDisturb
  const damagedPanel = cinematicData?.cinematic?.damagedPanel
  const damagedWindshield = cinematicData?.cinematic?.damagedWindshield
  const foundWithHelmet = cinematicData?.cinematic?.foundWithHelmet
  const foundWithSeatbelt = cinematicData?.cinematic?.foundWithSeatbelt
  const walkingInTheScene = cinematicData?.cinematic?.walkingInTheScene

  const conduction: any = []

  if (isCheckedDeitada) {
    conduction.push('DEITADA')
  }

  if (isCheckedSemiDeitada) {
    conduction.push('SEMI-DEITADA')
  }

  if (isCheckedSentada) {
    conduction.push('SENTADA')
  }

  const transportation = selectedOption
  const finalRemarks = observacoesFinais

  const handleSubmitFinalization = async () => {
    try {
      setButtonLoading(true)
      const cinematicDataResponse = await updateCinematic(
        ReportOwnerId,
        cinematicId,
        comportamentalDisturb,
        damagedPanel,
        damagedWindshield,
        foundWithHelmet,
        foundWithSeatbelt,
        walkingInTheScene,
      )

      const finalizationDataResponse = await updateFinalization(
        ReportOwnerId,
        finalizationId,
        responsable,
        conduction,
        transportation,
        finalRemarks,
      )

      console.log(cinematicDataResponse)
      console.log(finalizationDataResponse)

      if (
        cinematicDataResponse &&
        cinematicDataResponse.updatedCinematicAvaliation &&
        finalizationDataResponse &&
        finalizationDataResponse.updatedFinalization
      ) {
        navigation.navigate('ocorrencia')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setButtonLoading(false)
    }
  }

  return (
    <>
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
            <SafeAreaView>
              <Title iconName="flag" title="Finalização" />
              <View
                style={s.boxShadow}
                className=" mx-auto mb-10 p-5 shadow-md"
              >
                <View>
                  <Text className="font-medium">
                    Responsável pelo preenchimento:
                  </Text>
                  <View className="w-full flex-row items-center justify-between">
                    <Text className="text-4xl font-bold">{responsable}</Text>
                    <Pressable onPress={handleChangeName}>
                      <Ionicons name="md-pencil" size={24} color="black" />
                    </Pressable>
                  </View>
                </View>
                <InputLowPadding title="Objetos recolhidos" />

                <View>
                  <Text className="m-1 text-base font-medium">
                    Forma de condução
                  </Text>
                  <Checkbox
                    size="md"
                    colorScheme="danger"
                    value="DEITADA"
                    mb={2}
                    isChecked={isCheckedDeitada}
                    onChange={(e) => {
                      setIsCheckedDeitada((prev) => !prev)
                    }}
                  >
                    <Text className="text-lg text-slate-800">Deitada</Text>
                  </Checkbox>
                  <Checkbox
                    size="md"
                    colorScheme="danger"
                    value="SEMI-DEITADA"
                    mb={2}
                    isChecked={isCheckedSemiDeitada}
                    onChange={(e) => {
                      setIsCheckedSemiDeitada((prev) => !prev)
                    }}
                  >
                    <Text className="text-lg text-slate-800">Semi-deitada</Text>
                  </Checkbox>
                  <Checkbox
                    size="md"
                    colorScheme="danger"
                    value="SENTADA"
                    mb={2}
                    isChecked={isCheckedSentada}
                    onChange={(e) => {
                      setIsCheckedSentada((prev) => !prev)
                    }}
                  >
                    <Text className="text-lg text-slate-800">Sentada</Text>
                  </Checkbox>
                </View>

                <View>
                  <Text className="text-lg font-medium">
                    Decisão transporte
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Pressable
                        style={({ pressed }) => [
                          s.TransporteButton,
                          s.TransporteButtonRed,
                          getButtonStyle('critico'),
                          selectedOption === 'critico' && {
                            borderColor: '#a30000',
                          },
                        ]}
                        onPress={() => handleOptionPress('critico')}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                      >
                        <MaterialCommunityIcons
                          name="emoticon-dead-outline"
                          size={24}
                          color="white"
                        />
                      </Pressable>
                      <Text className="text-center">Crítico</Text>
                    </View>
                    <View>
                      <Pressable
                        style={({ pressed }) => [
                          s.TransporteButton,
                          s.TransporteButtonOrange,
                          getButtonStyle('instavel'),
                          selectedOption === 'instavel' && {
                            borderColor: '#ab4800',
                          },
                        ]}
                        onPress={() => handleOptionPress('instavel')}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                      >
                        <MaterialIcons
                          name="mood-bad"
                          size={24}
                          color="white"
                        />
                      </Pressable>
                      <Text className="text-center">Instável</Text>
                    </View>
                    <View>
                      <Pressable
                        style={({ pressed }) => [
                          s.TransporteButton,
                          s.TransporteButtonYellow,
                          getButtonStyle('possivelmente estavel'),
                          selectedOption === 'possivelmente estavel' && {
                            borderColor: '#cfa100',
                          },
                        ]}
                        onPress={() =>
                          handleOptionPress('possivelmente estavel')
                        }
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                      >
                        <MaterialCommunityIcons
                          name="emoticon-neutral-outline"
                          size={24}
                          color="white"
                        />
                      </Pressable>
                      <Text className="text-center">P. Estável</Text>
                    </View>
                    <View>
                      <Pressable
                        style={({ pressed }) => [
                          s.TransporteButton,
                          s.TransporteButtonGreen,
                          getButtonStyle('estavel'),
                          selectedOption === 'estavel' && {
                            borderColor: '#0c9100',
                          },
                        ]}
                        onPress={() => handleOptionPress('estavel')}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                      >
                        <MaterialCommunityIcons
                          name="emoticon-excited-outline"
                          size={24}
                          color="white"
                        />
                      </Pressable>
                      <Text className="text-center">Estável</Text>
                    </View>
                  </View>
                </View>

                <View className="flex-1">
                  <InputLowPadding
                    title="Observações Finais"
                    placeholder={observacoesFinais || ''}
                    isBig={true}
                    value={observacoesFinais}
                    onChangeText={(e) => setObservacoesFinais(e)}
                  />
                </View>
              </View>
              <View>
                <Cinematica />
              </View>
              <MainButton
                innerText="SALVAR"
                isLoading={buttonLoading}
                onPress={() => handleSubmitFinalization()}
              />
              {changeResponsable && (
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={changeResponsable}
                  onRequestClose={() => setChangeResponsable(false)}
                >
                  <View className="flex-1 items-center justify-center bg-[#0000007f]">
                    <View
                      style={s.modalContent}
                      className="rounded-[7px] bg-white p-4 "
                    >
                      <View className="relative flex-row items-center justify-center">
                        <FInalizacaoModal
                          onClose={handleModalClose}
                          onResponsableChange={handleResponsableChange}
                        />
                        <Pressable
                          onPress={() => setChangeResponsable(false)}
                          className="absolute right-[-5px] top-1"
                        >
                          <AntDesign name="closecircle" size={24} color="red" />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
              )}
            </SafeAreaView>
            <Footer />
          </View>
        )}
      </ScrollView>
    </>
  )
}

export default Finalizacao
