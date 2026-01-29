import { FastifyInstance } from "fastify"
import { authMiddleware } from "../middleware/auth"

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/me", { preHandler: [authMiddleware] }, async (req) => {
    return {
      id: req.user!.id,
      role: req.user!.role,
      name: req.user!.name,
    }
  })
}
