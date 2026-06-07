import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, PhoneCall } from "lucide-react";
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

const interests = [
  "19L Water Bottles",
  "Water Dispensers",
  "Home Delivery Plan",
  "Corporate / Office Supply",
  "Bulk Order",
  "Product Information",
  "Other",
];

const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(10, "Please enter a valid phone number").max(15),
  interest: z.string().min(1, "Please select a topic"),
  message: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

export function Enquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", phone: "", interest: "", message: "" },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="enquiry"
      className="relative py-24 overflow-hidden bg-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-blue-50/70 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[360px] h-[360px] rounded-full bg-sky-50/60 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#1d6fa4] text-sm font-semibold tracking-widest uppercase"
            >
              Get in Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-4xl font-bold text-slate-900"
            >
              Send Us an Enquiry
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-slate-500 max-w-xl mx-auto"
            >
              Have a question about our products or services? Fill in the form and our team will get back to you within one business day.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-5 gap-10 items-start">

            {/* ── Left info column ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 space-y-6"
            >
              <div className="rounded-2xl p-6 bg-gradient-to-br from-[#e8f4fd] to-[#dceeff] border border-blue-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <a
                    href="tel:+922111353535"
                    className="flex items-center gap-3 text-sm text-slate-700 hover:text-[#1d6fa4] transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:shadow-md transition-shadow">
                      <PhoneCall className="w-4 h-4 text-[#1d6fa4]" />
                    </div>
                    <div>
                      <p className="font-semibold">UAN</p>
                      <p className="text-slate-500">111 35 35 35</p>
                    </div>
                  </a>
                  <a
                    href="mailto:info@culliganpk.com"
                    className="flex items-center gap-3 text-sm text-slate-700 hover:text-[#1d6fa4] transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:shadow-md transition-shadow">
                      <Mail className="w-4 h-4 text-[#1d6fa4]" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-slate-500">info@culliganpk.com</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-slate-50 border border-slate-100">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Office Hours</h3>
                <div className="space-y-1.5 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Monday – Saturday</span>
                    <span className="font-semibold text-slate-800">9 AM – 6 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold text-slate-800">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Right form column ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="md:col-span-3"
            >
              {submitted ? (
                <div className="rounded-3xl p-10 bg-white border border-slate-100 shadow-xl shadow-slate-100/80 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Enquiry Received!</h3>
                  <p className="text-slate-500 mb-6">
                    Thank you! Our team will get back to you within one business day.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => { form.reset(); setSubmitted(false); }}
                  >
                    Send Another Enquiry
                  </Button>
                </div>
              ) : (
                <div className="rounded-3xl p-8 bg-white border border-slate-100 shadow-xl shadow-slate-100/80">
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
                        name="interest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>I'm interested in</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a topic..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {interests.map((item) => (
                                  <SelectItem key={item} value={item}>{item}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message (optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any specific questions or details you'd like us to know..."
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {error && (
                        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
                          {error}
                        </p>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={submitting}
                        className="w-full rounded-xl font-semibold text-base shadow-lg gap-2.5"
                        style={{ background: "#1d6fa4" }}
                      >
                        <Send className="h-4 w-4" />
                        {submitting ? "Sending..." : "Send Enquiry"}
                      </Button>

                      <p className="text-center text-xs text-slate-400">
                        We'll never share your details with third parties.
                      </p>
                    </form>
                  </Form>
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
