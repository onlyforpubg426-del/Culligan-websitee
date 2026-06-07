import { Router } from "express";
import { z } from "zod";
import { getAllOrders, createOrder, updateOrderStatus, type OrderStatus } from "../lib/store";

const router = Router();

const CreateOrderSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  daytimePhone: z.string().min(1),
  ext: z.string().optional(),
  mobile: z.string().min(1),
  email: z.string().optional(),
  bundle: z.string().min(1),
  paymentMethod: z.string().min(1),
  shippingMethod: z.string().min(1),
  notes: z.string().optional(),
});

const StatusSchema = z.object({
  status: z.enum(["new", "confirmed", "delivered", "cancelled"]),
});

router.get("/orders", async (_req, res) => {
  const orders = await getAllOrders();
  res.json(orders);
});

router.post("/orders", async (req, res) => {
  const result = CreateOrderSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "Invalid order data", details: result.error.issues });
    return;
  }
  const order = await createOrder(result.data);
  res.status(201).json(order);
});

router.patch("/orders/:id/status", async (req, res) => {
  const id = Number(req.params["id"]);
  const result = StatusSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }
  const order = await updateOrderStatus(id, result.data.status as OrderStatus);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  res.json(order);
});

export default router;
