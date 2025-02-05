import { Router } from "express";
import db from "../database/db";
import { HospitalSchema } from "../database/schema/HospitalSchema";
import { eq } from "drizzle-orm";
const HospitalRouter = Router();

HospitalRouter.get("/", async (req, res) => {
  try {
    const Hospital = await db.query.HospitalSchema.findMany({
      columns: {
        id: true,
        hospitalname: true,
        street: true,
        city: true,
        state: true,
        zip: true,
        phone: true,
      },
      where: (HospitalSchema, { eq }) => eq(HospitalSchema.id, 1),
    });
    res.status(200).json(Hospital);
  } catch (error) {
    res.json(error);
  }
});
HospitalRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const hospital = await db.insert(HospitalSchema).values(body).returning();
    res.status(200).json(hospital);
  } catch (error) {
    res.json(error);
  }
});
HospitalRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  try {
    const hospital = await db
      .update(HospitalSchema)
      .set(body)
      .where(eq(HospitalSchema.id, id))
      .returning();
    res.status(200).json(hospital);
  } catch (error) {
    res.json(error);
  }
});
export default HospitalRouter;
