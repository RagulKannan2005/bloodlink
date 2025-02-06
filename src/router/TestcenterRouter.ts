import { Router } from "express";
import db from "../database/db";

const TestcenterRouter = Router();

//get testcenter
TestcenterRouter.get("/", async (req, res) => {
  try {
    const Testcenter = await db.query.TestcenterSchema.findMany({
      columns: {
        id: true,
        name: true,
        phone: true,
        address: true,
        capacity: true,
        manager_name: true,
        manager_phone: true,
        licence_no: true,
        registered_date: true,
        facility: true,
      },
    });
    res.status(200).json(Testcenter);
  } catch (error) {
    res.json(error);
  }
});


export default TestcenterRouter;