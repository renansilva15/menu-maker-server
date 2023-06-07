import fastify from 'fastify'
import { productsRoutes } from './routes/products'

const app = fastify()

app.register(productsRoutes)

app
  .listen({
    port: 3232,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3232')
  })
