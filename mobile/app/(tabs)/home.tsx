import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
// import Logobvg from '../../src/assets/logobvg.png'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React from 'react'

export default function App({ navigation }) {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className=" flex-1 items-center justify-between">
        {/* <Logobvg /> */}
        <Text className="m-5 text-2xl font-bold">Bem Vindo(a)!</Text>
        <Text className="text-center text-lg font-bold text-red-600 ">
          Associação de Serviços Sociais Voluntários de Guaramirim
        </Text>
        <Text className="m-4 text-justify">
          Bravos heróis que arriscam suas vidas todos os dias para proteger
          comunidades e salvar vidas. Os bombeiros estão na linha de frente em
          situações de emergência, e para ajuda-los é necessário um meio mais
          ágil de relatórios.
        </Text>
      </View>
      <View>
        <TouchableOpacity>
          <View className="m-auto w-2/6 rounded-lg bg-red-600 p-1">
            <Text className="color-white text-center text-lg">Relatorio</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="h-[67px] w-full bg-[#A00E00]">
        <View>
          <Text>BOTAR AS REDES AQUI</Text>
        </View>
      </View>
    </ScrollView>
  )
}
