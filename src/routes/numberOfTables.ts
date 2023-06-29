import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function numberOfTablesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/tables', async () => {
    const manager = await prisma.manager.findMany()

    return manager[0].numberOfTables
  })
}
