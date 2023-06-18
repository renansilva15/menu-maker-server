import { FastifyInstance } from 'fastify'
// import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function categoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/categories', async () => {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: 'asc',
      },
    })

    const categoriesResponse = []

    for (const category of categories) {
      categoriesResponse.push({ value: category.id, label: category.id })
    }

    console.log(categoriesResponse)

    return categoriesResponse
  })
}
