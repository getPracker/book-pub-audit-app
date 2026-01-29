import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    startTime?: number,
    user?: {
      id: string
      name: string
      role: 'admin' | 'reviewer'
      credentials: string
    }
  }
}
