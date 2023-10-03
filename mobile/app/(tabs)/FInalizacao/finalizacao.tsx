import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons'

import { MultipleSelectList } from 'react-native-dropdown-select-list'
import findAnamnesis from '../../../src/api/findAnamnesis'
import { calculateAnamnesisCompleteness } from '../../../src/utils/calculateAnamnesisCompleteness'
import { useSelector } from 'react-redux'
import { RootState } from '../../../src/redux/stores/stores'
import findUser from '../../../src/api/findUser'
import FInalizacaoModal from '../../modal/FInalizacaoModal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Finalizacao = () => {
  const [selected, setSelected] = React.useState('')
  const [categories, setCategories] = React.useState([])
  const [isPressed, setIsPressed] = useState(false)
  const [selectedOption, setSelectedOption] = React.useState(null)
  const [changeResponsable, setChangeResponsable] = useState(false)
  const [responsable, setResponsable] = useState('')

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
      borderWidth: 2,
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (ownerId) {
          const response = await findUser(ownerId)
          const userNameResponse = response.user.name
          setResponsable(userNameResponse)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
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
        <Header />
        <SafeAreaView className="m-0 h-screen items-center bg-white p-0 px-[21.5px]">
          <View className="mb-[25px] mt-[34px] flex-row items-center justify-center">
            <FontAwesome5 name="flag-checkered" size={24} color="#F23030" />
            <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
              Finalização
            </Text>
          </View>

          <View
            style={styles.boxShadow}
            className="h-[500px] w-full rounded-[14px] bg-white px-[17px] py-[30px] shadow-md"
          >
            <View>
              <Text className="text-[15px] font-normal">
                Responsável pelo preenchimento:
              </Text>
              <View className="w-full flex-row items-center justify-between">
                <Text className="text-[25px] font-bold">{responsable}</Text>
                <Pressable onPress={handleChangeName}>
                  <Ionicons name="md-pencil" size={24} color="black" />
                </Pressable>
              </View>
            </View>
            <View>
              <Text>Objetos recolhidos</Text>
              <TextInput className="items-center justify-between rounded-[7px] border-width1 border-preto p-[10px]" />
            </View>

            <View>
              <Text>Forma de condução</Text>
              <MultipleSelectList
                setSelected={(val) => setCategories(val)}
                data={data}
                save="value"
                label="Categories"
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
                      styles.button,
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
                      styles.buttonOrange,
                      getButtonStyle('instavel'),
                      selectedOption === 'instavel' && {
                        borderColor: '#6d4011',
                      },
                    ]}
                    onPress={() => handleOptionPress('instavel')}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                  >
                    <MaterialIcons name="mood-bad" size={24} color="white" />
                  </Pressable>
                  <Text className="text-center">Instável</Text>
                </View>
                <View>
                  <Pressable
                    style={({ pressed }) => [
                      styles.buttonYellow,
                      getButtonStyle('possivelmente estavel'),
                      selectedOption === 'possivelmente estavel' && {
                        borderColor: '#656d11',
                      },
                    ]}
                    onPress={() => handleOptionPress('possivelmente estavel')}
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
                      styles.buttonGreen,
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
                  style={styles.modalContent}
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
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOpacity: 0,
    shadowRadius: 4,
    textShadowOffset: { width: 8, height: 2 },
  },
  button: {
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#F23030',
  },
  buttonOrange: {
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#FF6B00',
  },
  buttonYellow: {
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#FFC700',
  },
  buttonGreen: {
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#11D300',
  },
  modalContent: {
    elevation: 5, // for Android
  },
})

export default Finalizacao
