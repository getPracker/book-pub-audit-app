import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma';
import requestContextPlugin from './plugins/request-context';
import loggerPlugin from './plugins/logger';
import errorHandlerPlugin from './plugins/error-handler';
// Routes
import bookRoutes from './routes/book.routes';
import auditRoutes from './routes/audit.routes';
import userRoutes from './routes/auth.routes';

import cors from '@fastify/cors';
import { loggerConfig } from './config/logger.config';


const app = Fastify({
  logger: loggerConfig
})


app.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-api-key"],
})


// plugins
app.register(requestContextPlugin);
app.register(prismaPlugin);
app.register(loggerPlugin);
app.register(errorHandlerPlugin);

// routes
app.register(bookRoutes, { prefix: '/api/books'});
app.register(auditRoutes, { prefix: '/api/audits' });
app.register(userRoutes, { prefix: "/api"}); 

export default app;