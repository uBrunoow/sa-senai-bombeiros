import { FastifyInstance } from 'fastify'
import { renewAccessToken } from '../middlewares/renewAccessToken'
import { LocalStorage } from 'node-localstorage'

export function checkTokenExpiration(
  app: FastifyInstance,
  opts: any,
  done: () => void,
) {
  const localStorage = new LocalStorage('./scratch')

  const checkToken = async () => {
    const token = localStorage.getItem('token')
    // console.log('Token salvo:', token)

    if (token) {
      try {
        const decodedToken = app.jwt.decode(token, { complete: true }) as {
          payload: { exp?: number }
        }

        if (decodedToken && decodedToken.payload.exp) {
          const expirationTime = decodedToken.payload.exp
          const currentTime = Date.now() / 1000

          const secondsRemaining = expirationTime - currentTime
          const minutesRemaining = Math.floor(secondsRemaining / 60)
          const remainingSeconds = Math.floor(secondsRemaining % 60)
          const checkTime = 2

          if (secondsRemaining <= 0) {
            console.log(`⚠️ Atenção: Token expirou!`)
          } else if (minutesRemaining < checkTime) {
            console.log(
              `⚠️ Atenção: Token expirará em ${minutesRemaining} minutos e ${remainingSeconds} segundos!`,
            )
          }

          const timeDifference = decodedToken.payload.exp - currentTime

          if (timeDifference <= 60 && timeDifference >= 0) {
            const refreshToken = localStorage.getItem('refreshToken')

            if (refreshToken) {
              const newAccessToken = await renewAccessToken(refreshToken)
              localStorage.setItem('token', newAccessToken)
            }
          }
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error)
      }
    }
  }

  checkToken()

  const intervalId = setInterval(checkToken, 30000)

  done()

  app.addHook('onClose', (instance, done) => {
    clearInterval(intervalId)
    done()
  })
}
