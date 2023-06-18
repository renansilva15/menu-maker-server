import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { productsRoutes } from './routes/products'
import { loginRoute } from './routes/login'
import { categoriesRoutes } from './routes/categories'

const app = fastify()

app.register(jwt, {
  secret: 'Garagaragaragaragaragaranhão...',
})

app.register(cors, {
  // origin: ['http://localhost:3000', ''], Endereços do frontend
  origin: true, //
})

app.register(productsRoutes)
app.register(loginRoute)
app.register(categoriesRoutes)

app
  .listen({
    port: 3232,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3232')
  })
