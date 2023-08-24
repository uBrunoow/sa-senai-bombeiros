import jwt from '@fastify/jwt'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { userRegisterRoutes } from './src/routes/users/registerRoutes'
import { userLoginRoutes } from './src/routes/users/loginRoutes'
import { userUpdateRoutes } from './src/routes/users/updateRoutes'
import { userDeleteRoutes } from './src/routes/users/deleteRoutes'
import {
  userFindOneRoutes,
  userFindRoutes,
} from './src/routes/users/findRoutes'
import { testeRoute } from './src/testes/testeRoute'
import { criarSintomas } from './src/testes/criarSintomas'
import bcrypt from 'fastify-bcrypt' // Importe o plugin aqui
import { criarSintomas2 } from './src/testes/criarSintoma2'

const app = fastify() // Dar para a const app todas as informações do Fastify

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'bombeiro',
})

app.register(bcrypt)

app.register(userRegisterRoutes)
app.register(userLoginRoutes)
app.register(userUpdateRoutes)
app.register(userDeleteRoutes)
app.register(userFindOneRoutes)
app.register(userFindRoutes)
app.register(testeRoute)
app.register(criarSintomas)
app.register(criarSintomas2)

app
  .listen({
    port: 3333, // Porta para rodar na Aplicação WEB
    host: '0.0.0.0', // Porta para rodar na Aplicação APPs
  })
  .then(() => {
    console.log('🔥🚒 HTTP server running on port http://localhost:3333') // Ao rodar o server aparecer a seguinte mensagem
  })
