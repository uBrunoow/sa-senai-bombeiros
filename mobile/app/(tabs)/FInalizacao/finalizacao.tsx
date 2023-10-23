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

const Finalizacao = () => {
  const [selected, setSelected] = useState('')
  const [categories, setCategories] = useState([])
  const [isPressed, setIsPressed] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [changeResponsable, setChangeResponsable] = useState(false)
  const [responsable, setResponsable] = useState('')
  const [observacoesFinais, setObservacoesFinais] = useState('')
  const [loading, setLoading] = useState(false)

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

  const data = [
    { key: 'Deitada', value: 'Deitada' },
    { key: 'Semi-deitada', value: 'Semi-deitada' },
    { key: 'Sentada', value: 'Sentada' },
  ]

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

        console.log(finalizationId)
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

  const handleSubmitFinalization = async () => {
    try {
      const cinematicDataResponse = await updateCinematic()
    } catch (error) {
      console.error(error)
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
                  <MultipleSelectList
                    setSelected={(val) => setCategories(val)}
                    data={data}
                    save="value"
                    label="Categorias"
                    boxStyles={{ padding: 10 }}
                    placeholder="Selecione"
                    badgeStyles={{
                      backgroundColor: '#A00E00',
                      paddingHorizontal: 10,
                    }}
                    searchPlaceholder="Busque pela forma de condução"
                    notFoundText="Nenhuma categoria encontrada"
                  />
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
