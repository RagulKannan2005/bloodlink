import { Router } from "express";
import db from "../database/db";
import { TestdetailsSchema } from "../database/schema/TestdetailsSchema";
import { eq } from "drizzle-orm";

const TestdetailsRouter = Router();
//get testdetails
TestdetailsRouter.get("/", async (req, res) => {
  try {
    const testdetail = await db.query.TestdetailsSchema.findMany({
      columns: {
        id: true,
        name: true,
        age: true,
        bloodtype: true,
        gender: true,
        hgb: true,
        wbc: true,
        rbc: true,
        plt: true,
        testdate: true,
        testid: true,
      },
      with: {
        // doner: {
        //   columns: {
        //     id: true,
        //     name: true,
        //     email: true,
        //     phone: true,
        //   },
        // },
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
  } catch (error) {
    res.status(500).json(error);
  }
});

//get test details get by id
TestdetailsRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const testdetail = await db.query.TestdetailsSchema.findMany({
      columns: {
        id: true,
        name: true,
        age: true,
        bloodtype: true,
        gender: true,
        hgb: true,
        wbc: true,
        rbc: true,
        plt: true,
        testdate: true,
        testid: true,
      },
      with: {
        // doner: {
        //   columns: {
        //     id: true,
        //     name: true,
        //     email: true,
        //     phone: true,
        //   },
        // },
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
      where: (TestdetailsSchema, { eq }) => eq(TestdetailsSchema.id, id),
    });
    res.status(200).json(testdetail);
  } catch (error) {
    res.status(500).json(error);
  }
});
TestdetailsRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const testdetail = await db
      .insert(TestdetailsSchema)
      .values(body)
      .returning();
    res.status(200).json(testdetail);
  } catch (error) {
    res.status(500).json(error);
  }
});

TestdetailsRouter.get("/testdetails/:testid", async (req, res) => {
  try {
    const Testdetails = await db.query.TestdetailsSchema.findFirst({
      where: eq(TestdetailsSchema.testid, req.params.testid),
      columns: {
        id: true,
        name: true,
        age: true,
        bloodtype: true,
        gender: true,
        hgb: true,
        wbc: true,
        rbc: true,
        plt: true,
        testdate: true,
        testid: true,
      },
      with: {
        testcenter: {
          columns: {
            id: true,
            name: true,
            manager_name: true,
            manager_phone: true,
            phone: true,
            address: true,
            facility: true,
          },
        },
      },
    });
    res.status(200).json(Testdetails);
  } catch (error) {
    res.status(500).json({
      error: {
        code: 500,
        message: "test details not found",
      },
    });
  }
});

TestdetailsRouter.put("/:id", async (req, res) => {
  try {
    const body = req.body;
    const id = Number(req.params.id);
    const testdetail = await db
      .update(TestdetailsSchema)
      .set(body)
      .where(eq(TestdetailsSchema.id, id))
      .returning();
    res.status(200).json(testdetail);
  } catch (error) {
    res.status(500).json(error);
  }
});

TestdetailsRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const testdetail = await db
      .delete(TestdetailsSchema)
      .where(eq(TestdetailsSchema.id, id))
      .returning();
    res.status(200).json(testdetail);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default TestdetailsRouter;
