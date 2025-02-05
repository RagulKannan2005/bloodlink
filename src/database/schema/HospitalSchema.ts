import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const HospitalSchema = sqliteTable("Hospital", {
  id: integer("id").primaryKey().notNull(),
  hospitalname: text("name").notNull(),
  Type: text("type").notNull().$type<"private" | "Govt">(),
  street: text("street").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  phone: text("phone").notNull(),
});
