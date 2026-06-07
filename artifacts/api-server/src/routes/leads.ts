import { Router } from "express";
import { z } from "zod";
import { getAllLeads, createLead } from "../lib/store";

const router = Router();

const CreateLeadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  interest: z.string().min(1),
  message: z.string().optional(),
});

router.get("/leads", async (_req, res) => {
  const leads = await getAllLeads();
  res.json(leads);
});

router.post("/leads", async (req, res) => {
  const result = CreateLeadSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "Invalid lead data", details: result.error.issues });
    return;
  }
  const lead = await createLead(result.data);
  res.status(201).json(lead);
});

export default router;
