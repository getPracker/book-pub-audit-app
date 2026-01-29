import { FastifyRequest, FastifyReply } from "fastify";
import { getRequestContext } from "../plugins/request-context";

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
    const apikey = req.headers['x-api-key'] as string

    if(!apikey) {
        return reply.code(401).send({error: {code: 'UNAUTHORIZED', message: "Missing API key"}})
    }

    const user = await req.server.prisma.user.findFirst({
        where: {credentials: apikey}
    });

    if(!user) {
        return reply.code(401).send({error: {code: 'UNAUTHORIZED', message: "Invalid API key"}})
    }

    req.user = user;

    const ctx = getRequestContext();
    if(ctx) ctx.userId = user.id;
}

export async function requireAdmin(req: FastifyRequest, reply: FastifyReply) {
  if (req.user?.role !== 'admin') {
    reply.code(403).send({ error: { code: 'FORBIDDEN', message: 'Admin access required' } })
    return
  }
}
