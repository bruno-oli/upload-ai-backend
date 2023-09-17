import { z } from 'zod'

const generateAICompletionBodySchema = z.object({
  videoId: z.string().uuid(),
  template: z.string(),
  temperature: z.number().min(0).max(1).default(0.5),
})

export { generateAICompletionBodySchema }
