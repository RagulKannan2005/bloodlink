import { Router } from "express";
import db from "../database/db";
import { UserSchema } from "../database/schema/UserSchema";

const UserRouter=Router();

UserRouter.get("/:id",async (req,res)=>{
  const body=req.body;
  const user=await db.query.UserSchema.findMany({
    
  })
})