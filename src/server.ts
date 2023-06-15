import fastify from 'fastify'
import cors from '@fastify/cors'
import { productsRoutes } from './routes/products'
import { usersRoutes } from './routes/users'

const app = fastify()

app.register(cors, {
  // origin: ['http://localhost:3000', ''], Endereços do frontend
  origin: true, //
})

app.register(productsRoutes)
app.register(usersRoutes)

app
  .listen({
    port: 3232,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3232')
  })
