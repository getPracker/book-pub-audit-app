import { FastifyInstance } from 'fastify'
import { AuditController } from '../controllers/audit.controller'
import { AuditQueryService } from '../services/audit-query.service'
import { authMiddleware, requireAdmin } from '../middleware/auth'
import { auditQuerySchema } from '../validators/audit.schema'
import { omitUndefined } from '../utils/object.util'

export default async function auditRoutes(fastify: FastifyInstance) {
    const service = new AuditQueryService(fastify.prisma)
    const controller = new AuditController(service)

    fastify.route<{
        Querystring: {
            limit?: string
            cursor?: string
            entity?: string
            entityId?: string
            actorId?: string
            action?: string
            from?: string
            to?: string
        }
    }>({
        method: 'GET',
        url: '/',
        preHandler: [authMiddleware, requireAdmin],
        handler: async (req, reply) => {
            const parsed = auditQuerySchema.parse(req.query)
            const query = omitUndefined(parsed)

            return controller.list(query, reply)
        },
    })

}
