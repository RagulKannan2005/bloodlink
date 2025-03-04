import { Router } from "express";
import db from "../database/db";
import { HospitalSchema } from "../database/schema/HospitalSchema";

const UserRouter = Router();

//get user
UserRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await db.query.UserSchema.findMany({
      where: (HospitalSchema, { eq }) => eq(HospitalSchema.id, id),
      with: {
        name: true,
        role: true,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.json(error);
  }
});
export default UserRouter;
