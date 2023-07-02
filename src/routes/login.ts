import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function loginRoute(app: FastifyInstance) {
  app.post('/login', async (request, reply) => {
    const bodySchema = z.object({
      cpf: z.string(),
      password: z.string(),
      isManager: z.coerce.boolean().default(false),
    })

    const { cpf, password, isManager } = bodySchema.parse(request.body)

    let user

    try {
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
    } catch (err) {
      if (String(err).includes("Can't reach database")) {
        // console.log('Erro ao contatar o servidor, verifique sua conexão')
        return reply.code(500).send()
      } else {
        // console.log('Usuário não encontrado')
        return reply.code(404).send()
      }
    }

    if (password !== user.password) {
      // console.log('Senha incorreta')
      return reply.code(401).send()
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

    return reply.code(200).send({
      token,
    })
  })
}
