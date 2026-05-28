import { Router, type IRouter } from "express";
import { db, contactEnquiriesTable, insertContactSchema } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { broadcast } from "../lib/sse";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = insertContactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid contact data", details: parsed.error.issues });
    return;
  }
  const [enquiry] = await db.insert(contactEnquiriesTable).values(parsed.data).returning();
  broadcast({ type: "new_contact", payload: enquiry as Record<string, unknown> });
  res.status(201).json(enquiry);
});

router.get("/contact", async (_req, res) => {
  const enquiries = await db
    .select()
    .from(contactEnquiriesTable)
    .orderBy(desc(contactEnquiriesTable.createdAt));
  res.json(enquiries);
});

router.patch("/contact/:id/status", async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body as { status: string };
  const allowed = ["new", "replied", "closed"];
  if (!allowed.includes(status)) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }
  const [updated] = await db
    .update(contactEnquiriesTable)
    .set({ status })
    .where(eq(contactEnquiriesTable.id, id))
    .returning();
  res.json(updated);
});

export default router;
