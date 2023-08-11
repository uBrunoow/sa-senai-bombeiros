import jwt from '@fastify/jwt'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { authRoutes } from './routes/public/auth' // Rota de login
const app = fastify() // Dar para a const app todas as informações do Fastify

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'bombeiros',
})

app.register(authRoutes)

app
  .listen({
    port: 3333, // Porta para rodar na Aplicação WEB
    host: '0.0.0.0', // Porta para rodar na Aplicação APPs
  })
  .then(() => {
    console.log('🔥🚒🤷‍♂️ HTTP server running on port http://localhost:3333') // Ao rodar o server aparecer a seguinte mensagem
  })
