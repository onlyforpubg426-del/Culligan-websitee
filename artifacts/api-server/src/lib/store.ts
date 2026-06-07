import { EventEmitter } from "events";

export type OrderStatus = "new" | "confirmed" | "delivered" | "cancelled";
export type ContactStatus = "new" | "replied" | "closed";
export type SubscriptionStatus = "active" | "paused" | "cancelled";
export type SubscriptionFrequency = "weekly" | "biweekly" | "monthly";

export interface Order {
  id: number;
  name: string;
  address: string;
  daytimePhone: string;
  ext?: string;
  mobile: string;
  email?: string;
  bundle: string;
  paymentMethod: string;
  shippingMethod: string;
  notes?: string;
  status: OrderStatus;
  createdAt: string;
}

export interface Lead {
  id: number;
  name: string;
  phone: string;
  interest: string;
  message?: string;
  createdAt: string;
}

export interface ContactEnquiry {
  id: number;
  name: string;
  email?: string;
  phone: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

export interface Subscription {
  id: number;
  name: string;
  phone: string;
  address: string;
  bundle: string;
  frequency: SubscriptionFrequency;
  deliveryDay: string;
  notes?: string;
  status: SubscriptionStatus;
  createdAt: string;
}

let orderSeq = 1;
let leadSeq = 1;
let contactSeq = 1;
let subscriptionSeq = 1;

export const orders: Order[] = [];
export const leads: Lead[] = [];
export const contacts: ContactEnquiry[] = [];
export const subscriptions: Subscription[] = [];

export const bus = new EventEmitter();

export function createOrder(data: Omit<Order, "id" | "status" | "createdAt">): Order {
  const order: Order = { ...data, id: orderSeq++, status: "new", createdAt: new Date().toISOString() };
  orders.unshift(order);
  bus.emit("new_order", order);
  return order;
}

export function createLead(data: Omit<Lead, "id" | "createdAt">): Lead {
  const lead: Lead = { ...data, id: leadSeq++, createdAt: new Date().toISOString() };
  leads.unshift(lead);
  bus.emit("new_lead", lead);
  return lead;
}

export function createContact(data: Omit<ContactEnquiry, "id" | "status" | "createdAt">): ContactEnquiry {
  const contact: ContactEnquiry = { ...data, id: contactSeq++, status: "new", createdAt: new Date().toISOString() };
  contacts.unshift(contact);
  bus.emit("new_contact", contact);
  return contact;
}

export function createSubscription(data: Omit<Subscription, "id" | "status" | "createdAt">): Subscription {
  const subscription: Subscription = { ...data, id: subscriptionSeq++, status: "active", createdAt: new Date().toISOString() };
  subscriptions.unshift(subscription);
  bus.emit("new_subscription", subscription);
  return subscription;
}
