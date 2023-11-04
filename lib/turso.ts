import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const connection = createClient({
  url: process.env.TURSO_DB_URL as string,
  authToken: process.env.TURSO_DB_AUTH_TOKEN as string,
});

export const db = drizzle(connection);
