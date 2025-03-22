import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const TestcenterSchema = sqliteTable("Testcenter", {
  id: integer("id").primaryKey().notNull(),
  name: text("cname").notNull(),
  phone: text("cphone").notNull(),
  address: text("caddress").notNull(),
  capacity: integer("daycapacity").notNull(),
  manager_name: text("managername").notNull(),
  manager_phone: text("managerphone").notNull(),
  licence_no: text("licenceno").notNull(),
  password: text("password").notNull(),
  registered_date: text("regdate").notNull(),
  facility: text("labfacility").notNull().$type<"yes" | "no">(),
});
