import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native'
import NOARLogo from '../../src/assets/logo-noar.svg'
import Hexagon from '../../src/assets/hexagon.svg'
import React from 'react'
import { Feather } from '@expo/vector-icons'

export default function App({ navigation }) {
  return (
    <View className="flex-1 items-center">
      <View className=" w-full items-center p-6">
        <NOARLogo />
        <Text className="m-5 text-2xl font-bold">Bem Vindo(a)!</Text>
        <Text className="text-center text-lg font-bold text-red-600 ">
          Associação de Serviços Sociais Voluntários de Guaramirim
        </Text>
        <Text className="m-4 text-center">
          Bravos heróis que arriscam suas vidas todos os dias para proteger
          comunidades e salvar vidas. Os bombeiros estão na linha de frente em
          situações de emergência, e para ajuda-los é necessário um meio mais
          ágil de relatórios.
        </Text>
        <View>
          <TouchableOpacity>
            <View className="m-auto rounded-lg bg-red-600 px-5 py-1">
              <Text className="color-white text-center text-lg">Relatório</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-[67px] w-full bg-[#A00E00]">
        <View className="h-full flex-row items-center gap-x-2 px-3">
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.instagram.com/bvsc.guaramirim/')
            }
          >
            <Feather name="instagram" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://bvgm.com.br/')}
          >
            <Feather name="globe" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* <Hexagon style={styles.hexagon} /> */}
    </View>
  )
}
