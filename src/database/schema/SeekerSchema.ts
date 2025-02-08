import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { HospitalSchema } from "./HospitalSchema";

export const SeekerSchema = sqliteTable("Seeker", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull().$type<"male" | "female" | "others">(),
  bloodtype: text("Bloodtype").notNull(),
  timeofNeed: text("TimeofNeed").notNull(),
  // hospitalname:text("hospitalname").notNull(),
  units: integer("units").notNull(),
  reason: text("reason").notNull(),
  phone: text("phone").notNull(),

  

  
});
