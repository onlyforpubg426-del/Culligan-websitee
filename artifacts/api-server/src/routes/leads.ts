import { Router, type IRouter } from "express";
import { db, leadsTable, insertLeadSchema } from "@workspace/db";
import { desc } from "drizzle-orm";
import { broadcast } from "../lib/sse";

const router: IRouter = Router();

router.post("/leads", async (req, res) => {
  const parsed = insertLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid lead data", details: parsed.error.issues });
    return;
  }
  const [lead] = await db.insert(leadsTable).values(parsed.data).returning();
  broadcast({ type: "new_lead", payload: lead as Record<string, unknown> });
  res.status(201).json(lead);
});

router.get("/leads", async (_req, res) => {
  const leads = await db
    .select()
    .from(leadsTable)
    .orderBy(desc(leadsTable.createdAt));
  res.json(leads);
});

export default router;
