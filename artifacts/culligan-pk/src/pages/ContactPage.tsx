import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, Mail, MapPin, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;

const SUBJECTS = [
  { id: "General Enquiry",    emoji: "💬" },
  { id: "Home Delivery",      emoji: "🚿" },
  { id: "Office Delivery",    emoji: "🏢" },
  { id: "Water Dispensers",   emoji: "🤍" },
  { id: "Technical Support",  emoji: "🔧" },
  { id: "Billing & Payments", emoji: "💳" },
  { id: "Deposit Refund",     emoji: "💰" },
  { id: "Retailer / Reseller",emoji: "🏪" },
  { id: "Other",              emoji: "❓" },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const empty: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.phone.trim() || !form.subject || !form.message.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      setForm(empty);
    } catch {
      setError("Something went wrong. Please try WhatsApp or phone instead.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-14">

        {/* Hero */}
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-sky-50 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-sky-100/50 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 py-10 md:py-16 relative z-10">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-[#1d6fa4] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#42a5f5] mb-3">Get in Touch</p>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-5">
                Contact Us
              </h1>
              <p className="text-slate-600 text-base leading-relaxed max-w-xl">
                Have a question, need to update your delivery, or want to place an order? Fill in the form below and we'll get back to you within 1–2 business days — or reach us directly for a faster response.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 md:px-6 py-14 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Contact info sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-lg font-black text-slate-900 mb-5">Reach us directly</h2>

                <div className="space-y-4">
                  <a
                    href="tel:111353535"
                    className="flex items-start gap-3 p-4 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                      <Phone className="w-4.5 h-4.5 text-blue-600 w-[18px] h-[18px]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">UAN</p>
                      <p className="text-base font-bold text-slate-900">111 35 35 35</p>
                      <p className="text-xs text-slate-400 mt-0.5">7 days a week</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/923222584525"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-4 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-green-100 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                      <MessageSquare className="w-[18px] h-[18px] text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">WhatsApp</p>
                      <p className="text-base font-bold text-slate-900">0300 111 35 35</p>
                      <p className="text-xs text-slate-400 mt-0.5">Fastest response</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@culligan.com.pk"
                    className="flex items-start gap-3 p-4 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 group-hover:bg-sky-100 transition-colors">
                      <Mail className="w-[18px] h-[18px] text-sky-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Email</p>
                      <p className="text-sm font-bold text-slate-900 break-all">info@culligan.com.pk</p>
                      <p className="text-xs text-slate-400 mt-0.5">Include account number</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-4 rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                      <MapPin className="w-[18px] h-[18px] text-violet-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Head Office</p>
                      <p className="text-sm font-semibold text-slate-900">Karachi, Pakistan</p>
                      <p className="text-xs text-slate-400 mt-0.5">Free delivery across Karachi</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <p className="text-xs font-bold text-blue-800 mb-1">Response times</p>
                  <ul className="space-y-1 text-xs text-blue-700">
                    <li>WhatsApp — usually within the hour</li>
                    <li>Phone — immediate during business hours</li>
                    <li>Email / Form — 1–2 business days</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8"
              >
                {success ? (
                  <div className="flex flex-col items-center text-center py-10 gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">Message sent!</h3>
                      <p className="text-sm text-slate-500 max-w-xs">
                        We've received your enquiry and will get back to you within 1–2 business days. For urgent matters, please call or WhatsApp us directly.
                      </p>
                    </div>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-2 text-sm font-semibold text-[#1d6fa4] hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="text-lg font-black text-slate-900 mb-1">Send us a message</h2>
                      <p className="text-sm text-slate-400">Fields marked * are required.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          placeholder="Ahmed Khan"
                          value={form.name}
                          onChange={set("name")}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone Number *</label>
                        <input
                          type="tel"
                          placeholder="0300 1234567"
                          value={form.phone}
                          onChange={set("phone")}
                          className={inputClass}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Email Address <span className="font-normal text-slate-400">(optional)</span></label>
                      <input
                        type="email"
                        placeholder="ahmed@example.com"
                        value={form.email}
                        onChange={set("email")}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2">Subject *</label>
                      <div className="grid grid-cols-3 gap-2">
                        {SUBJECTS.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, subject: s.id }))}
                            className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 text-center transition-all duration-150 hover:scale-[1.02] active:scale-[0.97]
                              ${form.subject === s.id
                                ? "border-blue-400 bg-blue-50 shadow-sm"
                                : "border-slate-200 bg-white hover:border-blue-200"}`}
                          >
                            <span className="text-lg">{s.emoji}</span>
                            <span className={`text-[10px] font-bold leading-snug ${form.subject === s.id ? "text-blue-700" : "text-slate-600"}`}>
                              {s.id}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Message *</label>
                      <textarea
                        placeholder="Tell us how we can help..."
                        value={form.message}
                        onChange={set("message")}
                        rows={5}
                        className={`${inputClass} resize-none`}
                        required
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white transition-all hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: "#42a5f5", boxShadow: "0 8px 24px rgba(66,165,245,0.35)" }}
                    >
                      {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                      ) : (
                        "Send Message"
                      )}
                    </button>

                    <p className="text-xs text-center text-slate-400">
                      Your information is kept strictly confidential. See our{" "}
                      <Link href="/privacy-policy" className="text-[#1d6fa4] hover:underline">Privacy Policy</Link>.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>

          </div>
        </div>

      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
