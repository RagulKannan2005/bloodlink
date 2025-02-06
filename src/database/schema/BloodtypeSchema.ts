import { integer, sqliteTable,text } from "drizzle-orm/sqlite-core";

export const BloodtypeSchema = sqliteTable("Bloodtype", {
    id:integer("id").primaryKey().notNull(),
    btype:text("btype").notNull(),
    prize:text("prize").notNull(),
});