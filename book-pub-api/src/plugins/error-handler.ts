import fp from 'fastify-plugin';
import { getRequestContext } from './request-context';
import { FastifyError } from 'fastify';

export default fp(async (fastify)=> {
    fastify.setErrorHandler((err, req, reply) => {
        const error = err as FastifyError;
        const ctx = getRequestContext();
        const requestId = ctx?.requestId;

        let statusCode = error.statusCode ?? 500;
        let code = 'INTERNAL_SERVER_ERROR';
        let message = error.message || 'Something went wrong';
        let details: unknown;

        if((error as any).validation){
            code = 'VALIDATION_ERROR';
            statusCode = 400;
            details = (error as any).validation;
        }

        if(statusCode == 401) code = 'UNAUTHORIZED';
        if(statusCode == 403) code = 'FORBIDDEN';

        fastify.log.error({
            msg: error.message,
            requestId,
            err: error,
        })

        reply.status(statusCode).send({
            error : {
                code,
                message,
                ...(details ? {details} : {}),
                requestId
            }
        })

    })
})