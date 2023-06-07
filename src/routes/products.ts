import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function productsRoutes(app: FastifyInstance) {
  app.get('/products', async () => {
    const products = await prisma.product.findMany({
      orderBy: [
        {
          categoryId: 'asc',
        },
        { nm: 'asc' },
      ],
    })

    return products
  })

  app.get('/products/:id', async () => {
    const users = await prisma.user.findMany()

    return users
  })

  app.post('/products', async () => {
    const users = await prisma.user.findMany()

    return users
  })

  app.put('/products/:id', async () => {
    const users = await prisma.user.findMany()

    return users
  })

  app.delete('/products/:id', async () => {
    const users = await prisma.user.findMany()

    return users
  })
}
