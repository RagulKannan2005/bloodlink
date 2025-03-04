import { Router } from "express";
import db from "../database/db";
import { DonorSchema } from "../database/schema/DonorSchema";
import { eq } from "drizzle-orm";

const DonorRouter = Router();

//get doner
DonorRouter.get("/", async (req, res) => {
  try {
    const Doner = await db.query.DonorSchema.findMany({
      columns: {
        password: false,
      },
    });
    res.status(200).json(Doner);
  } catch (error) {
    res.json(error);
  }
});

//post doner
DonorRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const Doner = await db.insert(DonorSchema).values(body).returning();
    res.status(200).json(Doner);
  } catch (error) {
    res.json(error);
  }
})


// Update Doner
DonorRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  try {
    const doner = await db.update(DonorSchema).set(body).where(eq(DonorSchema.id, id)).returning();
    res.status(200).json(doner);
  } catch (error) {
    res.json(error);
  }
});
//delete doner
DonorRouter.delete("/:id", async (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  try {
    const doner = await db.delete(DonorSchema).where(eq(DonorSchema.id, id)).returning();
    res.status(200).json(doner);
  } catch (error) {
    res.json(error);
  }
});

export default DonorRouter;