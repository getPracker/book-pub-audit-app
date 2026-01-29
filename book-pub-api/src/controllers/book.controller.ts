import { FastifyRequest, FastifyReply } from 'fastify';
import { BookService } from "../services/book.service";

export class BookController {
    constructor(private bookService: BookService) { };

    create = async (req: FastifyRequest, reply: FastifyReply) => {
        const book = await this.bookService.createBook(req.body, req.user!.id)
        reply.code(201).send(book)
    }

    update = async (id: string,
        body: { title?: string; authors?: string; publishedBy?: string },
        userId: string, reply: FastifyReply) => {
        const book = await this.bookService.updateBook(id, body, userId);
        reply.send(book)
    }

    delete = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        await this.bookService.deleteBook(req.params.id)
        reply.send({ success: true })
    }

    get = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const book = await this.bookService.getBook(req.params.id)
        reply.send(book)
    }

    list = async (query: { limit?: string; cursor?: string }, reply: FastifyReply) => {
        const limit = Number(query.limit || 10)
        const result = await this.bookService.listBooks(limit, query.cursor)
        reply.send(result)
    }
}