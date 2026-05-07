import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const classrooms = sqliteTable('classrooms', {
  id: text('id').primaryKey(), // ULID or UUID
  teacherId: text('teacher_id').notNull(), // from better-auth user id
  joinCode: text('join_code').notNull().unique(), // 6-digit code
  name: text('name').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const memberships = sqliteTable('memberships', {
  id: text('id').primaryKey(),
  classroomId: text('classroom_id').notNull().references(() => classrooms.id),
  studentGithubId: text('student_github_id').notNull(), // GH username or better-auth id
  role: text('role', { enum: ['teacher', 'student'] }).default('student').notNull(),
  joinedAt: text('joined_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const projectTemplates = sqliteTable('project_templates', {
  id: text('id').primaryKey(),
  classroomId: text('classroom_id').notNull().references(() => classrooms.id),
  gistId: text('gist_id').notNull(),
  title: text('title').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const telemetryLogs = sqliteTable('telemetry_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id'), // optional if anonymous
  action: text('action').notNull(), // 'block_dropped', 'run_simulation', etc.
  metadata: text('metadata'), // JSON string
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull(),
});
