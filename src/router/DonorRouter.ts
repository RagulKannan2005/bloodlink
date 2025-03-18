import { Router } from "express";
import db from "../database/db";
import { DonorSchema } from "../database/schema/DonorSchema";
import { eq, count } from "drizzle-orm"; // Correct import for `count`

const DonorRouter = Router();

// Get all donors
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

// Create a new donor
DonorRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const Doner = await db.insert(DonorSchema).values(body).returning();
    res.status(200).json(Doner);
  } catch (error) {
    res.json(error);
  }
});

// Count the total number of donors
DonorRouter.get("/count", async (req, res) => {
  try {
    const donorCount = await db
      .select({ count: count() }) // Use `count` from drizzle-orm
      .from(DonorSchema);

    res.status(200).json({ count: donorCount[0].count }); // Return the count
  } catch (error) {
    res.json(error);
  }
});

// Update a donor
DonorRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  try {
    const doner = await db
      .update(DonorSchema)
      .set(body)
      .where(eq(DonorSchema.id, id))
      .returning();
    res.status(200).json(doner);
  } catch (error) {
    res.json(error);
  }
});

// Delete a donor
DonorRouter.delete("/:id", async (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  try {
    const doner = await db
      .delete(DonorSchema)
      .where(eq(DonorSchema.id, id))
      .returning();
    res.status(200).json(doner);
  } catch (error) {
    res.json(error);
  }
});

export default DonorRouter;
