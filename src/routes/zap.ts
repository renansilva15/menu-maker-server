import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function zapRoute(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/zap', async () => {
    const manager = await prisma.manager.findFirst()
    const zap = manager?.zap

    return zap
  })
}
