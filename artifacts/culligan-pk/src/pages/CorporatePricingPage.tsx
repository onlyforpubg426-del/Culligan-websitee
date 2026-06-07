import { useEffect, useState } from "react";
import { usePageMeta } from "@/lib/usePageMeta";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;

const perks = [
  {
    icon: "📅",
    title: "Flexible Scheduling",
    desc: "Deliveries aligned to your office hours — daily, weekly, or on-demand.",
  },
  {
    icon: "💰",
    title: "Volume Pricing",
    desc: "Negotiated rates that scale down with your monthly consumption.",
  },
  {
    icon: "👤",
    title: "Dedicated Account Manager",
    desc: "One point of contact who knows your account inside out.",
  },
  {
    icon: "⚡",
    title: "Priority Delivery",
    desc: "Corporate accounts jump the queue — same-day fulfilment guaranteed.",
  },
  {
    icon: "🧾",
    title: "Monthly Invoicing",
    desc: "Clean consolidated invoices every month — no cash handling on-site.",
  },
  {
    icon: "🏢",
    title: "Multi-Site Coverage",
    desc: "One account for multiple branches, centrally managed and billed.",
  },
];

const stats = [
  { value: "200+", label: "Corporate Clients" },
  { value: "50+",  label: "Companies in Karachi" },
  { value: "24h",  label: "Response Guarantee" },
  { value: "100%", label: "Verified Culligan Quality" },
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition";

type FormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  employees: string;
  message: string;
};

const empty: FormState = { name: "", company: "", phone: "", email: "", employees: "", message: "" };

export default function CorporatePricingPage() {
  usePageMeta({
    title: "Corporate & Bulk Pricing",
    description: "Special rates for offices, restaurants, and businesses in Karachi. Get a custom Culligan water supply quote — bulk discounts and priority delivery available.",
    path: "/corporate-pricing",
  });
  const [form, setForm] = useState<FormState>(empty);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.phone.trim() || !form.company.trim()) {
      setError("Please fill in your name, company, and phone number.");
      return;
    }
    setLoading(true);
    try {
      const message = `Company: ${form.company}\nEmployees: ${form.employees || "Not specified"}\n\n${form.message}`;
      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          subject: "Corporate Pricing",
          message,
        }),
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-14">

        {/* ── Hero ── */}
        <div
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #ffffff 45%, #eef7ff 100%)" }}
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 65%)", transform: "translate(32%,-32%)" }} />
          <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full pointer-events-none opacity-25" style={{ background: "radial-gradient(circle, #cffafe 0%, transparent 65%)", transform: "translate(-25%,25%)" }} />
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "26px 26px" }} />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 z-10">
            <Link href="/">
              <motion.span
                whileHover={{ x: -3 }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-8 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </motion.span>
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", borderColor: "#bfdbfe" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-blue-600">Corporate &amp; Business Accounts</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-5">
              Hydration at{" "}
              <span className="relative inline-block">
                <span className="relative z-10" style={{ color: "#1976d2" }}>Enterprise Scale</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 rounded-full opacity-20 -z-0" style={{ background: "#2196f3" }} />
              </span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
              Tailored water delivery programs for offices, factories, hospitals, and multi-site businesses — backed by Culligan's quality and a dedicated corporate team.
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div
          className="border-y border-blue-100"
          style={{ background: "linear-gradient(90deg, #f0f9ff 0%, #ffffff 50%, #f0f9ff 100%)" }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-blue-100">
              {stats.map((s) => (
                <div key={s.label} className="py-8 px-6 text-center">
                  <p className="text-3xl font-black mb-1" style={{ color: "#1976d2" }}>{s.value}</p>
                  <p className="text-xs text-slate-500 font-medium leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-10">

          {/* ── Left: perks + contact ── */}
          <div className="md:col-span-2 flex flex-col gap-6">

            <div className="rounded-2xl border border-blue-100 p-6 overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 60%, #eff6ff 100%)" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 border text-[10px] font-extrabold tracking-widest uppercase text-blue-600" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", borderColor: "#bfdbfe" }}>
                What You Get
              </div>
              <ul className="space-y-4">
                {perks.map((p) => (
                  <li key={p.title} className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-white border border-blue-100 flex items-center justify-center text-base flex-shrink-0 shadow-sm">{p.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{p.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-blue-200 p-5" style={{ background: "linear-gradient(135deg, #dbeafe, #eff6ff)" }}>
              <p className="text-sm font-bold text-blue-900 mb-1">⚡ Quick Turnaround</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Our corporate team will prepare a customised pricing proposal within 24 hours of receiving your request.
              </p>
            </div>

            <a
              href="https://wa.me/923222584525?text=Hi%2C%20I%27m%20interested%20in%20a%20corporate%20water%20account%20for%20my%20office."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white font-bold text-sm py-3.5 rounded-2xl transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              WhatsApp for Quick Reply
            </a>
          </div>

          {/* ── Right: form ── */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-7">
            <h2 className="font-bold text-slate-900 text-xl mb-1">Request a Pricing Proposal</h2>
            <p className="text-sm text-slate-400 mb-6">
              Fill in your details and we'll send you a customised quote within 24 hours.
            </p>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-14 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-500 text-sm max-w-xs">
                  Our corporate team will prepare a proposal and reach out within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-sm font-semibold text-primary hover:text-primary/80"
                >
                  Submit another request →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Contact Name <span className="text-red-400">*</span>
                    </label>
                    <input className={inputClass} placeholder="Ahmed Khan" value={form.name} onChange={set("name")} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Company Name <span className="text-red-400">*</span>
                    </label>
                    <input className={inputClass} placeholder="ABC Corporation" value={form.company} onChange={set("company")} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <input className={inputClass} placeholder="03xx-xxxxxxx" value={form.phone} onChange={set("phone")} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Work Email <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input type="email" className={inputClass} placeholder="you@company.com" value={form.email} onChange={set("email")} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Number of Employees
                  </label>
                  <select className={inputClass} value={form.employees} onChange={set("employees")}>
                    <option value="">Select a range…</option>
                    <option>1–10</option>
                    <option>11–50</option>
                    <option>51–200</option>
                    <option>200+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Additional Requirements
                  </label>
                  <textarea
                    rows={4}
                    className={inputClass + " resize-none"}
                    placeholder="Tell us about your water consumption, number of locations, preferred delivery days, special requirements…"
                    value={form.message}
                    onChange={set("message")}
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                    : "Request Corporate Pricing →"}
                </button>

                <p className="text-center text-xs text-slate-400">
                  We'll respond within 24 hours with a tailored proposal.
                </p>
              </form>
            )}
          </div>
        </div>

      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
