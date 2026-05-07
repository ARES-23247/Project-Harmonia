import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { handle } from 'hono/cloudflare-pages';
import { classroomsRouter } from './routes/classrooms';
import { telemetryRouter } from './routes/telemetry';

const app = new OpenAPIHono().basePath('/api');

// Mount sub-routers
app.route('/classrooms', classroomsRouter);
app.route('/telemetry', telemetryRouter);

// OpenAPI Registry
app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    version: '1.2.0',
    title: 'UniversalIDE API',
  },
});

// Swagger UI Middleware
app.get('/docs', swaggerUI({ url: '/api/openapi.json' }));

// Base health check
app.get('/', (c) => {
  return c.json({ status: 'ok', version: '1.2' });
});

export const onRequest = handle(app);
