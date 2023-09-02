// AuthCheck.tsx
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../src/stores/store'
import AuthRoutes from '../routes/authStack'
import Login from '../app/(tabs)/login'

const AuthCheck = () => {
  const token = useSelector((state: RootState) => state.auth.token)

  const navigationDummy = {
    navigate: (screenName: string) => {},
  }

  if (token) {
    return <AuthRoutes />
  } else {
    return <Login navigation={navigationDummy} />
  }
}

export default AuthCheck
