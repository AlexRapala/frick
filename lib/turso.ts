import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"
import type { AdapterAccount } from "@auth/core/adapters"

const connection = createClient({
	url: process.env.TURSO_DB_URL as string,
	authToken: process.env.TURSO_DB_AUTH_TOKEN as string,
})
 
export const db = drizzle(connection);