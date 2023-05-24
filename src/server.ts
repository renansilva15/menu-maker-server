import fastify from 'fastify'

const app = fastify()

app.listen({ port: 3232 }).then(() => {
  console.log('HTTP server running on http://localhost:3232')
})

app.get('/', () => {
  console.log('Test')
})
