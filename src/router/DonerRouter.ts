import { Router } from "express";
import db from "../database/db";
import { DonerSchema } from "../database/schema/DonerSchema";
import { eq } from "drizzle-orm";

const DonerRouter = Router();

//get doner
DonerRouter.get("/", async (req, res) => {
  try {
    const Doner = await db.query.DonerSchema.findMany({
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
DonerRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const doner = await db.insert(DonerSchema).values(body).returning();
    res.status(200).json(doner);
  } catch (error) {
    res.json(error);
  }
});


// Update Doner
DonerRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  try {
    const doner = await db.update(DonerSchema).set(body).where(eq(DonerSchema.id, id)).returning();
    res.status(200).json(doner);
  } catch (error) {
    res.json(error);
  }
});
//delete doner
DonerRouter.delete("/:id", async (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  try {
    const doner = await db.delete(DonerSchema).where(eq(DonerSchema.id, id)).returning();
    res.status(200).json(doner);
  } catch (error) {
    res.json(error);
  }
});

export default DonerRouter;