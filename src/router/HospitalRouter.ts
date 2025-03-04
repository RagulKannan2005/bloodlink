import { Router } from "express";
import db from "../database/db";
import { HospitalSchema } from "../database/schema/HospitalSchema";
import { eq } from "drizzle-orm";
const HospitalRouter = Router();

//get hospital
HospitalRouter.get("/", async (req, res) => {
  try {
    const Hospital = await db.query.HospitalSchema.findMany({
      columns: {
        id: true,
        name: true,
        Type: true,
        email: true,
        street: true,
        city: true,
        state: true,
        zip: true,
        phone: true,
      },
      // where: (HospitalSchema, { eq }) => eq(HospitalSchema.id, 1),   this is for to retrive the specific data in DB
    });
    res.status(200).json(Hospital);
  } catch (error) {
    res.json(error);
  }
});

//post hospital
HospitalRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const hospital = await db.insert(HospitalSchema).values(body).returning();
    res.status(200).json(hospital);
  } catch (error) {
    res.json(error);
  }
});
// Update Hospital
HospitalRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  try {
    const hospital = await db
      .update(HospitalSchema)
      .set(body)
      .where(eq(HospitalSchema.id, id))//to update the vale in db use the url like this http://localhost:8080/api/Hospital/1 then update the value in body
      .returning();
    res.status(200).json(hospital);
  } catch (error) {
    res.json(error);
  }
});

//delete hospital
HospitalRouter.delete("/:id", async (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  try {
    const hospital = await db
      .delete(HospitalSchema)
      .where(eq(HospitalSchema.id, id))//to delete the vale in db use the url like this http://localhost:8080/api/Hospital/1 then delete the value in body
      .returning();
    res.status(200).json(hospital);
  } catch (error) {
    res.json(error);
  }
});
export default HospitalRouter;
