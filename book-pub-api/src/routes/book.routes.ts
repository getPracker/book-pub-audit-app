import { FastifyInstance } from 'fastify'
import { BookController } from '../controllers/book.controller'
import { BookService } from '../services/book.service'
import { authMiddleware } from '../middleware/auth'
import { createBookSchema } from '../validators/book.schema'
import { updateBookSchema } from '../validators/book.schema'
import { bookListQuerySchema } from '../validators/book.schema'
import { omitUndefined } from '../utils/object.util'

export default async function bookRoutes(fastify: FastifyInstance) {
    const bookService = new BookService(fastify.prisma)
    const controller = new BookController(bookService)

    // Create a book
    fastify.route({
        method: 'POST',
        url: '/',
        preHandler: [authMiddleware],
        handler: async (req, reply) => {
            const body = createBookSchema.parse(req.body)
            return controller.create({ ...req, body }, reply)
        }
    })

    // list books
    fastify.route({
        method: 'GET',
        url: '/',
        preHandler: [authMiddleware],
        handler: async (req, reply) => {
            const query = bookListQuerySchema.parse(req.query);
            return controller.list(query, reply);
        }
    })

    // Get Book by Id
    fastify.route({
        method: 'GET',
        url: '/:id',
        preHandler: [authMiddleware],
        handler: controller.get,
    })

    // Update book by Id
    fastify.route<{Params: { id: string }}>({
        method: 'PUT',
        url: '/:id',
        preHandler: [authMiddleware],
        handler: async (req, reply) => {
            const parsed = updateBookSchema.parse(req.body)
            const body = omitUndefined(parsed);
            return controller.update(
                req.params.id,
                body,
                req.user!.id,
                reply
            )
        }
    })

    // Delete book by Id    
    fastify.route({
        method: 'DELETE',
        url: '/:id',
        preHandler: [authMiddleware],
        handler: controller.delete,
    })
}
