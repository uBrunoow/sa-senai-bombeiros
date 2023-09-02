import { createNativeStackNavigator } from '@react-navigation/native-stack'

import home from '../app/(tabs)/home'
import Login from '../app/(tabs)/login'
import { useSelector } from 'react-redux'
import Anamnese from '../app/(tabs)/anamnese'
import AnamneseGestacional from '../app/(tabs)/anamneseGestacional'
import InfoPaciente from '../app/(tabs)/infoPaciente'
import Introducao from '../app/(tabs)/introducao'
import LocalTraumas from '../app/(tabs)/localTraumas'
import Ocorrencia from '../app/(tabs)/ocorrencia'
import { useAuthMiddleware } from '../src/middlewares/authMiddleware'

const Stack = createNativeStackNavigator()

interface RootState {
  auth: {
    token: string
  }
}

export default function Routes() {
  const { checkAuth } = useAuthMiddleware()

  const token = useSelector((state: RootState) => state.auth.token)

  if (!token) {
    // Se o token não estiver presente, redirecione o usuário para a tela de login
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    )
  }
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
