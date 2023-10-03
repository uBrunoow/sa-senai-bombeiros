import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'

import { MultipleSelectList } from 'react-native-dropdown-select-list'

const Finalizacao = () => {
  const [selected, setSelected] = React.useState('')
  const [categories, setCategories] = React.useState([])
  const [isPressed, setIsPressed] = useState(false)
  const [selectedOption, setSelectedOption] = React.useState(null)

  const handleOptionPress = (option) => {
    setSelectedOption(option)
  }

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const getButtonStyle = (option) => {
    return {
      borderColor: selectedOption === option ? '#6d1111' : 'transparent',
      borderWidth: 2,
      borderRadius: 7,
    }
  }

  console.log(selectedOption)

  const data = [
    { key: 'Deitada', value: 'Deitada' },
    { key: 'Semi-deitada', value: 'Semi-deitada' },
    { key: 'Sentada', value: 'Sentada' },
  ]
  return (
    <>
      <Header />
      <SafeAreaView className="m-0 flex-1 items-center bg-white p-0 px-[21.5px]">
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
              <Text className="text-[25px] font-bold">TAKAMASA NOMURO</Text>
              <Pressable>
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
                    getButtonStyle(pressed),
                    selectedOption === 'critico' && { borderColor: '#6d1111' },
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
                <Text>Crítico</Text>
              </View>
              <View>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? '#000' : 'transparent',
                    },
                    styles.buttonOrange,
                    getButtonStyle(),
                    selectedOption === 'instavel' && { borderColor: '#6d4011' },
                  ]}
                  onPress={() => handleOptionPress('instavel')}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                >
                  <MaterialIcons name="mood-bad" size={24} color="white" />
                </Pressable>
                <Text>Instável</Text>
              </View>
              <View>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? '#000' : 'transparent',
                    },
                    styles.buttonYellow,
                    getButtonStyle(),
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
                <Text>P. Estável</Text>
              </View>
              <View>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? '#000' : 'transparent',
                    },
                    styles.buttonGreen,
                    getButtonStyle(),
                    selectedOption === 'estavel' && { borderColor: '#1a6d11' },
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
                <Text>Estável</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Footer />
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
})

export default Finalizacao
