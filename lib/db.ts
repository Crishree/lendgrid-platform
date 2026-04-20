import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __lendgridPool: Pool | undefined;
}

function buildPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required to use the Postgres-backed API.");
  }

  return new Pool({
    connectionString,
    ssl: process.env.PGSSL === "require" ? { rejectUnauthorized: false } : undefined
  });
}

export const pool = global.__lendgridPool ?? buildPool();

if (process.env.NODE_ENV !== "production") {
  global.__lendgridPool = pool;
}

export async function query<T = unknown>(text: string, params: unknown[] = []) {
  return pool.query<T>(text, params);
}
