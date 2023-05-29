import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

app.listen({ port: 3232 }).then(() => {
  console.log('HTTP server running on http://localhost:3232')
})

app.get('/users', async () => {
  const users = await prisma.user.findMany()

  return users
})
