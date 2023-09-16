import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'

async function getAllPromptsRoute(app: FastifyInstance) {
  app.get('/prompts', async (req, res) => {
    const prompts = await prisma.prompt.findMany()

    return res.status(200).send({
      prompts,
    })
  })
}

export { getAllPromptsRoute }
