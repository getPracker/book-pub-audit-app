import { auditConfig } from "../config/audit.config";
import { generateDiff } from "../utils/diff.util";
import { getRequestContext } from "../plugins/request-context";

export async function logAudit (
    prisma: any,
    entity: string,
    entityId: string,
    action: string,
    before: any,
    after: any
) {
    const config = auditConfig[entity];

    if(!config?.track) return;

    const ctx = getRequestContext();

    const diff = generateDiff(before, after, config.excludeFields);

    if(config.redactFields) {
        for(const field of config.redactFields) {
            if(diff[field]) {
                diff[field].before = '[REDACTED]';
                diff[field].after = '[REDACTED]';
            }
        }
    }

    await prisma.auditLog.create({
        data: {
            entity,
            entityId,
            action,
            actorId: ctx?.userId,
            diff,
            requestId: ctx?.requestId
        },
    });
}