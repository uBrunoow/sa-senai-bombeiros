import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import Routes from './routes/index'
import { Provider, useDispatch } from 'react-redux'
import store from './src/redux/stores/stores'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeBaseProvider } from 'native-base'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop.'])
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <AuthChecker>
            <Routes />
          </AuthChecker>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  )
}

function AuthChecker({ children }: any) {
  const dispatch = useDispatch()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken')
        const userId = await AsyncStorage.getItem('userId')
        const refreshToken = await AsyncStorage.getItem('refreshToken')

        if (token !== null || (refreshToken !== null && userId !== null)) {
          console.log('Token found:', token)
          console.log('User id found:', userId)
          console.log('Refresh token found:', refreshToken)

          dispatch({
            type: 'SAVE_TOKEN',
            payload: { token, userId: Number(userId), refreshToken },
          })
        } else {
          console.log('Token or userId not found. The user is not logged in.')
        }
      } catch (error) {
        console.error('Error checking token or userId:', error)
      }
    }

    checkAuth()
  }, [dispatch])

  return children
}
