import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Pressable,
  Button,
} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Grouper from '../components/Grouper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Footer from '../components/Footer'
import { FontAwesome5 } from '@expo/vector-icons'
import MainButton from '../components/MainButton'
import { useDispatch } from 'react-redux'

export default function Ocorrencia({ navigation }) {
  const { bottom, top } = useSafeAreaInsets()

  const dispatch = useDispatch()

  const handleLogout = () => {
    // Despache a ação de logout para limpar o token
    dispatch({ type: 'LOGOUT' })

    // Redirecione o usuário para a página de login (opcional)
    navigation.navigate('login')
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        <Header />
        <View className="mb-[40px] mt-[34px] flex-row items-center justify-center">
          <FontAwesome5 name="fire" size={24} color="#A00E00" />
          <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
            Ocorrência
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(`introducao`)}
          activeOpacity={0.7}
        >
          <Grouper
            title="Introdução"
            desc="Dados da vítima, tipo ocorr..."
            isCompleted={4}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`anamnese`)}
          activeOpacity={0.7}
        >
          <Grouper
            title="Anamnese de Emergência"
            desc="Sinais e sintomas, observações..."
            isCompleted={2}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`info-paciente`)}
          activeOpacity={0.7}
        >
          <Grouper
            title="Info. do paciente"
            desc="Aval. paciente, sinais vitais..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`local-traumas`)}
          activeOpacity={0.7}
        >
          <Grouper
            title="Localizações da Fratura"
            desc="Local dos traumas, tipo trau..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`info-transporte`)}
          activeOpacity={0.7}
        >
          <Grouper
            title="Info. de Transporte"
            desc="Condução, condição transp..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`info-hospitalares`)}
          activeOpacity={0.7}
        >
          <Grouper
            title="Info. Hospitalares"
            desc="Procedimentos efetuados..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`anamnese-gestacional`)}
          activeOpacity={0.7}
        >
          <Grouper
            title="Anamnese Gestacional"
            desc="Período gestação, pré-natal..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(`finalizacao`)}
          activeOpacity={0.7}
        >
          <Grouper
            title="Finalização"
            desc="Observações, objetos..."
            isCompleted={0}
          />
        </TouchableOpacity>
        <Pressable onPress={() => navigation.navigate(``)}>
          <MainButton innerText="FINALIZAR" />
        </Pressable>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <Footer />
    </ScrollView>
  )
}
