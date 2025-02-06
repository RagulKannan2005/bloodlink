import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const TestdetailsSchema = sqliteTable("Testdetails", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  address: text("address").notNull(),
  Bloodtype: text("Bloodtype").notNull(),
  gender: text("gender").notNull().$type<"male" | "female" | "others">(),
  hgb: text("hgb").notNull(),
  wbc: text("wbc").notNull(),
  rbc: text("rbc").notNull(),
  plt: text("plt").notNull(),
  testdate: text("testdate").notNull(),
});
