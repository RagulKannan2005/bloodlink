import { integer, sqliteTable,text } from "drizzle-orm/sqlite-core";

export const SeekerSchema = sqliteTable("Seeker", {
    id:integer("id").primaryKey().notNull(),
    name:text("name").notNull(),
    age:integer("age").notNull(),
    Bloodtype:text("Bloodtype").notNull(),
    TimeofNeed:text("TimeofNeed").notNull(),
    hospitalname:text("hospitalname").notNull(),
    units:integer("units").notNull(),
    reason:text("reason").notNull(),
    phone:text("phone").notNull()
});