import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from 'react-native'
import NOARLogo from '@src/public/logo-noar.svg'
import Firefighter from '@src/public/firefighter.svg'
import Hexagon from '@src/public/hexagon.svg'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'src/redux/stores/stores'
import registerReport from '@src/api/reports/registerReport'
import { Entypo } from '@expo/vector-icons'
import React, { useState } from 'react'
import { saveReportId, setMode } from '@src/redux/actions/reportActions'
import { useNavigation } from '@react-navigation/core'

function Home() {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [isHistoryLoading, setIsHistoryLoading] = useState(false)
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.token !== '')
  const isReportIn = useSelector(
    (state: RootState) => state.report.reportId !== null,
  )
  const ReportOwnerId = useSelector((state: RootState) => state.report.reportId)
  const ownerId = useSelector((state: RootState) => state.auth.userId)

  const handleButtonClick = async () => {
    try {
      setIsLoading(true)
      if (isLoggedIn) {
        // Verifica se já existe um reportId salvo no Redux
        if (!isReportIn) {
          // Se não existir, cria um novo relatório
          const response = await registerReport(ownerId)
          const reportId = response.report.id
          console.log('Report de n°:', reportId)
          dispatch(saveReportId(reportId))
        } else {
          // Se já existir, utiliza o reportId existente
          console.log('Report de n°:', ReportOwnerId)
          dispatch(saveReportId(ReportOwnerId))
        }

        // Navega para a página de ocorrência
        dispatch(setMode('create'))
        navigation.navigate('ocorrencia' as never)
      } else {
        // Se não estiver logado, redireciona para a página de login
        navigation.navigate('login' as never)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleHistoryButtonClick = async () => {
    try {
      setIsLoading(true)
      if (isLoggedIn) {
        navigation.navigate('history' as never)
      } else {
        navigation.navigate('login' as never)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
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
          <Pressable onPress={handleButtonClick}>
            {isLoading ? (
              <View className="w-[150px] rounded-md bg-red-700 px-5 py-2">
                <View className="h-[30px]">
                  <ActivityIndicator size="large" color="#ffffff" />
                </View>
              </View>
            ) : (
              <View className="w-[150px] rounded-md bg-red-600 px-5 py-2">
                <View className="h-[30px]">
                  <Text className="text-center text-lg text-white">
                    RELATÓRIO
                  </Text>
                </View>
              </View>
            )}
          </Pressable>
          <Pressable onPress={handleHistoryButtonClick}>
            {isHistoryLoading ? (
              <View className="w-[150px] rounded-md bg-red-700 px-5 py-2">
                <View className="h-[30px]">
                  <ActivityIndicator size="large" color="#ffffff" />
                </View>
              </View>
            ) : (
              <View className="w-[150px] rounded-md bg-red-600 px-5 py-2">
                <View className="h-[30px]">
                  <Text className="text-center text-lg text-white">
                    HISTÓRICO
                  </Text>
                </View>
              </View>
            )}
          </Pressable>
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
          <TouchableOpacity
            className="px-2"
            onPress={() => {
              Linking.openURL('https://www.instagram.com/bvsc.guaramirim/')
            }}
          >
            <Entypo name="instagram" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="px-2"
            onPress={() => {
              Linking.openURL(
                'https://www.facebook.com/Bombeirosnoar/?locale=pt_BR',
              )
            }}
          >
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

export default Home
