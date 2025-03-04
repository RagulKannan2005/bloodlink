import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { HospitalSchema } from "./schema/HospitalSchema"
import { SeekerSchema } from "./schema/SeekerSchema"
import { DonorSchema } from "./schema/DonorSchema"
import { TestcenterSchema } from "./schema/TestcenterSchema"
import { TestdetailsSchema } from "./schema/TestdetailsSchema"
import * as relations from "./schema/Relation"
import { UserSchema } from "./schema/UserSchema"


const sqlite = new Database('Database.db')
sqlite.pragma('foreign_keys=on')
const db = drizzle(sqlite, { schema: { UserSchema,HospitalSchema,SeekerSchema,DonorSchema,TestcenterSchema,TestdetailsSchema,...relations}, logger: true })

export default db