import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../app/(tabs)/Home/home'
import Login from '../app/(tabs)/Login/login'
import Anamnese from '../app/(tabs)/Anamnese/anamnese'
import AnamneseGestacional from '../app/(tabs)/AnamneseGestacional/anamneseGestacional'
import InfoPaciente from '../app/(tabs)/InfoPaciente/infoPaciente'
import InfoTransporte from '../app/(tabs)/infoTransporte/infoTransporte'
import Introducao from '../app/(tabs)/Introducao/introducao'
import LocalTraumas from '../app/(tabs)/LocalTraumas/localTraumas'
import Ocorrencia from '../app/(tabs)/Ocorrencia/ocorrencia'
import React from 'react'
import Finalizacao from '@app/(tabs)/FInalizacao/finalizacao'

const Stack = createNativeStackNavigator()

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ocorrencia"
        component={Ocorrencia}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="anamnese"
        component={Anamnese}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="anamnese-gestacional"
        component={AnamneseGestacional}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="info-paciente"
        component={InfoPaciente}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="info-transporte"
        component={InfoTransporte}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="introducao"
        component={Introducao}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="local-traumas"
        component={LocalTraumas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="finalizacao"
        component={Finalizacao}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
