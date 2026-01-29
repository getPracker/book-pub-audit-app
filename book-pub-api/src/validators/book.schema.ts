import { z } from 'zod'
import { omitUndefined } from '../utils/object.util'

export const createBookSchema = z.object({
    title: z.string().min(1),
    authors: z.string().min(1),
    publishedBy: z.string().min(1),
})

export const updateBookSchema = createBookSchema.partial()

export const bookListQuerySchema = z.object({
    limit: z.string().optional(),
    cursor: z.string().optional(),
}).transform(data => omitUndefined(data))

