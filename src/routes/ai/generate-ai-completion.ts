import { openai } from '@/lib/openai'
import { prisma } from '@/lib/prisma'
import { generateAICompletionBodySchema } from '@/schemas/generateAICompletionBodySchema'
import { FastifyInstance } from 'fastify'
import { OpenAIStream, streamToResponse } from 'ai'

async function generateAICompletionRoute(app: FastifyInstance) {
  app.post('/ai/generate', async (req, res) => {
    const { temperature, template, videoId } =
      generateAICompletionBodySchema.parse(req.body)

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    })

    if (!video.transcription) {
      return res.status(400).send({
        error: 'No transcription found for this video.',
      })
    }

    const promptMessage = template.replace(
      '{transcription}',
      video.transcription,
    )

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      temperature,
      messages: [{ role: 'user', content: promptMessage }],
      stream: true,
    })

    const stream = OpenAIStream(response)
    streamToResponse(stream, res.raw, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      },
    })
  })
}

export { generateAICompletionRoute }
