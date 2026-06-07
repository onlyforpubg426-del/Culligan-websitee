import { Router } from "express";
import { z } from "zod";
import { getAllContacts, createContact, updateContactStatus, type ContactStatus } from "../lib/store";

const router = Router();

const CreateContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().optional(),
  phone: z.string().min(1),
  subject: z.string().min(1),
  message: z.string().min(1),
});

const StatusSchema = z.object({
  status: z.enum(["new", "replied", "closed"]),
});

router.get("/contact", async (_req, res) => {
  const contacts = await getAllContacts();
  res.json(contacts);
});

router.post("/contact", async (req, res) => {
  const result = CreateContactSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "Invalid contact data", details: result.error.issues });
    return;
  }
  const contact = await createContact(result.data);
  res.status(201).json(contact);
});

router.patch("/contact/:id/status", async (req, res) => {
  const id = Number(req.params["id"]);
  const result = StatusSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }
  const contact = await updateContactStatus(id, result.data.status as ContactStatus);
  if (!contact) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }
  res.json(contact);
});

export default router;
