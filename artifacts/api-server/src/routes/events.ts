import { Router, type Request, type Response } from "express";
import { bus } from "../lib/store";

const router = Router();

router.get("/events", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const send = (event: string, data: unknown) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  const onOrder        = (d: unknown) => send("new_order",        d);
  const onLead         = (d: unknown) => send("new_lead",         d);
  const onContact      = (d: unknown) => send("new_contact",      d);
  const onSubscription = (d: unknown) => send("new_subscription", d);

  bus.on("new_order",        onOrder);
  bus.on("new_lead",         onLead);
  bus.on("new_contact",      onContact);
  bus.on("new_subscription", onSubscription);

  const heartbeat = setInterval(() => res.write(": ping\n\n"), 20000);

  req.on("close", () => {
    clearInterval(heartbeat);
    bus.off("new_order",        onOrder);
    bus.off("new_lead",         onLead);
    bus.off("new_contact",      onContact);
    bus.off("new_subscription", onSubscription);
  });
});

export default router;
