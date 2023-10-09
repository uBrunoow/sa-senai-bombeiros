import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  // TextInput,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@app/components/Header'
import Footer from '@app/components/Footer'
import {
  FontAwesome5,
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

const Finalizacao = () => {
  const [selected, setSelected] = React.useState('')
  const [categories, setCategories] = React.useState([])
  const [isPressed, setIsPressed] = useState(false)
  const [selectedOption, setSelectedOption] = React.useState(null)
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
      borderRadius: 10,
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        if (ownerId) {
          const response = await findUser(ownerId)
          const userNameResponse = response.user.name
          setResponsable(userNameResponse)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [ownerId])

  const { bottom, top } = useSafeAreaInsets()

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
          <View className="">
            <Header />
            <SafeAreaView className="">
              <View className="mb-6 mt-8 flex-row items-center justify-center">
                <FontAwesome5 name="flag-checkered" size={24} color="#F23030" />
                <Text className="ml-3 text-xl font-medium leading-5">
                  Finalização
                </Text>
              </View>

              <View
                style={s.boxShadow}
                className=" mx-auto mb-12 w-[90%] rounded-[14px] bg-white px-[17px] py-[30px] shadow-md"
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
                    searchPlaceholder="Busque pela forma de condução"
                  />
                </View>

                <View>
                  <Text>Decisão transporte</Text>
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Pressable
                        style={({ pressed }) => [
                          // {
                          //   backgroundColor: pressed ? '#000' : 'transparent',
                          // },
                          s.button,
                          getButtonStyle('critico'),
                          selectedOption === 'critico' && {
                            borderColor: '#6d1111',
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
                          s.buttonOrange,
                          getButtonStyle('instavel'),
                          selectedOption === 'instavel' && {
                            borderColor: '#6d4011',
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
                          s.buttonYellow,
                          getButtonStyle('possivelmente estavel'),
                          selectedOption === 'possivelmente estavel' && {
                            borderColor: '#656d11',
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
                          s.buttonGreen,
                          getButtonStyle('estavel'),
                          selectedOption === 'estavel' && {
                            borderColor: '#1a6d11',
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
                        <FInalizacaoModal />
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
