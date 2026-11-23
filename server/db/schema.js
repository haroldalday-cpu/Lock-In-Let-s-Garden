import { pgTable, pgEnum, check, time, integer, text, boolean, unique, date, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const taskTypeEnum = pgEnum('task_type', ['binary', 'quantity', 'duration']);
export const frequencyEnum = pgEnum('frequency', ['daily', 'weekdays', 'times_per_week']);

export const categories = pgTable('categories', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: text('name').notNull().unique(),
    color: text('color').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true}).notNull().defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'restrict' }),
  title: text('title').notNull(),
  type: taskTypeEnum('type').notNull(),
  targetValue: integer('target_value'),
  unit: text('unit'),
  frequency: frequencyEnum('frequency').notNull(),
  weekdays: integer('weekdays').array(),
  timesPerWeek: integer('times_per_week'),
  isRequired: boolean('is_required').notNull().default(true),
  activeFrom: date('active_from', { mode: 'string' }).notNull(),
  archivedOn: date('archived_on', { mode: 'string' }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const taskLogs = pgTable(
    'task_logs',
    {
        id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
        taskId: integer('task_id')
        .notNull()
        .references(() => tasks.id, { onDelete: 'restrict'}),
        date: date('date', { mode: 'string' }).notNull(),
        proofNote: text('proof_note'),
        loggedAt: timestamp('logged_at', { withTimezone: true}).notNull().defaultNow(),
    },
    (t) => [unique('task_logs_task_date_unique').on(t.taskId, t.date)],
); 

export const dayStatusEnum = pgEnum('day_status', ['complete', 'failed', 'grace']);

export const dayRecords = pgTable('day_records', {
    date: date('date', { mode: 'string'}).primaryKey(),
    score: integer('score').notNull(),
    status: dayStatusEnum('status').notNull(),
    closedAt: timestamp('closed_at', { withTimezone: true }).notNull().defaultNow(),
});

export const settings = pgTable(
    'settings',
    {
        id: integer('id').primaryKey().default(1),
        timezone: text('timezone').notNull().default('Asia/Manila'),
        dayDeadline: time('day_dealine').notNull().default('00:00'),
        graceTokensPerWeek: integer('grace_tokens_per_week').notNull().default(1),
    },
    (t) => [check('settings_single_row', sql`${t.id} = 1`)],
);