import { Router } from "express";
import db from "../database/db";

export const BloodtypeRouter = Router();

//get bloodtype
BloodtypeRouter.get("/", async (req, res) => {
  try {
    const Bloodtype = await db.query.BloodtypeSchema.findMany({
      columns: {
        id: true,
        btype: true,
        prize: true,
      },
    });
    res.status(200).json(Bloodtype);
  } catch (error) {
    res.json(error);
  }
});

export default BloodtypeRouter;