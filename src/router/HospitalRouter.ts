import { Router } from "express";
import db from "../database/db";
import { HospitalSchema } from "../database/schema/HospitalSchema";
import { count, eq } from "drizzle-orm";
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
    });
    res.status(200).json(Hospital);
  } catch (error) {
    res.json(error);
  }
});

//get by email
HospitalRouter.get("/:email", async (req, res) => {
  try {
    const Hospital = await db.query.HospitalSchema.findFirst({
      where: (HospitalSchema, { eq }) =>
        eq(HospitalSchema.email, req.params.email),
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

// Get hospital count
HospitalRouter.get("/count", async (req, res) => {
  try {
    const hospitalCount = await db
      .select({ count: count(HospitalSchema.id) }) // Count the number of hospital IDs
      .from(HospitalSchema);

    // Extract the count value from the first element of the array
    const countValue = hospitalCount[0]?.count || 0;

    // Return the count in the response
    res.status(200).json({ count: countValue });
  } catch (error) {
    console.error("Error fetching hospital count:", error); // Log the error for debugging
    res.status(500).json({
      error: "Failed to fetch hospital count",
    });
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
});
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
});
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
});
export default HospitalRouter;
