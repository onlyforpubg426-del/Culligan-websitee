import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, PhoneCall, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;

const bundles = [
  "Bachat Bundle",
  "Family Bundle",
  "Hydration Bundle",
  "Freshness Bundle",
  "Purity Bundle",
  "Picnic Bundle",
  "Seasonal Bundle",
  "Custom Order",
];

const orderSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(10, "Please enter a valid phone number").max(15),
  address: z.string().min(10, "Please enter your full delivery address"),
  bundle: z.string().min(1, "Please select a bundle"),
  notes: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

export function OrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { name: "", phone: "", address: "", bundle: "", notes: "" },
  });

  const onSubmit = async (data: OrderFormData) => {
    setSubmitting(true);
    try {
      await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
    }
    setSubmitting(false);
    setSubmitted(true);

    const message = [
      "Hi, I'd like to place a Culligan water order.",
      "",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Delivery Address: ${data.address}`,
      `Bundle: ${data.bundle}`,
      data.notes ? `Notes: ${data.notes}` : "",
      "",
      "Please confirm availability and delivery schedule. Thank you!",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/923001113535?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (submitted) {
    return (
      <section
        id="order"
        className="relative py-24 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #f0f7ff 0%, #e6f2ff 50%, #dceeff 100%)" }}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl p-12 bg-white/65 backdrop-blur-xl border border-white/80 shadow-2xl shadow-blue-100/60"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Order Received!</h3>
              <p className="text-slate-500 mb-6">Your order has been saved. WhatsApp should have opened — if not, tap below.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => { form.reset(); setSubmitted(false); }}
                  variant="outline"
                  className="rounded-xl"
                >
                  Place Another Order
                </Button>
                <Button
                  onClick={() => {
                    const d = form.getValues();
                    const msg = `Hi, I'd like to place a Culligan water order.\n\nName: ${d.name}\nPhone: ${d.phone}\nBundle: ${d.bundle}`;
                    window.open(`https://wa.me/923001113535?text=${encodeURIComponent(msg)}`, "_blank");
                  }}
                  className="rounded-xl bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Open WhatsApp Again
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="order"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f0f7ff 0%, #e6f2ff 50%, #dceeff 100%)" }}
    >
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] rounded-full bg-sky-200/30 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-semibold tracking-widest uppercase"
            >
              Place an Order
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-4xl font-bold text-slate-900"
            >
              Order on WhatsApp
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-muted-foreground"
            >
              Fill in your details and we'll open WhatsApp with everything pre-filled. No account needed.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 bg-white/65 backdrop-blur-xl border border-white/80 shadow-2xl shadow-blue-100/60"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Ahmed Khan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 0300 1234567" type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bundle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Bundle</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a bundle..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bundles.map((b) => (
                            <SelectItem key={b} value={b}>{b}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Street, area, city (e.g. House 42, Block 6, PECHS, Karachi)"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special delivery instructions or requests..."
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full rounded-xl font-semibold text-base shadow-lg bg-green-600 hover:bg-green-700 text-white gap-2.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  {submitting ? "Saving..." : "Send Order via WhatsApp"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Clicking the button saves your order and opens WhatsApp with your details pre-filled.
                </p>
              </form>
            </Form>

            <div className="mt-8 pt-6 border-t border-white/60 flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <PhoneCall className="h-4 w-4 text-primary" />
              <span>
                Prefer to call?{" "}
                <a href="tel:11135353535" className="text-primary font-semibold hover:underline">
                  UAN: 111 35 35 35
                </a>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
