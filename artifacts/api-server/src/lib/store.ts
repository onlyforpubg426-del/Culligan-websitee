import { EventEmitter } from "events";
import { db, ordersTable, leadsTable, contactsTable, subscriptionsTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";

export type OrderStatus = "new" | "confirmed" | "delivered" | "cancelled";
export type ContactStatus = "new" | "replied" | "closed";
export type SubscriptionStatus = "active" | "paused" | "cancelled";
export type SubscriptionFrequency = "weekly" | "biweekly" | "monthly";

export type Order = {
  id: number;
  name: string;
  address: string;
  daytimePhone: string;
  ext?: string | null;
  mobile: string;
  email?: string | null;
  bundle: string;
  paymentMethod: string;
  shippingMethod: string;
  notes?: string | null;
  status: OrderStatus;
  createdAt: string;
};

export type Lead = {
  id: number;
  name: string;
  phone: string;
  interest: string;
  message?: string | null;
  createdAt: string;
};

export type ContactEnquiry = {
  id: number;
  name: string;
  email?: string | null;
  phone: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
};

export type Subscription = {
  id: number;
  name: string;
  phone: string;
  address: string;
  bundle: string;
  frequency: SubscriptionFrequency;
  deliveryDay: string;
  notes?: string | null;
  status: SubscriptionStatus;
  createdAt: string;
};

export const bus = new EventEmitter();

function toIso(d: Date | string): string {
  return d instanceof Date ? d.toISOString() : new Date(d).toISOString();
}

export async function getAllOrders(): Promise<Order[]> {
  const rows = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt));
  return rows.map((r) => ({ ...r, status: r.status as OrderStatus, createdAt: toIso(r.createdAt) }));
}

export async function createOrder(data: Omit<Order, "id" | "status" | "createdAt">): Promise<Order> {
  const [row] = await db.insert(ordersTable).values({ ...data }).returning();
  const order: Order = { ...row, status: row.status as OrderStatus, createdAt: toIso(row.createdAt) };
  bus.emit("new_order", order);
  return order;
}

export async function updateOrderStatus(id: number, status: OrderStatus): Promise<Order | null> {
  const [row] = await db.update(ordersTable).set({ status }).where(eq(ordersTable.id, id)).returning();
  if (!row) return null;
  return { ...row, status: row.status as OrderStatus, createdAt: toIso(row.createdAt) };
}

export async function getAllLeads(): Promise<Lead[]> {
  const rows = await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt));
  return rows.map((r) => ({ ...r, createdAt: toIso(r.createdAt) }));
}

export async function createLead(data: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const [row] = await db.insert(leadsTable).values({ ...data }).returning();
  const lead: Lead = { ...row, createdAt: toIso(row.createdAt) };
  bus.emit("new_lead", lead);
  return lead;
}

export async function getAllContacts(): Promise<ContactEnquiry[]> {
  const rows = await db.select().from(contactsTable).orderBy(desc(contactsTable.createdAt));
  return rows.map((r) => ({ ...r, status: r.status as ContactStatus, createdAt: toIso(r.createdAt) }));
}

export async function createContact(data: Omit<ContactEnquiry, "id" | "status" | "createdAt">): Promise<ContactEnquiry> {
  const [row] = await db.insert(contactsTable).values({ ...data }).returning();
  const contact: ContactEnquiry = { ...row, status: row.status as ContactStatus, createdAt: toIso(row.createdAt) };
  bus.emit("new_contact", contact);
  return contact;
}

export async function updateContactStatus(id: number, status: ContactStatus): Promise<ContactEnquiry | null> {
  const [row] = await db.update(contactsTable).set({ status }).where(eq(contactsTable.id, id)).returning();
  if (!row) return null;
  return { ...row, status: row.status as ContactStatus, createdAt: toIso(row.createdAt) };
}

export async function getAllSubscriptions(): Promise<Subscription[]> {
  const rows = await db.select().from(subscriptionsTable).orderBy(desc(subscriptionsTable.createdAt));
  return rows.map((r) => ({ ...r, status: r.status as SubscriptionStatus, frequency: r.frequency as SubscriptionFrequency, createdAt: toIso(r.createdAt) }));
}

export async function createSubscription(data: Omit<Subscription, "id" | "status" | "createdAt">): Promise<Subscription> {
  const [row] = await db.insert(subscriptionsTable).values({ ...data }).returning();
  const subscription: Subscription = { ...row, status: row.status as SubscriptionStatus, frequency: row.frequency as SubscriptionFrequency, createdAt: toIso(row.createdAt) };
  bus.emit("new_subscription", subscription);
  return subscription;
}

export async function updateSubscriptionStatus(id: number, status: SubscriptionStatus): Promise<Subscription | null> {
  const [row] = await db.update(subscriptionsTable).set({ status }).where(eq(subscriptionsTable.id, id)).returning();
  if (!row) return null;
  return { ...row, status: row.status as SubscriptionStatus, frequency: row.frequency as SubscriptionFrequency, createdAt: toIso(row.createdAt) };
}
