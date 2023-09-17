import { z } from 'zod'

const createTranscriptionBodySchema = z.object({
  prompt: z.string().nonempty("The prompt can't be empty"),
})

export { createTranscriptionBodySchema }
