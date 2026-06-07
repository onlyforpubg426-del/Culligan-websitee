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
  { name: "Hydration Bundle",  contents: "60 × 500ml",                   price: "Rs 2,250" },
  { name: "Family Bundle",     contents: "36 × 500ml + 12 × 1.5L",       price: "Rs 2,240" },
  { name: "Purity Bundle",     contents: "30 × 1.5L",                    price: "Rs 2,225" },
  { name: "Bachat Bundle",     contents: "12 × 6L",                      price: "Rs 2,580" },
  { name: "Freshness Bundle",  contents: "6 × 6L",                       price: "Rs 1,308" },
  { name: "Picnic Bundle",     contents: "12×500ml + 6×1.5L + 1×6L",     price: "Rs 1,120" },
  { name: "Custom Order",      contents: "Tell us what you need",         price: ""         },
];

const SHIPPING_OPTIONS = [
  "Free Delivery at My Door Step (Karachi Only)",
  "I Will Pick it Up from Your Water Shop (DHA)",
  "I Will Pick it Up from Your Water Shop (Water Shop Society)",
];

const orderSchema = z.object({
  name:           z.string().min(2,  "Please enter your full name"),
  address:        z.string().min(5,  "Please enter your delivery address"),
  daytimePhone:   z.string().min(7,  "Please enter a valid phone number").max(20),
  ext:            z.string().optional(),
  mobile:         z.string().min(10, "Please enter a valid mobile number").max(15),
  email:          z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  bundle:         z.string().min(1,  "Please select a bundle"),
  paymentMethod:  z.string().default("Cash on Delivery"),
  shippingMethod: z.string().min(1,  "Please select a shipping method"),
  notes:          z.string().optional(),
});
type OrderFormData = z.infer<typeof orderSchema>;

function RadioOption({
  label,
  value,
  checked,
  onChange,
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <label
      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
        checked ? "border-blue-400 bg-blue-50/60" : "border-slate-200 bg-white/60 hover:border-blue-200"
      }`}
      onClick={() => onChange(value)}
    >
      <span className={`mt-0.5 shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${checked ? "border-blue-500" : "border-slate-300"}`}>
        {checked && <span className="w-2 h-2 rounded-full bg-blue-500" />}
      </span>
      <span className="text-sm font-medium text-slate-700 leading-snug">{label}</span>
    </label>
  );
}

export function OrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "", address: "", daytimePhone: "", ext: "", mobile: "",
      email: "", bundle: "",
      paymentMethod: "Cash on Delivery",
      shippingMethod: SHIPPING_OPTIONS[0],
      notes: "",
    },
  });

  const onSubmit = async (data: OrderFormData) => {
    setSubmitting(true);
    try {
      await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {}
    setSubmitting(false);
    setSubmitted(true);

    const phone = data.ext ? `${data.daytimePhone} (Ext: ${data.ext})` : data.daytimePhone;
    const message = [
      "Hi, I'd like to place a Culligan water order.",
      "",
      `Name: ${data.name}`,
      `Delivery Address: ${data.address}`,
      `Daytime Phone: ${phone}`,
      `Mobile: ${data.mobile}`,
      data.email ? `Email: ${data.email}` : "",
      `Bundle: ${data.bundle}`,
      `Payment: ${data.paymentMethod}`,
      `Shipping: ${data.shippingMethod}`,
      data.notes ? `Special Instructions: ${data.notes}` : "",
      "",
      "Please confirm availability and delivery schedule. Thank you!",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/923222584525?text=${encodeURIComponent(message)}`, "_blank");
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
                <Button onClick={() => { form.reset(); setSubmitted(false); }} variant="outline" className="rounded-xl">
                  Place Another Order
                </Button>
                <Button
                  onClick={() => {
                    const d = form.getValues();
                    const msg = `Hi, I'd like to place a Culligan water order.\n\nName: ${d.name}\nMobile: ${d.mobile}\nBundle: ${d.bundle}`;
                    window.open(`https://wa.me/923222584525?text=${encodeURIComponent(msg)}`, "_blank");
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
          <div className="text-center mb-10">
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
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden bg-white/65 backdrop-blur-xl border border-white/80 shadow-2xl shadow-blue-100/60"
          >
            <div className="bg-gradient-to-r from-[#1d6fa4] to-[#2196f3] px-8 py-5">
              <h3 className="text-white font-extrabold text-xl tracking-wide uppercase text-center">
                Avail with Cash
              </h3>
            </div>

            <div className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input placeholder="e.g. Ahmed Khan" className="bg-slate-50 border-slate-200" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Delivery Address <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input placeholder="Street, area, city (e.g. House 42, Block 6, PECHS)" className="bg-slate-50 border-slate-200" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="flex gap-3">
                    <FormField control={form.control} name="daytimePhone" render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Daytime Phone Number <span className="text-red-500">*</span></FormLabel>
                        <FormControl><Input placeholder="e.g. 021-1234567" type="tel" className="bg-slate-50 border-slate-200" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="ext" render={({ field }) => (
                      <FormItem className="w-24">
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Ext</FormLabel>
                        <FormControl><Input placeholder="Ext" className="bg-slate-50 border-slate-200" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="mobile" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile Number <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input placeholder="e.g. 0300 1234567" type="tel" className="bg-slate-50 border-slate-200" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input placeholder="e.g. name@example.com" type="email" className="bg-slate-50 border-slate-200" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="bundle" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Bundle <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-50 border-slate-200"><SelectValue placeholder="Choose a bundle..." /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bundles.map((b) => (
                            <SelectItem key={b.name} value={b.name}>
                              <span className="font-semibold">{b.name}</span>
                              <span className="text-slate-400 ml-1.5">— {b.contents}{b.price ? ` · ${b.price}` : ""}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Payment Method</FormLabel>
                      <div className="space-y-2">
                        <RadioOption label="Cash on Delivery" value="Cash on Delivery" checked={field.value === "Cash on Delivery"} onChange={field.onChange} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="shippingMethod" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Shipping Method</FormLabel>
                      <div className="space-y-2">
                        {SHIPPING_OPTIONS.map((opt) => (
                          <RadioOption key={opt} label={opt} value={opt} checked={field.value === opt} onChange={field.onChange} />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="notes" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Special Instructions</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any special delivery instructions or requests..." rows={3} className="bg-slate-50 border-slate-200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="border-t border-slate-200 pt-4 space-y-1.5">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span className="font-semibold uppercase tracking-wide text-xs">Subtotal:</span>
                      <span className="font-bold text-slate-700">Based on bundle</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold uppercase tracking-wide text-sm text-slate-700">Total:</span>
                      <span className="font-extrabold text-slate-900 text-base">As quoted</span>
                    </div>
                  </div>

                  <Button type="submit" size="lg" disabled={submitting} className="w-full rounded-xl font-semibold text-base shadow-lg bg-green-600 hover:bg-green-700 text-white gap-2.5">
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
                <span>Prefer to call? <a href="tel:11135353535" className="text-primary font-semibold hover:underline">UAN: 111 35 35 35</a></span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
