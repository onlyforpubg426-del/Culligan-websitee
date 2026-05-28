import type { Response } from "express";
import { logger } from "./logger";

export type SseEvent = {
  type: "new_order" | "new_lead" | "new_contact";
  payload: Record<string, unknown>;
};

const clients = new Set<Response>();

export function addClient(res: Response): void {
  clients.add(res);
  logger.info({ total: clients.size }, "SSE client connected");
}

export function removeClient(res: Response): void {
  clients.delete(res);
  logger.info({ total: clients.size }, "SSE client disconnected");
}

export function broadcast(event: SseEvent): void {
  if (clients.size === 0) return;
  const data = `event: ${event.type}\ndata: ${JSON.stringify(event.payload)}\n\n`;
  for (const client of clients) {
    try {
      client.write(data);
    } catch {
      clients.delete(client);
    }
  }
  logger.info({ type: event.type, clients: clients.size }, "SSE broadcast sent");
}
