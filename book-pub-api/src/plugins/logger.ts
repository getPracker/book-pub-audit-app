import fp from 'fastify-plugin'
import { getRequestContext } from './request-context'

export default fp(async (fastify) => {
  fastify.addHook('onRequest', async (req) => {
    const start = Date.now()
    req.startTime = start
  })

  fastify.addHook('onResponse', async (req, reply) => {
    const durationMs = Date.now() - (req.startTime || Date.now())
    const ctx = getRequestContext()

    fastify.log.info({
      msg: 'request completed',
      requestId: ctx?.requestId,
      userId: ctx?.userId,
      route: req.routeOptions.url,
      method: req.method,
      status: reply.statusCode,
      durationMs,
    })
  })
})
