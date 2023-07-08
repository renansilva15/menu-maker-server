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

    try {
      await prisma.user.findUniqueOrThrow({
        where: {
          cpf,
        },
      })

      await prisma.manager.findUniqueOrThrow({
        where: {
          cpf,
        },
      })

      return reply.status(401).send('CPF já cadastrado')
    } catch (err) {
      const user = await prisma.user.create({
        data: {
          name,
          cpf,
          email,
          password,
        },
      })

      return reply.status(200).send(user)
    }
  })
}
