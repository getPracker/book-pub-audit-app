import { PrismaClient } from "@prisma/client";
import { logAudit } from "./audit.service";

export class BookService {
    constructor(private prisma: PrismaClient) { };

    async createBook(data: any, userId: string) {
        const book = await this.prisma.book.create({
            data: {
                ...data,
                createdBy: userId,
            },
        })

        await logAudit(
            this.prisma,
            'Book',
            book.id,
            'create',
            null,
            book
        );

        return book;
    }

    async updateBook(id: string, data: any, userId: string) {
        const existing = await this.prisma.book.findUnique({ where: { id } });
        if (!existing) throw Object.assign(new Error('Book not found'), { statusCode: 404 });

        const updated = await this.prisma.book.update({
            where: { id },
            data: {
                ...data,
                updatedBy: userId,
            },
        });

        await logAudit(
            this.prisma,
            'Book',
            id,
            'update',
            existing,
            updated
        );

        return updated;
    }

    async deleteBook(id: string) {
        const existing = await this.prisma.book.findUnique({ where: { id } })
        if (!existing) throw Object.assign(new Error('Book not found'), { statusCode: 404 })

        await this.prisma.book.delete({ where: { id } })

        await logAudit(
            this.prisma,
            'Book',
            id,
            'delete',
            existing,
            null
        )

        return { success: true }
    }

    async getBook(id: string) {
        const book = await this.prisma.book.findUnique({ where: { id } })
        if (!book) throw Object.assign(new Error('Book not found'), { statusCode: 404 })
        return book
    }

    async listBooks(limit = 10, cursor?: string) {
        const take = Math.min(limit, 50) // safety cap

        const books = await this.prisma.book.findMany({
            take: take + 1, // fetch one extra
            orderBy: { createdAt: 'desc' },
            ...(cursor && { cursor : { id: cursor }, skip: 1 }),
        });

        let nextCursor: string | null = null

        if (books.length > take) {
            const nextItem = books.pop()!
            nextCursor = nextItem.id
        }

        return {
            items: books,
            nextCursor,
        }
    }

}