import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import NOARLogo from '../../../src/public/logo-noar.svg'
import Firefighter from '../../../src/public/firefighter.svg'
import Hexagon from '../../../src/public/hexagon.svg'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../src/redux/stores/stores'
import registerReport from '../../../src/api/registerReport'
import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { saveReportId } from '../../../src/redux/actions/reportActions'
// import { saveReportId } from '../../src/actions/reportActions' // Importe a ação

function App({ navigation }) {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.token !== '')
  const ownerId = useSelector((state: RootState) => state.auth.userId)

  const handleButtonClick = async () => {
    if (isLoggedIn) {
      const response = await registerReport(ownerId)
      const reportId = response.report.id
      console.log('Report de n°:', reportId)
      dispatch(saveReportId(reportId))
      navigation.navigate('ocorrencia')
    } else {
      navigation.navigate('login')
    }
  }
  return (
    <SafeAreaView className="m-0 flex-1 bg-white p-0">
      <View className="bg-red flex-1 items-center justify-center">
        {/* Header View, maybe placing some about us links here */}
        <View className=""></View>
        {/* End Header View */}
        <View className="z-50 mb-44 items-center justify-center gap-6">
          {/* Main view */}
          <NOARLogo></NOARLogo>
          <Text className="text-4xl font-bold">Bem vindo(a)!</Text>
          <Text className="text-xl font-bold text-red-600">
            Núcleo de Operações Aéreas e Resgate
          </Text>
          <Text className="px-3 text-center font-bold">
            Bravos heróis que arriscam suas vidas todos os dias para proteger
            comunidades e salvar vidas. Os bombeiros estão na linha de frente em
            situações de emergência, e para ajuda-los é necessário um meio mais
            ágil de relatórios
          </Text>
          <TouchableOpacity
            onPress={handleButtonClick}
            className="w-2/6 rounded-md bg-red-600 px-5 py-2"
          >
            <Text className="text-center text-lg text-white">RELATÓRIO</Text>
          </TouchableOpacity>
          {/* End main view */}
        </View>
        {/* Footer */}
        <View className="absolute bottom-0 z-30 w-full flex-row p-3 py-5 ">
          <TouchableOpacity
            className="px-2"
            onPress={() => {
              Linking.openURL('https://noar.org.br/')
            }}
          >
            <Entypo name="globe" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="px-2">
            <Entypo name="instagram" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="px-2">
            <Entypo name="facebook" size={24} color="white" />
          </TouchableOpacity>
          {/* End footer */}
        </View>
        <View className="absolute bottom-0 right-0 z-20">
          <Firefighter />
        </View>
        <View className="absolute bottom-[-120px] right-0 z-10 ml-10 w-full flex-1">
          <Hexagon width={500} height={340} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default App
