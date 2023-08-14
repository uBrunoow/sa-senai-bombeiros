import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import NOARLogo from '../../src/assets/logo-noar.svg'
import Icon from '@expo/vector-icons/Feather'
import MainButton from '../components/Botao'

export default function App({ navigation }) {
  return (
    <View className=" flex-1 items-center justify-between bg-offwhite ">
      <View className="h-[67px] w-full bg-[#A00E00]" />
      <View
        className=" h-[425px]  w-full shrink-0 flex-col items-center justify-between
       gap-[34px] bg-red-200"
      >
        <NOARLogo className=" h-[147px] w-[148px] shrink-0" />
        <Text className="text-[32px] font-normal leading-[32px] text-[#202020]">
          Bem Vindo(a)!
        </Text>
        <MainButton></MainButton>

        <Text className=" text-center text-[14px] font-normal leading-[22.4px] text-[#000]">
          Bravos heróis que arriscam suas vidas todos os dias para proteger
          comunidades e salvar vidas.Os bombeiros estão na linha de frente em
          situações de emergência, e para ajuda-los é necassario um meio mais
          ágil de relatórios
        </Text>
      </View>
      <View className="relative h-[67px] w-full items-center bg-[#A00E00]">
        <View className="absolute top-[-50px] h-[100px] w-[100px] items-center justify-center rounded-full bg-offwhite">
          <TouchableOpacity
            className="h-[66px] w-[66px] items-center justify-center rounded-full bg-[#A00E00]"
            onPress={() => navigation.navigate('login')}
          >
            <Icon name="plus" size={50} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
