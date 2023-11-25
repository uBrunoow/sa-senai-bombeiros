import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Modal,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
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

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/redux/stores/stores'
import findUser from '@src/api/users/findUser'
import FInalizacaoModal from '@app/modal/FInalizacaoModal'
import { styles as s } from '@app/styles/boxShadow'
import Cinematica from './components/Cinematica'
import findFinalization from '@src/api/reports/finalization/findFinalization'
import updateCinematic from '@src/api/reports/cinematicAvaliation/updateCinematicAvaliation'
import MainButton from '@app/components/MainButton'
import updateFinalization from '@src/api/reports/finalization/updateFinalization'
import {
  CheckIcon,
  Checkbox,
  FormControl,
  Input,
  Select,
  TextArea,
  useToast,
} from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import { determineCompletness } from './utils/determineCompletness'
import { saveFinalizationCompletness } from '@src/redux/reducers/completnessReducer'
import { useNavigation } from '@react-navigation/core'

type FormDataType = {
  CollectedObjects: string
}

type RemoveMetaPropertiesType = {
  id: number
  createdAt: string
  updatedAt: string
  ReportOwnerId: string
}

type TransportOptions =
  | 'critico'
  | 'instavel'
  | 'possivelmente estavel'
  | 'estavel'

export type VictimWasOptions =
  | 'CICLISTA'
  | 'CONDUTOR_MOTO'
  | 'GESTANTE'
  | 'PASS_MOTO'
  | 'CONDUTOR_CARRO'
  | 'CLINICO'
  | 'TRAUMA'
  | 'PASS_BCO_TRAS'
  | 'PEDESTRE'
const Finalizacao = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [, setIsPressed] = useState(false)
  const [selectedOption, setSelectedOption] = useState(``)
  const [changeResponsable, setChangeResponsable] = useState(false)
  const [responsable, setResponsable] = useState('')
  const [observacoesFinais, setObservacoesFinais] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [isCheckedDeitada, setIsCheckedDeitada] = useState(false)
  const [isCheckedSemiDeitada, setIsCheckedSemiDeitada] = useState(false)
  const [isCheckedSentada, setIsCheckedSentada] = useState(false)
  const [VictimWas, setVictimWas] = useState<VictimWasOptions | null>(null)

  const handleCheckboxChange = (checkboxName: string) => {
    setIsCheckedDeitada(checkboxName === 'DEITADA')
    setIsCheckedSemiDeitada(checkboxName === 'SEMI-DEITADA')
    setIsCheckedSentada(checkboxName === 'SENTADA')
  }

  const handleObservacoesChange = (newValue: string) => {
    setObservacoesFinais(newValue)
  }

  const handleOptionPress = (option: TransportOptions) => {
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

  const { control, setValue, watch } = useForm<FormDataType>({
    defaultValues: {
      CollectedObjects: '',
    },
  })

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
        const collectedObjectResponse =
          finalizationResponse.finalization.CollectedObjects
        const victimWasResponse = finalizationResponse.finalization.VictimWas

        setIsCheckedDeitada(conductionResponse?.includes('DEITADA') || false)
        setIsCheckedSemiDeitada(
          conductionResponse?.includes('SEMI-DEITADA') || false,
        )
        setIsCheckedSentada(conductionResponse?.includes('SENTADA') || false)
        setObservacoesFinais(finalRemarksResponse)
        setSelectedOption(transportationResponse)
        setValue('CollectedObjects', collectedObjectResponse)
        setVictimWas(victimWasResponse)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [ownerId, finalizationId, setValue])

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
  const twistedSteering = cinematicData?.cinematic?.twistedSteering

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

  const CollectedObjects = watch('CollectedObjects')
  const toast = useToast()

  const removeMetaProperties = (
    obj: RemoveMetaPropertiesType,
  ): Omit<
    RemoveMetaPropertiesType,
    'id' | 'createdAt' | 'updatedAt' | 'ReportOwnerId'
  > => {
    // eslint-disable-next-line no-unused-vars
    const { id, createdAt, updatedAt, ReportOwnerId, ...withoutMeta } = obj
    return withoutMeta
  }

  const handleSubmitFinalization = async () => {
    try {
      setButtonLoading(true)

      // Atualização do Cinematic
      const cinematicDataResponse = await updateCinematic(
        ReportOwnerId,
        cinematicId,
        comportamentalDisturb,
        damagedPanel,
        damagedWindshield,
        foundWithHelmet,
        foundWithSeatbelt,
        walkingInTheScene,
        twistedSteering,
      )

      const cinematicWithoutMeta = removeMetaProperties(
        cinematicDataResponse.updatedCinematicAvaliation,
      ) as Record<string, any>

      let cinematicEmpty = 0

      for (const key in cinematicWithoutMeta) {
        if (
          cinematicWithoutMeta[key] === '' ||
          cinematicWithoutMeta[key] === 0 ||
          cinematicWithoutMeta[key] === false ||
          (Array.isArray(cinematicWithoutMeta[key]) &&
            cinematicWithoutMeta[key].length === 0) ||
          cinematicWithoutMeta[key] === null
        ) {
          cinematicEmpty++
        }
      }

      // Atualização da Finalização
      const finalizationDataResponse = await updateFinalization(
        ReportOwnerId,
        finalizationId,
        responsable,
        conduction,
        transportation,
        CollectedObjects,
        finalRemarks,
        VictimWas,
      )

      const finalizationWithoutMeta = removeMetaProperties(
        finalizationDataResponse.updatedFinalization,
      ) as Record<string, any>

      let finalizationEmpty = 0

      for (const key in finalizationWithoutMeta) {
        if (
          finalizationWithoutMeta[key] === '' ||
          finalizationWithoutMeta[key] === 0 ||
          finalizationWithoutMeta[key] === false ||
          (Array.isArray(finalizationWithoutMeta[key]) &&
            finalizationWithoutMeta[key].length === 0) ||
          finalizationWithoutMeta[key] === null
        ) {
          finalizationEmpty++
        }
      }

      const finalizationCompletness = determineCompletness(
        finalizationEmpty,
        cinematicEmpty,
      )

      if (
        cinematicDataResponse &&
        cinematicDataResponse.updatedCinematicAvaliation &&
        finalizationDataResponse &&
        finalizationDataResponse.updatedFinalization
      ) {
        dispatch(saveFinalizationCompletness(finalizationCompletness))
        navigation.navigate('ocorrencia' as never)
        toast.show({
          description: 'Informações de Finalização salvas com sucesso.',
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

  const handleClearVictimWas = () => {
    setVictimWas(null)
  }
  return (
    <SafeAreaView>
      <ScrollView>
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
              <View style={s.boxShadow} className=" mx-auto p-5">
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
                <FormControl>
                  <FormControl.Label color={'black'}>
                    Objetos Recolhidos
                  </FormControl.Label>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="CollectedObjects"
                        onBlur={field.onBlur}
                        onChangeText={(val) => field.onChange(val)}
                        value={field.value}
                      />
                    )}
                    name="CollectedObjects"
                  />
                </FormControl>
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
                    onChange={() => {
                      setIsCheckedDeitada((prev) => !prev)
                      handleCheckboxChange('DEITADA')
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
                    onChange={() => {
                      setIsCheckedSemiDeitada((prev) => !prev)
                      handleCheckboxChange('SEMI-DEITADA')
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
                    onChange={() => {
                      setIsCheckedSentada((prev) => !prev)
                      handleCheckboxChange('SENTADA')
                    }}
                  >
                    <Text className="text-lg text-slate-800">Sentada</Text>
                  </Checkbox>
                </View>
                <View>
                  <Text className="mt-[5px] text-base font-medium">
                    A vítima era:
                  </Text>
                  <View className="flex-row">
                    <Select
                      selectedValue={VictimWas}
                      minWidth="200"
                      accessibilityLabel="Choose Service"
                      placeholder="Choose Service"
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mb={5}
                      w={285}
                      onValueChange={(itemValue) => setVictimWas(itemValue)}
                      onChange={() => handleClearVictimWas()}
                    >
                      <Select.Item label="Ciclista" value="CICLISTA" />
                      <Select.Item
                        label="Condutor Moto"
                        value="CONDUTOR_MOTO"
                      />
                      <Select.Item label="Gestante" value="GESTANTE" />
                      <Select.Item
                        label="Pass. Ban Frente"
                        value="PASS_BAN_FRENTE"
                      />
                      <Select.Item label="Pass. Moto" value="PASS_MOTO" />
                      <Select.Item
                        label="Condutor carro"
                        value="CONDUTOR_CARRO"
                      />
                      <Select.Item label="Clínico" value="CLINICO" />
                      <Select.Item label="Trauma" value="TRAUMA" />
                      <Select.Item
                        label="Pass. Bco. Trás"
                        value="PASS_BCO_TRAS"
                      />
                      <Select.Item label="Pedestre" value="PEDESTRE" />
                    </Select>
                    <TouchableOpacity
                      disabled={!VictimWas}
                      onPress={handleClearVictimWas}
                      className="ml-2 flex w-1/6"
                    >
                      <AntDesign name="closecircle" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Text className="text-lg font-medium">
                    Decisão transporte
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Pressable
                        style={() => [
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
                        style={() => [
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
                        style={() => [
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
                        style={() => [
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

                <FormControl>
                  <FormControl.Label mt={5}>
                    Observações Finais
                  </FormControl.Label>
                  <TextArea
                    autoCompleteType={''}
                    h={20}
                    w="100%"
                    onChange={(e) =>
                      handleObservacoesChange(e.nativeEvent.text)
                    }
                    value={observacoesFinais}
                  />
                </FormControl>
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
    </SafeAreaView>
  )
}

export default Finalizacao
