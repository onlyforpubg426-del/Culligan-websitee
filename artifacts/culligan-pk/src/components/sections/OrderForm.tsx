import { motion } from "framer-motion";
import { MessageCircle, PhoneCall } from "lucide-react";
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
  phone: z.string().min(10, "Please enter a valid phone number").max(15, "Please enter a valid phone number"),
  address: z.string().min(10, "Please enter your full delivery address"),
  bundle: z.string().min(1, "Please select a bundle"),
  notes: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

export function OrderForm() {
  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { name: "", phone: "", address: "", bundle: "", notes: "" },
  });

  const onSubmit = (data: OrderFormData) => {
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
            className="rounded-3xl p-8
                       bg-white/65 backdrop-blur-xl
                       border border-white/80
                       shadow-2xl shadow-blue-100/60"
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
                  className="w-full rounded-xl font-semibold text-base shadow-lg bg-green-600 hover:bg-green-700 text-white gap-2.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Send Order via WhatsApp
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Clicking the button opens WhatsApp with your details pre-filled. No account needed.
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
