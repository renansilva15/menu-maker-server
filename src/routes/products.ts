import { FastifyInstance } from 'fastify'
import { z } from 'zod'
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

  app.get('/products/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return product
  })

  app.post('/products', async (request) => {
    const bodySchema = z.object({
      categoryId: z.string(),
      nm: z.string(),
      price: z.number(),
    })

    const { categoryId, nm, price } = bodySchema.parse(request.body)

    const product = await prisma.product.create({
      data: {
        managerId: '6aa91385-bb1a-4987-be18-5f7b90bacef9',
        categoryId,
        nm,
        price,
      },
    })

    return product
  })

  app.put('/products/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      categoryId: z.string(),
      nm: z.string(),
      price: z.number(),
    })

    const { categoryId, nm, price } = bodySchema.parse(request.body)

    const memory = await prisma.product.update({
      where: {
        id,
      },

      data: {
        categoryId,
        nm,
        price,
      },
    })

    return memory
  })

  app.delete('/products/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.product.delete({
      where: {
        id,
      },
    })
  })
}
