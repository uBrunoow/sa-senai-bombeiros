import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import Routes from './routes/index'
import { Provider, useDispatch } from 'react-redux'
import store from './src/stores/stores'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthChecker>
          <Routes />
        </AuthChecker>
      </NavigationContainer>
    </Provider>
  )
}

function AuthChecker({ children }) {
  const dispatch = useDispatch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken')

        if (token !== null) {
          console.log('Token encontrado:', token)
          dispatch({ type: 'SAVE_TOKEN', payload: token })
        } else {
          console.log('Token não encontrado. O usuário não está logado.')
        }
      } catch (error) {
        console.error('Erro ao verificar o token:', error)
      }
    }

    checkAuth()
  }, [])

  return children
}
