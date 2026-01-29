export type AuditEntityConfig = {
    track: boolean,
    excludeFields?: string [],
    redactFields?: string [],
}

export const auditConfig: Record<string, AuditEntityConfig> = {
    Book: {
        track: true,
        excludeFields: ['updatedAt'],
        redactFields: ['id'],
    },
    User: {
        track: true,
        excludeFields: [],
        redactFields: ['credentials']
    }
}