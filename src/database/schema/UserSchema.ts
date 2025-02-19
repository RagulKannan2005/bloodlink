
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const UserSchema =sqliteTable("User",{
    id: integer("id").primaryKey().notNull(),
    name: text("name").notNull(),
    phoneno: text("phoneno").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    role: text("role").notNull().$type<"Doner"|"Hospital">(),
    
});