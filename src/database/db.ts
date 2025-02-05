import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { UserSchema } from "./schema/UserSchema"
import { HospitalSchema } from "./schema/HospitalSchema"
import { SeekerSchema } from "./schema/SeekerSchema"

const sqlite = new Database('Database.db')
const db = drizzle(sqlite, { schema: { UserSchema,HospitalSchema,SeekerSchema }, logger: true })

export default db