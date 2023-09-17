import { fastify } from 'fastify'
import { getAllPromptsRoute } from './routes/prompt/get-all-prompts'
import { uploadVideoRoute } from './routes/video/upload-video'
import { createTranscriptionRoute } from './routes/transcription/create-transcription'
import 'dotenv/config'

const app = fastify()

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)

export { app }
