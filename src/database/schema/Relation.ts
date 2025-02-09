import { relations } from "drizzle-orm";
import { TestcenterSchema } from "./TestcenterSchema";
import { DonerSchema } from "./DonerSchema";
import { TestdetailsSchema } from "./TestdetailsSchema";
import { HospitalSchema } from "./HospitalSchema";
import { SeekerSchema } from "./SeekerSchema";

export const TestcenterRelation = relations(TestcenterSchema, ({ many }) => {
  return {
    testdetails: many(TestdetailsSchema),
  };
});

export const DonerRelation = relations(DonerSchema, ({ many }) => {
  return {
    testdetails: many(TestdetailsSchema), 
  };
});

export const TestdetailsRelation = relations(TestdetailsSchema, ({ one }) => {
  return {
    testcenter: one(TestcenterSchema, {
      fields: [TestdetailsSchema.testcenter_id], 
      references: [TestcenterSchema.id], 
    }),
    doner: one(DonerSchema, {
      fields: [TestdetailsSchema.doner_id], 
      references: [DonerSchema.id], 
    }),
  };
});

export const HospitalRelation = relations(HospitalSchema, ({ many }) => {
  return {
    seekers: many(SeekerSchema), 
  };
});

export const SeekerRelation = relations(SeekerSchema, ({ one }) => {
  return {
    hospital: one(HospitalSchema, {
      fields: [SeekerSchema.hospital_id], 
      references: [HospitalSchema.id], 
    }),
  };
});