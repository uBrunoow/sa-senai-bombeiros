import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import Routes from './routes/index'
import { Provider, useDispatch } from 'react-redux'
import store from './src/redux/stores/stores'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeBaseProvider } from 'native-base'

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
        const expirationDate = await AsyncStorage.getItem('expirationDate')

        if (token !== null && userId !== null) {
          console.log('Token found:', token)
          console.log('User id found:', userId)
          console.log('Expiration Date:', expirationDate)
          dispatch({
            type: 'SAVE_TOKEN',
            payload: { token, userId: Number(userId) },
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
