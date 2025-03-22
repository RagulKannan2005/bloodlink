import { Router } from "express";
import db from "../database/db";
import { TestcenterSchema } from "../database/schema/TestcenterSchema";
import { eq } from "drizzle-orm";
const TestcenterRouter = Router();

//get testcenter
TestcenterRouter.get("/", async (req, res) => {
  try {
    const Testcenter = await db.query.TestcenterSchema.findMany({
      columns: {
        licence_no: false,
      },
    });
    res.status(200).json(Testcenter);
  } catch (error) {
    res.json(error);
  }
});
TestcenterRouter.get("/:licence_no",async(req,res)=>{
  try{
    const Testcenter =await db.query.TestcenterSchema.findFirst({
      where: eq(TestcenterSchema.licence_no, req.params.licence_no),
      columns: {
        id: true,
        name: true,
        password: true,
        licence_no: true,
      },
    });
    res.status(200).json(Testcenter);
  }catch(error){
    res.json(error);
  }
})
        
      

//post testcenter
TestcenterRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const Testcenter = await db
      .insert(TestcenterSchema)
      .values(body)
      .returning();
    res.status(200).json(Testcenter);
  } catch (error) {
    res.json(error);
  }
});
//put testcenter
TestcenterRouter.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;
    const Testcenter = await db
      .update(TestcenterSchema)
      .set(body)
      .where(eq(TestcenterSchema.id, id))
      .returning();
    res.status(200).json(Testcenter);
  } catch (error) {
    res.json(error);
  }
});

//delete testcenter
TestcenterRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const Testcenter = await db
      .delete(TestcenterSchema)
      .where(eq(TestcenterSchema.id, id))
      .returning();
    res.status(200).json(Testcenter);
  } catch (error) {
    res.json(error);
  }
});

export default TestcenterRouter;
