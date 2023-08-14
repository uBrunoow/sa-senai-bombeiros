import { createNativeStackNavigator } from '@react-navigation/native-stack'

import home from '../app/(tabs)/home'
import login from '../app/(tabs)/login'

const Stack = createNativeStackNavigator()

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
