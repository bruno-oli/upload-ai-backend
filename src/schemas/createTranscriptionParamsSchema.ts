import { z } from 'zod'

const createTranscriptionParamsSchema = z.object({
  videoId: z
    .string()
    .nonempty('The videoId parameter cant be empty')
    .uuid('The videoId parameter must be a valid UUID'),
})

export { createTranscriptionParamsSchema }
