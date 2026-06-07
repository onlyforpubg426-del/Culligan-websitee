import { Router } from "express";
import { z } from "zod";
import { getAllSubscriptions, createSubscription, updateSubscriptionStatus, type SubscriptionStatus } from "../lib/store";

const router = Router();

const CreateSubscriptionSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  bundle: z.string().min(1),
  frequency: z.enum(["weekly", "biweekly", "monthly"]),
  deliveryDay: z.string().min(1),
  notes: z.string().optional(),
});

const StatusSchema = z.object({
  status: z.enum(["active", "paused", "cancelled"]),
});

router.get("/subscriptions", async (_req, res) => {
  const subscriptions = await getAllSubscriptions();
  res.json(subscriptions);
});

router.post("/subscriptions", async (req, res) => {
  const result = CreateSubscriptionSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "Invalid subscription data", details: result.error.issues });
    return;
  }
  const subscription = await createSubscription(result.data);
  res.status(201).json(subscription);
});

router.patch("/subscriptions/:id/status", async (req, res) => {
  const id = Number(req.params["id"]);
  const result = StatusSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }
  const subscription = await updateSubscriptionStatus(id, result.data.status as SubscriptionStatus);
  if (!subscription) {
    res.status(404).json({ error: "Subscription not found" });
    return;
  }
  res.json(subscription);
});

export default router;
