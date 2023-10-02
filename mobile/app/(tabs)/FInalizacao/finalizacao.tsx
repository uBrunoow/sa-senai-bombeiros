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

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const getButtonStyle = () => {
    return {
      // Adiciona a borda se o botão estiver pressionado
      borderColor: isPressed ? '#6d1111' : 'transparent',
      borderWidth: 2,
      borderRadius: 7,
    }
  }

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
                    {
                      backgroundColor: pressed ? '#000' : 'transparent',
                    },
                    styles.button,
                    getButtonStyle(), // Aplica o estilo condicional da borda
                  ]}
                  onPress={() => console.log('Pressed!')}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                >
                  <MaterialCommunityIcons
                    name="emoticon-dead-outline"
                    size={24}
                    color="white"
                  />
                </Pressable>
                <Text></Text>
              </View>
              <View>
                <Pressable className="h-[50px] w-[70px] items-center justify-center rounded-[7px] bg-[#FF6B00]">
                  <MaterialIcons name="mood-bad" size={24} color="white" />
                </Pressable>
                <Text></Text>
              </View>
              <View>
                <Pressable className="h-[50px] w-[70px] items-center justify-center rounded-[7px] bg-[#FFC700]">
                  <MaterialCommunityIcons
                    name="emoticon-neutral-outline"
                    size={24}
                    color="white"
                  />
                </Pressable>
                <Text></Text>
              </View>
              <View>
                <Pressable className="h-[50px] w-[70px] items-center justify-center rounded-[7px] bg-[#11D300]">
                  <MaterialCommunityIcons
                    name="emoticon-excited-outline"
                    size={24}
                    color="white"
                  />
                </Pressable>
                <Text></Text>
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
})

export default Finalizacao
