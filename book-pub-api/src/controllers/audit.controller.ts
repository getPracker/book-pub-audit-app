import { FastifyReply } from 'fastify'
import { AuditQueryService } from '../services/audit-query.service'

type AuditListQuery = {
    limit?: string
    cursor?: string
    entity?: string
    entityId?: string
    actorId?: string
    action?: string
    from?: string
    to?: string
}

export class AuditController {
    constructor(private service: AuditQueryService) { }

    list = async (query: AuditListQuery, reply: FastifyReply) => {
        const result = await this.service.listAudits({
            limit: Number(query.limit ?? 10),
            ...(query.cursor && { cursor: query.cursor }),
            ...(query.entity && { entity: query.entity }),
            ...(query.entityId && { entityId: query.entityId }),
            ...(query.actorId && { actorId: query.actorId }),
            ...(query.action && { action: query.action }),
            ...(query.from && { from: query.from }),
            ...(query.to && { to: query.to }),
        })

        reply.send(result)
    }
}
