import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema.js";

const dbUrl = process.env.DRIZZLE_DB_URL || process.env.NEXT_PUBLIC_DRIZZLE_DB_URL || "";
const sql = neon(dbUrl);
export const db = drizzle(sql, { schema });