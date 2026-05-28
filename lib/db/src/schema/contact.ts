import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const contactEnquiriesTable = pgTable("contact_enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contactEnquiriesTable).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const selectContactSchema = createSelectSchema(contactEnquiriesTable);

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactEnquiry = typeof contactEnquiriesTable.$inferSelect;
