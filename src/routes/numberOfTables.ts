import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function numberOfTablesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/tables', async () => {
    const manager = await prisma.manager.findMany()
    const numberOfTablesResponse = []

    for (let table = 0; table < manager[0].numberOfTables; table++) {
      numberOfTablesResponse.push({
        value: `Mesa ${table + 1}`,
        label: `Mesa ${table + 1}`,
      })
    }

    return numberOfTablesResponse
  })
}
