import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Anamnese from '../app/(tabs)/anamnese'
import AnamneseGestacional from '../app/(tabs)/anamneseGestacional'
import InfoPaciente from '../app/(tabs)/infoPaciente'
import Introducao from '../app/(tabs)/introducao'
import LocalTraumas from '../app/(tabs)/localTraumas'
import Ocorrencia from '../app/(tabs)/ocorrencia'

const Stack = createNativeStackNavigator()

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
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
        name="ocorrencia"
        component={Ocorrencia}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
