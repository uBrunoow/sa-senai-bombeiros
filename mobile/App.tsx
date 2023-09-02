import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import Routes from './routes/index'
import { Provider } from 'react-redux'
import store from './src/stores/stores'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  )
}
