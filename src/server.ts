import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { productsRoutes } from './routes/products'
import { loginRoute } from './routes/login'
import { categoriesRoutes } from './routes/categories'
import { numberOfTablesRoutes } from './routes/numberOfTables'
import { registerRoute } from './routes/register'
import { zapRoute } from './routes/zap'

const app = fastify()

app.register(jwt, {
  secret: 'Garagaragaragaragaragaranhão...', // Tem que mandar para o .env
})

app.register(cors, {
  // origin: ['http://localhost:3000', ''], Endereços do frontend
  origin: true,
})

app.register(productsRoutes)
app.register(loginRoute)
app.register(categoriesRoutes)
app.register(numberOfTablesRoutes)
app.register(registerRoute)
app.register(zapRoute)

app
  .listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3232,
  })
  .then(() => {
    console.log('HTTP server running')
  })
