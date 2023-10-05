import { NavigationContainer, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import Routes from './routes/index'
import { Provider, useDispatch } from 'react-redux'
import store from './src/redux/stores/stores'
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
  const navigation = useNavigation()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken')
        const userId = await AsyncStorage.getItem('userId')
        const reportId = await AsyncStorage.getItem('reportId')

        if (token !== null && userId !== null) {
          console.log('Token found:', token)
          console.log('User id found:', userId)
          dispatch({
            type: 'SAVE_TOKEN',
            payload: { token, userId: Number(userId) },
          })

          if (!reportId) {
            console.log('ReportId not found. Redirecting to the home page.')
            navigation.navigate('home' as never)
          }
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
