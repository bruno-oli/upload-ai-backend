import { fastify } from 'fastify'
import 'dotenv/config'
import { fastifyCors } from '@fastify/cors'
import {
  createTranscriptionRoute,
  generateAICompletionRoute,
  getAllPromptsRoute,
  uploadVideoRoute,
} from './routes'

const app = fastify()

app.register(fastifyCors, { origin: '*' })

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAICompletionRoute)

export { app }
