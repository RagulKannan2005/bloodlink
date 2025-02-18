import { Router } from "express";
import db from "../database/db";
import { SeekerSchema } from "../database/schema/SeekerSchema";
import { eq } from "drizzle-orm";

const SeekerRouter = Router();

//get seeker
SeekerRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const Seeker = await db.query.SeekerSchema.findMany({
      where: (SeekerSchema, { eq }) => eq(SeekerSchema.id, id),
      with: {
        hospital: {
          columns: {
            id: true,
            name: true,
            Type: true,
            street: true,
            city: true,
            state: true,
            phone: true,
          },
        },
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

//delete seeker
SeekerRouter.delete("/:id", async (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  try {
    const seeker = await db
      .delete(SeekerSchema)
      .where(eq(SeekerSchema.id, id))
      .returning();
    res.status(200).json(seeker);
  } catch (error) {
    res.json(error);
  }
});

export default SeekerRouter;
