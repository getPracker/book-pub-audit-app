import { z } from 'zod'

export const auditQuerySchema = z.object({
    limit: z.string().optional(),
    cursor: z.string().optional(),
    entity: z.string().optional(),
    entityId: z.string().optional(),
    actorId: z.string().optional(),
    action: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
})
