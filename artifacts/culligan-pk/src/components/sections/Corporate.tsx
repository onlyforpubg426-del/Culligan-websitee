import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;

const CONTACT_SUBJECTS = [
  "General Enquiry",
  "Home Delivery",
  "Office Delivery",
  "Water Dispensers",
  "Technical Support",
  "Billing & Payments",
  "Deposit Refund",
  "Retailer / Reseller",
  "Other",
];

const perks = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    title: "Flexible Scheduling",
    desc: "Deliveries aligned to your office hours — daily, weekly, or on-demand.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75" />
      </svg>
    ),
    title: "Volume Pricing",
    desc: "Negotiated rates that scale with your monthly consumption.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: "Dedicated Account Manager",
    desc: "One point of contact who knows your account inside out.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: "Priority Delivery",
    desc: "Corporate accounts jump the queue — same-day fulfilment guaranteed.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
      </svg>
    ),
    title: "Monthly Invoicing",
    desc: "Clean consolidated invoices — no cash handling on-site.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: "Multi-Site Coverage",
    desc: "One account for multiple branches, centrally managed and billed.",
  },
];

const stats = [
  { value: "200+", label: "Corporate Clients" },
  { value: "50+", label: "Companies Served" },
  { value: "24h", label: "Response Guarantee" },
  { value: "100%", label: "Verified Quality" },
];

type Tab = "contact" | "corporate";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const emptyForm: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition";

function ContactForm({ defaultSubject = "", submitLabel = "Send Message" }: { defaultSubject?: string; submitLabel?: string }) {
  const [form, setForm] = useState<FormState>({ ...emptyForm, subject: defaultSubject });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
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
    } catch {
      setError("Something went wrong. Please try WhatsApp or phone instead.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-14 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
        <p className="text-slate-500 text-sm max-w-xs">
          We'll get back to you within 24 hours. For urgent matters, WhatsApp us directly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Send another message →
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            className={inputClass}
            placeholder="Ahmed Khan"
            value={form.name}
            onChange={set("name")}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            className={inputClass}
            placeholder="03xx-xxxxxxx"
            value={form.phone}
            onChange={set("phone")}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5">
          Email <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          type="email"
          className={inputClass}
          placeholder="you@company.com"
          value={form.email}
          onChange={set("email")}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5">
          Subject <span className="text-red-400">*</span>
        </label>
        <select className={inputClass} value={form.subject} onChange={set("subject")}>
          <option value="">Select a topic…</option>
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={4}
          className={inputClass + " resize-none"}
          placeholder="How can we help you?"
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
        className="btn-cta-primary w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : submitLabel}
      </button>
    </form>
  );
}

function CorporateForm() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", employees: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) =>
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
    } catch {
      setError("Something went wrong. Please try WhatsApp or phone instead.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-10 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Request Received!</h3>
        <p className="text-slate-500 text-sm max-w-xs">
          Our corporate team will prepare a customised pricing proposal and reach out within 24 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Submit another request →
        </button>
      </motion.div>
    );
  }

  return (
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
          <option value="">Select range…</option>
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
          rows={3}
          className={inputClass + " resize-none"}
          placeholder="Tell us about your water consumption, number of locations, preferred delivery days…"
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
        className="btn-cta-primary w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Request Corporate Pricing →"}
      </button>

      <p className="text-center text-xs text-slate-400">
        We'll respond within 24 hours with a tailored proposal.
      </p>
    </form>
  );
}

export function Corporate() {
  const [tab, setTab] = useState<Tab>("contact");

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <span className="inline-block mb-3 text-xs font-bold tracking-[0.18em] uppercase text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
            We're Here to Help
          </h2>
          <p className="max-w-xl mx-auto text-slate-500 text-base leading-relaxed">
            Got a question or ready to set up a corporate account? Reach us through the form below.
          </p>
        </motion.div>

        {/* ── Toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm gap-1">
            <button
              onClick={() => setTab("contact")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                tab === "contact"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              ✉️ Contact Us
            </button>
            <button
              onClick={() => setTab("corporate")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                tab === "corporate"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              🏢 Request Corporate Pricing
            </button>
          </div>
        </motion.div>

        {/* ── Content panels ── */}
        <AnimatePresence mode="wait">

          {/* Contact Us panel */}
          {tab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8"
            >
              {/* info sidebar */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-5">Contact Details</h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: "📞",
                        label: "Phone / WhatsApp",
                        value: "+92 322 2622226",
                        href: "tel:+923222622226",
                      },
                      {
                        icon: "✉️",
                        label: "Email",
                        value: "info@culligan.pk",
                        href: "mailto:info@culligan.pk",
                      },
                      {
                        icon: "📍",
                        label: "Office",
                        value: "Karachi, Pakistan",
                        href: null,
                      },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        <span className="text-xl mt-0.5">{item.icon}</span>
                        <div>
                          <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                          {item.href ? (
                            <a href={item.href} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm font-semibold text-slate-800">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <p className="text-sm font-semibold text-blue-800 mb-1">⚡ Quick Response</p>
                  <p className="text-xs text-blue-600 leading-relaxed">
                    We typically reply within a few hours during business hours (Mon–Sat, 9am–7pm).
                  </p>
                </div>

                <a
                  href="https://wa.me/923222584525?text=Hi%2C%20I%20have%20a%20question%20about%20Culligan%20water."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white font-bold text-sm py-3.5 rounded-2xl transition-colors shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  WhatsApp Us
                </a>
              </div>

              {/* form */}
              <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-6">Send Us a Message</h3>
                <ContactForm submitLabel="Send Message →" />
              </div>
            </motion.div>
          )}

          {/* Corporate Pricing panel */}
          {tab === "corporate" && (
            <motion.div
              key="corporate"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8"
            >
              {/* perks sidebar */}
              <div className="lg:col-span-2 flex flex-col gap-5">

                {/* stats */}
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 text-center shadow-sm">
                      <p className="text-2xl font-black text-blue-600 mb-0.5">{s.value}</p>
                      <p className="text-xs text-slate-500 font-medium leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* perks list */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-sm mb-4 uppercase tracking-wide">What You Get</h3>
                  <ul className="space-y-3.5">
                    {perks.map((p) => (
                      <li key={p.title} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                          {p.icon}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 leading-tight">{p.title}</p>
                          <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{p.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* corporate form */}
              <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-1">Request a Pricing Proposal</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Fill in your details and our corporate team will get back within 24 hours.
                </p>
                <CorporateForm />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
