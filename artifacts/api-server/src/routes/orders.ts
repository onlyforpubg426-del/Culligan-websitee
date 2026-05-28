import { Router, type IRouter } from "express";
import { db, ordersTable, insertOrderSchema } from "@workspace/db";
import { desc } from "drizzle-orm";
import { broadcast } from "../lib/sse";

const router: IRouter = Router();

router.post("/orders", async (req, res) => {
  const parsed = insertOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid order data", details: parsed.error.issues });
    return;
  }
  const [order] = await db.insert(ordersTable).values(parsed.data).returning();
  broadcast({ type: "new_order", payload: order as Record<string, unknown> });
  res.status(201).json(order);
});

router.get("/orders", async (_req, res) => {
  const orders = await db
    .select()
    .from(ordersTable)
    .orderBy(desc(ordersTable.createdAt));
  res.json(orders);
});

router.patch("/orders/:id/status", async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const allowed = ["new", "confirmed", "delivered", "cancelled"] as const;
  if (!allowed.includes(status)) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }
  const { eq } = await import("drizzle-orm");
  const [updated] = await db
    .update(ordersTable)
    .set({ status })
    .where(eq(ordersTable.id, id))
    .returning();
  if (!updated) { res.status(404).json({ error: "Order not found" }); return; }
  res.json(updated);
});

export default router;
