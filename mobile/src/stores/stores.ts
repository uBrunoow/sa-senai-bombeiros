// store.ts
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk' // Middleware para ações assíncronas (opcional)
import authReducer from '../reducers/authReducer' // Importe o seu authReducer

// Defina o estado da raiz
export interface RootState {
  auth: {
    token: string
  }
}

// Crie a store Redux com a função configureStore
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Adicione outros reducers aqui, se houver
  },
  middleware: [thunk], // Middleware (se necessário)
})

export default store
