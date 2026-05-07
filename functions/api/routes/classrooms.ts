import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { drizzle } from 'drizzle-orm/d1';
import { classrooms, memberships } from '../../../src/db/schema';
import { eq } from 'drizzle-orm';

// Bindings for Cloudflare
export type Env = {
  Bindings: {
    DB: D1Database;
  };
};

export const classroomsRouter = new OpenAPIHono<Env>();

// --- Schemas ---

const ClassroomSchema = z.object({
  id: z.string(),
  name: z.string(),
  joinCode: z.string(),
  teacherId: z.string(),
});

const CreateClassroomRequestSchema = z.object({
  name: z.string().optional(),
});

const JoinClassroomRequestSchema = z.object({
  joinCode: z.string(),
});

// --- Routes ---

const createClassroomRoute = createRoute({
  method: 'post',
  path: '/create',
  summary: 'Create a new classroom',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateClassroomRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Classroom created successfully',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            classroom: z.object({
              id: z.string(),
              joinCode: z.string(),
              name: z.string(),
            }),
          }),
        },
      },
    },
  },
});

const joinClassroomRoute = createRoute({
  method: 'post',
  path: '/join',
  summary: 'Join a classroom using a 6-digit code',
  request: {
    body: {
      content: {
        'application/json': {
          schema: JoinClassroomRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successfully joined classroom',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            classroom: ClassroomSchema,
          }),
        },
      },
    },
    400: {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            error: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'Classroom not found',
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

const getTeacherClassroomsRoute = createRoute({
  method: 'get',
  path: '/teacher',
  summary: 'Get all classrooms for the current teacher',
  responses: {
    200: {
      description: 'List of classrooms',
      content: {
        'application/json': {
          schema: z.object({
            classrooms: z.array(ClassroomSchema),
          }),
        },
      },
    },
  },
});

// --- Handlers ---

classroomsRouter.openapi(createClassroomRoute, async (c) => {
  const db = drizzle(c.env.DB);
  // In a real app, this would be the authenticated user's ID
  const teacherId = 'temp-teacher-id'; 
  
  const body = c.req.valid('json');
  const name = body.name || 'New Classroom';

  const joinCode = Math.floor(100000 + Math.random() * 900000).toString();
  const id = crypto.randomUUID();

  await db.insert(classrooms).values({
    id,
    teacherId,
    joinCode,
    name,
  });

  return c.json({ success: true, classroom: { id, joinCode, name } }, 200);
});

classroomsRouter.openapi(joinClassroomRoute, async (c) => {
  const db = drizzle(c.env.DB);
  const body = c.req.valid('json');
  const { joinCode } = body;

  const result = await db.select().from(classrooms).where(eq(classrooms.joinCode, joinCode)).limit(1);
  const classroom = result[0];

  if (!classroom) {
    return c.json({ success: false as const, error: 'Invalid join code' }, 404);
  }

  const studentId = 'temp-student-id-' + Math.floor(Math.random() * 1000);

  await db.insert(memberships).values({
    id: crypto.randomUUID(),
    classroomId: classroom.id,
    studentGithubId: studentId,
    role: 'student'
  });

  return c.json({ success: true as const, classroom }, 200);
});

classroomsRouter.openapi(getTeacherClassroomsRoute, async (c) => {
  const db = drizzle(c.env.DB);
  const teacherId = 'temp-teacher-id'; // Mock auth
  
  const result = await db.select().from(classrooms).where(eq(classrooms.teacherId, teacherId));
  
  // Mapped to ensure correct types match Zod schema
  const mappedResult = result.map(r => ({
    id: r.id,
    name: r.name,
    joinCode: r.joinCode,
    teacherId: r.teacherId,
  }));
  
  return c.json({ classrooms: mappedResult }, 200);
});
