import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { HospitalSchema } from "./HospitalSchema";

export const SeekerSchema = sqliteTable("Seeker", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull().$type<"male" | "female" | "others">(),
  bloodtype: text("bloodtype").notNull(),
  timeofNeed: text("TimeofNeed").notNull(),
  units: integer("units").notNull(),
  reason: text("reason").notNull(),
  phone: text("phone").notNull(),

  hospital_id: integer("hospital_id").references(() => HospitalSchema.id),
});
