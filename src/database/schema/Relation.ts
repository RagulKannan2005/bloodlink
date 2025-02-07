import { relations } from "drizzle-orm";
import { HospitalSchema } from "./HospitalSchema";
import { SeekerSchema } from "./SeekerSchema";
import { DonerSchema } from "./DonerSchema";
import { TestcenterSchema } from "./TestcenterSchema";
import { TestdetailsSchema } from "./TestdetailsSchema";

export const HospitalRelation = relations(HospitalSchema, ({ one, many }) => {
  return {
    seekers: one(SeekerSchema),
  };
});

export const SeekerRelation = relations(SeekerSchema, ({ one, many }) => {
  return {
    hospital: one(HospitalSchema, {
      fields: [SeekerSchema.hospitalId],
      references: [HospitalSchema.id],
    }),
  };
});

export const TestcenterRelation = relations(
  TestcenterSchema,
  ({ one, many }) => {
    return {
      doners: one(DonerSchema),
      testdetails: many(TestdetailsSchema),
    };
  }
);
export const DonerRelation = relations(DonerSchema, ({ one, many }) => {
  return {
    testcenter: one(TestcenterSchema, {
      fields: [DonerSchema.testcenterId],
      references: [TestcenterSchema.id],
    }),
  };
});

export const TestdetailsRelation = relations(TestcenterSchema, ({ one, many }) => {
  return {
    testcenter: one(TestcenterSchema, {
      fields: [TestdetailsSchema.testdetailsId],
      references: [TestcenterSchema.id],
    }),
  };
});