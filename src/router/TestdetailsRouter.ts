import { Router } from "express";
import db from "../database/db";
import { TestdetailsSchema } from "../database/schema/TestdetailsSchema";
import { eq } from "drizzle-orm"; // ✅ Fixed: Directly import eq

const TestdetailsRouter = Router();

// ✅ GET route: Fetch test details by ID
TestdetailsRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID provided" }); // ✅ Fixed: Handle NaN ID
    }

    const testdetail = await db.query.TestdetailsSchema.findMany({
      where: (TestdetailsSchema) => eq(TestdetailsSchema.id, id), // ✅ Fixed: Removed { eq } from parameters
      with: {
        doner: {
          columns: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        testcenter: {
          columns: {
            id: true,
            name: true,
            phone: true,
            address: true,
            manager_name: true,
            manager_phone: true,
            facility: true,
          },
        },
      },
    });

    if (testdetail.length === 0) {
      return res.status(404).json({ message: "Test detail not found" }); // ✅ Fixed: Return 404 if no data
    }

    res.status(200).json(testdetail);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message }); // ✅ Improved error response
  }
});

// ✅ POST route: Create new test detail
TestdetailsRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ error: "Request body is missing" }); // ✅ Fixed: Validate request body
    }

    const testdetail = await db.insert(TestdetailsSchema).values(body).returning();
    res.status(201).json(testdetail); // ✅ Fixed: Changed status to 201 (Created)
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// ✅ PUT route: Update test detail by ID
TestdetailsRouter.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID provided" }); // ✅ Fixed: Handle NaN ID
    }

    const body = req.body;
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ error: "Request body is missing" }); // ✅ Fixed: Validate request body
    }

    const testdetail = await db.update(TestdetailsSchema).set(body).where(eq(TestdetailsSchema.id, id)).returning();
    if (testdetail.length === 0) {
      return res.status(404).json({ message: "Test detail not found" }); // ✅ Fixed: Return 404 if no data updated
    }

    res.status(200).json(testdetail);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// ✅ DELETE route: Remove test detail by ID
TestdetailsRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID provided" }); // ✅ Fixed: Handle NaN ID
    }

    const testdetail = await db.delete(TestdetailsSchema).where(eq(TestdetailsSchema.id, id)).returning();
    if (testdetail.length === 0) {
      return res.status(404).json({ message: "Test detail not found" }); // ✅ Fixed: Return 404 if no data found
    }

    res.status(200).json({ message: "Test detail deleted successfully", deleted: testdetail });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

export default TestdetailsRouter;
