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
import { useDispatch, useSelector } from 'react-redux'
import registerAnamnesis from '../../src/api/registerAnamnesis'
import { RootState } from '../../src/stores/stores'
import { saveAnamnesisId } from '../../src/actions/reportActions'

export default function Ocorrencia({ navigation }) {
  const ReportOwnerId = useSelector((state: RootState) => state.report.reportId)

  const { bottom, top } = useSafeAreaInsets()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })

    navigation.navigate('home')
  }

  const existingAnamnesisId = useSelector(
    (state: RootState) => state.anamnesis.anamnesisId,
  )

  console.log(existingAnamnesisId)

  const handleClickAnamnese = async () => {
    if (existingAnamnesisId) {
      navigation.navigate('anamnese', {
        screen: 'anamnese',
        params: { anamnesisId: existingAnamnesisId },
      })
    } else {
      const response = await registerAnamnesis(ReportOwnerId)

      if (response && response.anamnesis) {
        dispatch(saveAnamnesisId(response.anamnesis.id))
        console.log('Anamnese n°: ', response.anamnesis.id)

        navigation.navigate('anamnese', {
          screen: 'anamnese',
          params: { anamnesisId: response.anamnesis.id },
        })
      }
    }
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
        <TouchableOpacity onPress={handleClickAnamnese} activeOpacity={0.7}>
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
        <Pressable onPress={() => navigation.navigate(`home`)}>
          <MainButton innerText="FINALIZAR" />
        </Pressable>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <Footer />
    </ScrollView>
  )
}
