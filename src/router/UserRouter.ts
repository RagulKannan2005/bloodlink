import { Router } from "express";
import db from "../database/db";
import { UserSchema } from "../database/schema/UserSchema";
import { eq } from "drizzle-orm";

const UserRouter = Router();

//get user
UserRouter.get("/", async (req, res) => {
  try {
    const User = await db.query.UserSchema.findMany({
      columns: {
        id: true,
        name: true,
        phoneno: true,
        email: true,
        role: true,

        password: true,
      },
    });
    res.status(200).json(User);
  } catch (error) {
    res.json(error);
  }
});

//post user
UserRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const User = await db.insert(UserSchema).values(body).returning();
    res.status(200).json(User);
  } catch (error) {
    res.json(error);
  }
});

//put user
UserRouter.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;
    const User = await db
      .update(UserSchema)
      .set(body)
      .where(eq(UserSchema.id, id))
      .returning();
    res.status(200).json(User);
  } catch (error) {
    res.json(error);
  }
})
//delete user
UserRouter.delete("/:id", async (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  try {
    const User = await db
      .delete(UserSchema)
      .where(eq(UserSchema.id, id))
      .returning();
    res.status(200).json(User);
  } catch (error) {
    res.json(error);
  }
})
export default UserRouter;
