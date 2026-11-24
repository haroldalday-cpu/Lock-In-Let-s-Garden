import 'dotenv/config';
import express from 'express';
import { sql } from 'drizzle-orm';
import { db } from './db/index.js';
import { categories } from './db/schema.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/api/db-test', async (req, res) => {
  const result = await db.execute(sql`select now()`);
  res.json(result.rows[0]);
});

app.get('/api/categories', async (req, res) => {
  const rows = await db.select().from(categories);
  res.json(rows);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
