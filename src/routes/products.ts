import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function productsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/products', async (request) => {
    const products = await prisma.product.findMany({
      where: {
        managerId: request.user.sub,
      },
      orderBy: [
        {
          categoryId: 'asc',
        },
        { name: 'asc' },
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
      name: z.string(),
      price: z.number(),
    })

    const { categoryId, name, price } = bodySchema.parse(request.body)

    const product = await prisma.product.create({
      data: {
        managerId: request.user.sub,
        categoryId,
        name,
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
      name: z.string(),
      price: z.number(),
    })

    const { categoryId, name, price } = bodySchema.parse(request.body)

    const memory = await prisma.product.update({
      where: {
        id,
      },

      data: {
        categoryId,
        name,
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
