import fp from 'fastify-plugin';
import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

type Store = {
    requestId: string,
    userId?: string
}

const asyncLocalStorage = new AsyncLocalStorage<Store>();

export const getRequestContext = () => asyncLocalStorage.getStore();

export default fp(async(fastify) => {
    fastify.addHook('onRequest', (req, reply, done) => {
        const requestId = req.headers['x-request-id'] as string || randomUUID();
        
        asyncLocalStorage.run({requestId}, ()=>{
            reply.header('x-request-id', requestId)
            done()
        });
    })
})