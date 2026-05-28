import { logger } from "./logger";

const ADMIN_PHONE = "923222584525";

/**
 * Sends a WhatsApp message to the admin via the Callmebot API.
 * This is fire-and-forget — it never blocks the API response.
 *
 * Setup (one-time):
 *   1. Save the number +34 644 59 87 26 in your WhatsApp contacts as "CallMeBot".
 *   2. Send "I allow callmebot to send me messages" to that contact on WhatsApp.
 *   3. Callmebot will reply with your personal API key.
 *   4. Add that key as the CALLMEBOT_API_KEY secret in Replit.
 */
export function notifyAdmin(message: string): void {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) {
    logger.warn("CALLMEBOT_API_KEY not set — skipping WhatsApp admin notification");
    return;
  }

  const url =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${ADMIN_PHONE}` +
    `&text=${encodeURIComponent(message)}` +
    `&apikey=${encodeURIComponent(apiKey)}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        logger.warn({ status: res.status }, "Callmebot notification failed");
      } else {
        logger.info("Admin WhatsApp notification sent");
      }
    })
    .catch((err: unknown) => {
      logger.warn({ err }, "Callmebot notification error");
    });
}
