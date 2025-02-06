import { Router } from "express";
import db from "../database/db";
import { SeekerSchema } from "../database/schema/SeekerSchema";
import { eq } from "drizzle-orm";

const SeekerRouter = Router();

//get seeker
SeekerRouter.get("/", async (req, res) => {
  try {
    const Seeker = await db.query.SeekerSchema.findMany({
      columns: {
        id: true,
        name: true,
        age: true,
        Bloodtype: true,
        TimeofNeed: true,
        units: true,
        reason: true,
        phone: true,
      },
    });
    res.status(200).json(Seeker);
  } catch (error) {
    res.json(error);
  }
});
//post seeker
SeekerRouter.post("/", async (req, res) => {
  try {
    const body = req.body;

    const seeker = await db.insert(SeekerSchema).values(body).returning();
    res.status(200).json(seeker);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Seeker
SeekerRouter.put("/:id", async (req, res) => {
  try {
    const body = req.body;
    const id = Number(req.params.id);
    const seeker = await db
      .update(SeekerSchema)
      .set(body)
      .where(eq(SeekerSchema.id, id))
      .returning();
    res.status(200).json(seeker);
  } catch (error) {    
    res.json(error);
  }
});

export default SeekerRouter;
