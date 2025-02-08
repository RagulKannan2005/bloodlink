import { Router } from "express";
import db from "../database/db";
import { TestdetailsSchema } from "../database/schema/TestdetailsSchema";
import { eq } from "drizzle-orm";

const TestdetailsRouter = Router();

TestdetailsRouter.get("/", async (req, res) => {
    try {
        const testdetail=await db.query.TestdetailsSchema.findMany({
            columns:{
                id:true,
                name:true,
                age:true,
                address:true,
                bloodtype:true,
                gender:true,
                hgb:true,
                wbc:true,
                rbc:true,
                plt:true,
                testdate:true
            }
        });
        res.status(200).json(testdetail);
    } catch (error) {
        res.status(500).json(error);
    }
});

TestdetailsRouter.post("/", async (req, res) => {
    try {
        const body = req.body;
        const testdetail = await db.insert(TestdetailsSchema).values(body).returning();
        res.status(200).json(testdetail);
    } catch (error) {
        res.status(500).json(error);
    }
});

TestdetailsRouter.put("/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = Number(req.params.id);
        const testdetail = await db.update(TestdetailsSchema).set(body).where(eq(TestdetailsSchema.id, id)).returning();
        res.status(200).json(testdetail);
    } catch (error) {
        res.status(500).json(error);
    }
});

TestdetailsRouter.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const testdetail = await db.delete(TestdetailsSchema).where(eq(TestdetailsSchema.id, id)).returning();
        res.status(200).json(testdetail);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default TestdetailsRouter;