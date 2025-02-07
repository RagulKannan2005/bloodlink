import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { TestcenterSchema } from "./TestcenterSchema";
import { DonerSchema } from "./DonerSchema";

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
  
  testcenterId: integer("testcenterId").notNull().references(() => TestcenterSchema.id, { onDelete: "cascade" }),
  donerid: integer("donerid").notNull().references(()=>DonerSchema.id,{onDelete:"cascade"}),
});
