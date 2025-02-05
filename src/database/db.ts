import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { UserSchema } from "./schema/UserSchema"
import { HospitalSchema } from "./schema/HospitalSchema"

const sqlite = new Database('Database.db')
const db = drizzle(sqlite, { schema: { UserSchema,HospitalSchema }, logger: true })

export default db