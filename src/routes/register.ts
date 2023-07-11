import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function registerRoute(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      cpf: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, cpf, email, password } = bodySchema.parse(request.body)

    console.log(name, cpf, email, password)

    const isCpfRegister =
      (await prisma.user.findUnique({
        where: {
          cpf,
        },
      })) ||
      (await prisma.manager.findUnique({
        where: {
          cpf,
        },
      }))

    if (isCpfRegister) {
      return reply.status(401).send('CPF já cadastrado')
    }

    const isEmailRegister = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (isEmailRegister) {
      return reply.status(402).send('email já cadastrado')
    }

    const user = await prisma.user.create({
      data: {
        name,
        cpf,
        email,
        password,
      },
    })

    return reply.status(200).send(user)
  })
}
