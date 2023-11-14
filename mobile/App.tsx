import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import Routes from './routes/index'
import { Provider, useDispatch } from 'react-redux'
import store from './src/redux/stores/stores'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeBaseProvider } from 'native-base'
import { renewAccessToken } from '@src/utils/teste2'
import { AppState } from 'react-native'

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

        if (token !== null && userId !== null) {
          console.log('Token found:', token)
          console.log('User id found:', userId)

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

    // let intervalId

    // async function checkTokenExpiration() {
    //   const token = await AsyncStorage.getItem('authToken')

    //   if (token) {
    //     try {
    //       const decodedToken = parseJwt(token)

    //       if (decodedToken && decodedToken.exp) {
    //         const expirationTime = decodedToken.exp
    //         const currentTime = Math.floor(Date.now() / 1000)

    //         const secondsRemaining = expirationTime - currentTime

    //         if (secondsRemaining <= 0) {
    //           console.log(`⚠️ Atenção: Token expirou!`)
    //         } else {
    //           const minutesRemaining = Math.floor(secondsRemaining / 60)
    //           const remainingSeconds = Math.floor(secondsRemaining % 60)
    //           const checkTime = 2 // minutos antes do vencimento para enviar notificação

    //           if (minutesRemaining < checkTime) {
    //             console.log(
    //               `⚠️ Atenção: Token expirará em ${minutesRemaining} minutos e ${remainingSeconds} segundos!`,
    //             )

    //             // Adicione a lógica de notificação aqui
    //             showNotification()
    //           }

    //           const timeDifference = decodedToken.exp - currentTime

    //           if (timeDifference <= 60 && timeDifference >= 0) {
    //             const refreshToken = AsyncStorage.getItem('refreshToken')

    //             console.log('Refresh Token:', refreshToken)

    //             if (refreshToken) {
    //               // Simule a renovação do token (não seguro no lado do cliente)
    //               renewAccessToken(refreshToken).then((newAccessToken) => {
    //                 AsyncStorage.setItem('token', newAccessToken)
    //               })
    //             }
    //           }
    //         }
    //       }
    //     } catch (error) {
    //       console.error('Erro ao decodificar o token:', error)
    //     }
    //   }
    // }

    // function parseJwt(token) {
    //   try {
    //     const base64Url = token.split('.')[1]
    //     const base64 = base64Url.replace('-', '+').replace('_', '/')
    //     return JSON.parse(base64.decode(base64))
    //   } catch (error) {
    //     console.error('Erro ao decodificar o token:', error)
    //     return null
    //   }
    // }

    // // Função para exibir notificação
    // function showNotification() {
    //   try {
    //     // Customize sua notificação
    //     console.log('Exibindo notificação...')
    //   } catch (error) {
    //     console.error('Erro ao exibir notificação:', error)
    //   }
    // }

    // // Função para iniciar o intervalo
    // function startTokenCheckInterval() {
    //   intervalId = setInterval(checkTokenExpiration, 30000)
    // }

    // // Adicione um ouvinte de estado de aplicativo para parar o intervalo quando a aplicação estiver inativa
    // AppState.addEventListener('change', (newState) => {
    //   if (newState === 'active') {
    //     startTokenCheckInterval()
    //   } else {
    //     clearInterval(intervalId)
    //   }
    // })

    // // Inicie o intervalo quando o componente for montado
    // startTokenCheckInterval()

    checkAuth()
  }, [dispatch])

  return children
}
