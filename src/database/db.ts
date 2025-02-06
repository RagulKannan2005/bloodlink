import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { UserSchema } from "./schema/UserSchema"
import { HospitalSchema } from "./schema/HospitalSchema"
import { SeekerSchema } from "./schema/SeekerSchema"
import { DonerSchema } from "./schema/DonerSchema"
import { TestcenterSchema } from "./schema/TestcenterSchema"

const sqlite = new Database('Database.db')
const db = drizzle(sqlite, { schema: { UserSchema,HospitalSchema,SeekerSchema,DonerSchema,TestcenterSchema }, logger: true })

export default db