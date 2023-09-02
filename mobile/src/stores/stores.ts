// store.js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' // Middleware para ações assíncronas (opcional)
import rootReducer from '../reducers/authReducer' // Importe o seu rootReducer

// Configuração do middleware (pode ser estendida conforme necessário)
const middleware = [thunk]

// Crie o store Redux
const store = createStore(
  rootReducer, // Seu rootReducer
  applyMiddleware(...middleware), // Aplicar middleware (se necessário)
)

export default store
