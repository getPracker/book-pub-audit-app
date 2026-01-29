import { PrismaClient } from '@prisma/client'

type AuditQueryParams = {
    limit: number
    cursor?: string
    entity?: string
    entityId?: string
    actorId?: string
    action?: string
    from?: string
    to?: string
}

export class AuditQueryService {
    constructor(private prisma: PrismaClient) { }

    async listAudits(params: AuditQueryParams) {
        const take = Math.min(params.limit || 10, 50)

        const where: any = {}

        if (params.entity) where.entity = params.entity
        if (params.entityId) where.entityId = params.entityId
        if (params.actorId) where.actorId = params.actorId
        if (params.action) where.action = params.action
        if (params.from || params.to) {
            where.timestamp = {
                ...(params.from && { gte: new Date(params.from) }),
                ...(params.to && { lte: new Date(params.to) }),
            }
        }

        const query: any = {
            where,
            take: take + 1,
            orderBy: { timestamp: 'desc' },
        }

        if (params.cursor) {
            query.cursor = { id: params.cursor }
            query.skip = 1
        }

        const audits = await this.prisma.auditLog.findMany(query)

        let nextCursor: string | null = null
        if (audits.length > take) {
            const next = audits.pop()!
            nextCursor = next.id
        }

        return { items: audits, nextCursor }
    }
}
