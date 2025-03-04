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
        password: true,
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
    const Hospital = await db.insert(HospitalSchema).values(body).returning();
    res.status(200).json(Hospital);
  } catch (error) {
    res.json(error);
  }
})
//put hospital
HospitalRouter.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;
    const Hospital = await db
      .update(HospitalSchema)
      .set(body)
      .where(eq(HospitalSchema.id, id))
      .returning();
    res.status(200).json(Hospital);
  } catch (error) {
    res.json(error);
  }
})
//delete hospital
HospitalRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const Hospital = await db
      .delete(HospitalSchema)
      .where(eq(HospitalSchema.id, id))
      .returning();
    res.status(200).json(Hospital);
  } catch (error) {
    res.status(500).json(error);
  }
})
export default HospitalRouter;
