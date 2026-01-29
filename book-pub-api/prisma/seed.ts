import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const daysAgo = (n: number) =>
    new Date(Date.now() - n * 24 * 60 * 60 * 1000)

async function main() {
    console.log("🌱 Seeding realistic audit timeline...")

    // USERS
    const admin = await prisma.user.upsert({
        where: { id: 'admin-1' },
        update: {},
        create: {
            id: 'admin-1',
            name: 'Admin User',
            role: 'admin',
            credentials: 'admin-api-key',
        },
    })

    const reviewer = await prisma.user.upsert({
        where: { id: 'reviewer-1' },
        update: {},
        create: {
            id: 'reviewer-1',
            name: 'Reviewer User',
            role: 'reviewer',
            credentials: 'reviewer-api-key',
        },
    })

    // BOOKS
    const book1 = await prisma.book.create({
        data: {
            title: "The Audit Journey",
            authors: "Prakhar Gupta",
            publishedBy: "TechPress",
            createdBy: admin.id,
        },
    })

    const book2 = await prisma.book.create({
        data: {
            title: "Node.js Deep Dive",
            authors: "Backend Master",
            publishedBy: "CodeBooks",
            createdBy: reviewer.id,
        },
    })

    // 📘 BOOK 1 CREATED — 30 days ago
    await prisma.auditLog.create({
        data: {
            entity: "Book",
            entityId: book1.id,
            action: "create",
            actorId: admin.id,
            timestamp: daysAgo(30),
            diff: {
                id: { before: null, after: book1.id },
                title: { before: null, after: book1.title },
                authors: { before: null, after: book1.authors },
                publishedBy: { before: null, after: book1.publishedBy },
                createdBy: { before: null, after: book1.createdBy },
                createdAt: { before: null, after: book1.createdAt },
                updatedAt: { before: null, after: book1.updatedAt },
            },
        },
    })

    // ✏️ BOOK 1 UPDATED — 7 days ago
    await prisma.auditLog.create({
        data: {
            entity: "Book",
            entityId: book1.id,
            action: "update",
            actorId: admin.id,
            timestamp: daysAgo(7),
            diff: {
                publishedBy: { before: "TechPress", after: "GlobalTechPress" },
                updatedAt: { before: book1.updatedAt, after: new Date() },
            },
        },
    })

    // ❌ BOOK 2 DELETED — 3 days ago
    await prisma.auditLog.create({
        data: {
            entity: "Book",
            entityId: book2.id,
            action: "delete",
            actorId: reviewer.id,
            timestamp: daysAgo(3),
            diff: {
                id: { before: book2.id, after: null },
                title: { before: book2.title, after: null },
                authors: { before: book2.authors, after: null },
                publishedBy: { before: book2.publishedBy, after: null },
            },
        },
    })

    // ♻️ BOOK 2 RESTORED — 1 day ago
    await prisma.auditLog.create({
        data: {
            entity: "Book",
            entityId: book2.id,
            action: "restore",
            actorId: admin.id,
            timestamp: daysAgo(1),
            diff: {
                id: { before: null, after: book2.id },
                title: { before: null, after: book2.title },
                authors: { before: null, after: book2.authors },
                publishedBy: { before: null, after: book2.publishedBy },
            },
        },
    })

    // 🔐 USER LOGIN — Today
    await prisma.auditLog.create({
        data: {
            entity: "User",
            entityId: admin.id,
            action: "login",
            actorId: admin.id,
            timestamp: new Date(),
            diff: {
                id: { before: admin.id, after: admin.id },
                name: { before: admin.name, after: admin.name },
                role: { before: admin.role, after: admin.role },
            },
        },
    })

    console.log("✅ Seed completed with realistic audit history")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

export { }
