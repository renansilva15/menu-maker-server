import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function loginRoute(app: FastifyInstance) {
  app.post('/login', async (request) => {
    const bodySchema = z.object({
      cpf: z.string(),
      password: z.string(),
      isManager: z.coerce.boolean().default(false),
    })

    const { cpf, password, isManager } = bodySchema.parse(request.body)

    let user
    if (isManager) {
      user = await prisma.manager.findUniqueOrThrow({
        where: {
          cpf,
        },
      })
    } else {
      user = await prisma.user.findUniqueOrThrow({
        where: {
          cpf,
        },
      })
    }

    if (password !== user.password) {
      return
    }

    const token = app.jwt.sign(
      {
        nm: user.name,
      },
      {
        sub: user.id,
        expiresIn: '12h', // Talvez bug
      },
    )

    console.log(cpf, password, isManager)

    return {
      token,
    }
  })
}
