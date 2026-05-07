import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { drizzle } from 'drizzle-orm/d1';
import { telemetryLogs } from '../../../src/db/schema';

import { Env } from './classrooms'; // Reuse Env type

export const telemetryRouter = new OpenAPIHono<Env>();

// --- Schemas ---

const TelemetryRequestSchema = z.object({
  action: z.string(),
  metadata: z.record(z.any()).optional(),
  userId: z.string().optional(),
});

// --- Routes ---

const logTelemetryRoute = createRoute({
  method: 'post',
  path: '/',
  summary: 'Log telemetry data',
  request: {
    body: {
      content: {
        'application/json': {
          schema: TelemetryRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Telemetry logged successfully',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
          }),
        },
      },
    },
    500: {
      description: 'Failed to log telemetry',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            error: z.string(),
          }),
        },
      },
    },
  },
});

// --- Handlers ---

telemetryRouter.openapi(logTelemetryRoute, async (c) => {
  const db = drizzle(c.env.DB);
  
  try {
    const body = c.req.valid('json');
    const { action, metadata, userId } = body;

    await db.insert(telemetryLogs).values({
      id: crypto.randomUUID(),
      action,
      metadata: metadata ? JSON.stringify(metadata) : null,
      userId: userId || null,
    });

    return c.json({ success: true as const }, 200);
  } catch (error) {
    return c.json({ success: false as const, error: 'Failed to log telemetry' }, 500);
  }
});
