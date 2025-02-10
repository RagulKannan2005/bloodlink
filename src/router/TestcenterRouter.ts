import { Router } from "express";
import db from "../database/db";

const TestcenterRouter = Router();

//get testcenter
TestcenterRouter.get("/:id", async (req, res) => {
  try {
    const id=Number(req.params.id);
    const Testcenter = await db.query.TestcenterSchema.findMany({
      where: (TestcenterSchema, { eq }) => eq(TestcenterSchema.id, id),
      with: {
        testdetails: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.status(200).json(Testcenter);
  } catch (error) {
    res.json(error);
  }
});


export default TestcenterRouter;