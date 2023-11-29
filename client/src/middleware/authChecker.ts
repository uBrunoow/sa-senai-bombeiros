// authChecker.js
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const AuthChecker = ({ children }: any) => {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('authToken')
        const userId = Cookies.get('userId')

        if (token) {
          console.log('Token found:', token)
          console.log('User id found:', userId)

          dispatch({
            type: 'SAVE_TOKEN',
            payload: { token, userId: Number(userId) },
          })
        } else {
          router.push('/')
          console.log('Token or userId not found. The user is not logged in.')
        }
      } catch (error) {
        console.error('Error checking token or userId:', error)
      }
    }

    checkAuth()
  })

  return children
}

export default AuthChecker
