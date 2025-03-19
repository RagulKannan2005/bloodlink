import { Router } from "express";
import db from "../database/db";
import { SeekerSchema } from "../database/schema/SeekerSchema";
import { eq } from "drizzle-orm";

const SeekerRouter = Router();

//get Seeker
SeekerRouter.get("/:hospital_id", async (req, res) => {
  try {
    const id = Number(req.params.hospital_id);
    const Seeker = await db.query.SeekerSchema.findMany({
      where: eq(SeekerSchema.hospital_id, id),
      columns: {
        id: true,
        name: true,
        phone: true,
        age: true,
        gender: true,
        bloodtype: true,
        timeofNeed: true,
        units: true,
        reason: true,
        hospital_id: true
        
      },
      with: {
        hospital: {
          columns:{
            id:false,
            password:false

          }
      }
    }
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
    const Seeker = await db.insert(SeekerSchema).values(body).returning();
    res.status(200).json(Seeker);
  } catch (error) {
    res.json(error);
  }
})

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
