import { View, Text, TouchableOpacity } from 'react-native'
import NOARLogo from '../../src/assets/logo-noar.svg'
import Icon from '@expo/vector-icons/Feather'
import { useSelector } from 'react-redux'
import { RootState } from '../../src/stores/stores'

export default function App({ navigation }) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.token !== '')

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigation.navigate('ocorrencia')
    } else {
      navigation.navigate('login')
    }
  }
  return (
    <View className=" flex-1 items-center justify-between">
      <View className="h-[67px] w-full bg-[#A00E00]" />
      <View className=" h-[425px] w-full items-center justify-between p-6">
        <NOARLogo className=" h-[147px] w-[148px] shrink-0" />
        <Text className="text-[32px] font-normal leading-[32px] text-[#202020]">
          Bem Vindo(a)!
        </Text>

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
            onPress={handleButtonClick}
          >
            <Icon name="plus" size={50} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
