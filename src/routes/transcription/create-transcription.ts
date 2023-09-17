import { openai } from '@/lib/openai'
import { prisma } from '@/lib/prisma'
import { createTranscriptionBodySchema } from '@/schemas/createTranscriptionBodySchema'
import { createTranscriptionParamsSchema } from '@/schemas/createTranscriptionParamsSchema'
import { FastifyInstance } from 'fastify'
import { createReadStream } from 'node:fs'

async function createTranscriptionRoute(app: FastifyInstance) {
  app.post('/videos/:videoId/transcription', async (request, reply) => {
    const { videoId } = createTranscriptionParamsSchema.parse(request.params)
    const { prompt } = createTranscriptionBodySchema.parse(request.body)

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    })

    const videoPath = video.path

    const audioReadStream = createReadStream(videoPath)
    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: 'whisper-1',
      language: 'pt',
      response_format: 'json',
      temperature: 0,
      prompt,
    })

    await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        transcription: response.text,
      },
    })

    return reply.status(200).send({
      transcription: response.text,
    })
  })
}

export { createTranscriptionRoute }
