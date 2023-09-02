import { NavigationContainer } from '@react-navigation/native'
import { Provider, useSelector } from 'react-redux'
import store, { RootState } from './src/stores/store'
import React from 'react'
import AuthRoutes from './routes/authStack'
import Routes from './routes/index'

export default function App() {
  // const token = useSelector((state: RootState) => state.auth.token)

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* {token ? <AuthRoutes /> : <Routes />} */}
        <Routes />
      </NavigationContainer>
    </Provider>
  )
}
