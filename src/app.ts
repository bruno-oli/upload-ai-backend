import { fastify } from 'fastify'

const app = fastify()

app.get('/', () => {
  return { msg: 'hello world' }
})

export { app }
