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
        const data = 'Erro ao contatar o banco de dados, verifique sua conexão'
        console.log(data)
        return reply.code(500).send(data)
      } else {
        const data = 'Usuário não encontrado'
        console.log(data)
        return reply.code(404).send(data)
      }
    }

    if (password !== user.password) {
      const data = 'Senha incorreta'
      console.log(data)
      return reply.code(401).send(data)
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        isManager,
      },
      {
        sub: user.id,
        expiresIn: '12h',
      },
    )

    return reply.code(200).send({
      token,
    })
  })
}
