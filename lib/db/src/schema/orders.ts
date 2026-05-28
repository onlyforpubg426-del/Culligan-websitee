import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const orderStatusEnum = pgEnum("order_status", [
  "new",
  "confirmed",
  "delivered",
  "cancelled",
]);

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  daytimePhone: text("daytime_phone").notNull(),
  ext: text("ext"),
  mobile: text("mobile").notNull(),
  email: text("email"),
  bundle: text("bundle").notNull(),
  paymentMethod: text("payment_method").default("Cash on Delivery").notNull(),
  shippingMethod: text("shipping_method").default("Free Delivery at My Door Step (Karachi Only)").notNull(),
  notes: text("notes"),
  status: orderStatusEnum("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const selectOrderSchema = createSelectSchema(ordersTable);

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;
