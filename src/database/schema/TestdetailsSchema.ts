import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { TestcenterSchema } from "./TestcenterSchema";
import { DonorSchema } from "./DonorSchema";

export const TestdetailsSchema = sqliteTable("Testdetails", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  address: text("address").notNull(),
  bloodtype: text("bloodtype").notNull(),
  gender: text("gender").notNull().$type<"male" | "female" | "others">(),
  hgb: text("hgb").notNull(),
  wbc: text("wbc").notNull(),
  rbc: text("rbc").notNull(),
  plt: text("plt").notNull(),
  testdate: text("testdate").notNull(),

  
  testcenter_id: integer("testcenter_id").references(() => TestcenterSchema.id,{onDelete:"cascade"}), 
  donor_id: integer("donor_id").references(() => DonorSchema.id,{onDelete:"cascade"}), 
});