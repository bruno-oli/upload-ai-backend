import { fastify } from 'fastify'
import { getAllPromptsRoute } from './routes/Prompt/get-all-prompts'
import { uploadVideoRoute } from './routes/Video/upload-video'

const app = fastify()

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)

export { app }
