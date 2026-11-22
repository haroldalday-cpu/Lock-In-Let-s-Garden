import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: text('name').notNull().unique(),
    color: text('color').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true}).notNull().defaultNow(),
});