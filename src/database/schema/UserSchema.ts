import { integer, text } from "drizzle-orm/pg-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { userInfo } from "os";

export const UserSchema =sqliteTable("User",{
    id: integer("id").primaryKey().notNull(),
    username: text("name").notNull(),
    phoneno: text("phoneno").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    role: text("role").notNull().$type<"Doner"|"Hospital">(),
    
});