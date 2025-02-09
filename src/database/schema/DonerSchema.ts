
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const DonerSchema = sqliteTable("Doner", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull().$type<"male" | "female" | "others">(),
  dob: text("dob").notNull(),
  bloodtype: text("bloodtype").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  verified: text("verified").notNull().$type<"verified" | "not verified">(),
});
