import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, CalendarDays, Repeat2, Truck, Phone,
  MapPin, User, Droplets, ChevronRight, Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;

const BUNDLES = [
  { id: "Hydration Bundle", label: "Hydration Bundle", contents: "60 × 500ml", price: "Rs 2,250", badge: "Most Ordered" },
  { id: "Family Bundle",    label: "Family Bundle",    contents: "36 × 500ml + 12 × 1.5L", price: "Rs 2,240", badge: "" },
  { id: "Purity Bundle",    label: "Purity Bundle",    contents: "30 × 1.5L",              price: "Rs 2,225", badge: "" },
  { id: "Bachat Bundle",    label: "Bachat Bundle",    contents: "12 × 6L",                price: "Rs 2,580", badge: "" },
  { id: "19L Gallon",       label: "19L Gallon",       contents: "3+ gallons",             price: "Rs 380/ea", badge: "" },
  { id: "Custom Order",     label: "Custom Order",     contents: "Any combination",        price: "As quoted", badge: "" },
];

const FREQUENCIES = [
  { id: "weekly",   label: "Weekly",      sub: "Every 7 days",  icon: Repeat2 },
  { id: "biweekly", label: "Bi-weekly",   sub: "Every 14 days", icon: Repeat2 },
  { id: "monthly",  label: "Monthly",     sub: "Every 30 days", icon: CalendarDays },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type Step = "bundle" | "schedule" | "details" | "done";

interface FormState {
  bundle: string;
  frequency: string;
  deliveryDay: string;
  name: string;
  phone: string;
  address: string;
  notes: string;
}

const EMPTY: FormState = {
  bundle: "", frequency: "", deliveryDay: "",
  name: "", phone: "", address: "", notes: "",
};

export function Subscription() {
  const [step, setStep] = useState<Step>("bundle");
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormState, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const PK_PHONE = /^(\+92|0)3[0-9]{9}$/;

  const validatePhone = (raw: string) =>
    PK_PHONE.test(raw.replace(/[\s\-]/g, ""));

  const waMessage = () =>
    encodeURIComponent(
      `Hi! I just set up a ${form.frequency} subscription for ${form.bundle} (${form.deliveryDay}s).\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}${form.notes ? `\nNotes: ${form.notes}` : ""}\n\nPlease confirm my first delivery. Thank you!`
    );

  const submit = async () => {
    if (!validatePhone(form.phone)) {
      setError("Enter a valid Pakistani mobile number (e.g. 0300 1234567)");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          bundle: form.bundle,
          frequency: form.frequency,
          deliveryDay: form.deliveryDay,
          notes: form.notes || undefined,
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setStep("done");
      window.open(`https://wa.me/923222584525?text=${waMessage()}`, "_blank");
    } catch {
      setError("Something went wrong. Please try again or call 111 35 35 35.");
    } finally {
      setLoading(false);
    }
  };

  const stepIndex: Record<Step, number> = { bundle: 0, schedule: 1, details: 2, done: 3 };
  const progress = stepIndex[step];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white" id="subscribe">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            <Repeat2 className="w-3.5 h-3.5" /> Never Run Out
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
            Set Up a Standing Order
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Subscribe to regular deliveries — same bundle, same day, every time. No calls needed.
          </p>
        </div>

        {/* Benefits strip */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: Truck,        label: "Free Delivery",    sub: "On all subscriptions" },
            { icon: Repeat2,      label: "Auto-scheduled",   sub: "We call to confirm" },
            { icon: CheckCircle2, label: "Cancel anytime",   sub: "No lock-in contract" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="bg-white rounded-2xl border border-blue-100 p-4 text-center shadow-sm">
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-2">
                <Icon className="w-4.5 h-4.5 text-blue-600 w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-800">{label}</p>
              <p className="text-xs text-slate-500">{sub}</p>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">

          {/* Progress bar */}
          {step !== "done" && (
            <div className="px-8 pt-6">
              <div className="flex items-center gap-2 mb-1">
                {(["bundle", "schedule", "details"] as Step[]).map((s, i) => (
                  <div key={s} className="flex items-center gap-2 flex-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      i < progress ? "bg-blue-600 text-white"
                      : i === progress ? "bg-blue-600 text-white ring-4 ring-blue-100"
                      : "bg-slate-100 text-slate-400"
                    }`}>
                      {i < progress ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>
                    {i < 2 && (
                      <div className={`h-0.5 flex-1 rounded-full transition-colors ${i < progress ? "bg-blue-600" : "bg-slate-100"}`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1 mb-6">
                <span className={progress >= 0 ? "text-blue-600 font-semibold" : ""}>Bundle</span>
                <span className={progress >= 1 ? "text-blue-600 font-semibold" : ""}>Schedule</span>
                <span className={progress >= 2 ? "text-blue-600 font-semibold" : ""}>Details</span>
              </div>
            </div>
          )}

          <div className="px-8 pb-8">
            <AnimatePresence mode="wait">

              {/* Step 1: Bundle */}
              {step === "bundle" && (
                <motion.div key="bundle"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" /> Which bundle do you want delivered?
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {BUNDLES.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => { set("bundle", b.id); }}
                        className={`text-left p-4 rounded-2xl border-2 transition-all ${
                          form.bundle === b.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-200 hover:border-blue-200 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900 text-sm">{b.label}</span>
                          {b.badge && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{b.badge}</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{b.contents}</p>
                        <p className="text-sm font-bold text-blue-600 mt-1">{b.price}</p>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button
                      disabled={!form.bundle}
                      onClick={() => setStep("schedule")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl"
                    >
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Schedule */}
              {step === "schedule" && (
                <motion.div key="schedule"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-blue-600" /> How often would you like delivery?
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-3 mb-6">
                    {FREQUENCIES.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => set("frequency", f.id)}
                        className={`text-left p-4 rounded-2xl border-2 transition-all ${
                          form.frequency === f.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-200 hover:border-blue-200 bg-white"
                        }`}
                      >
                        <p className="font-bold text-slate-900 text-sm">{f.label}</p>
                        <p className="text-xs text-slate-500">{f.sub}</p>
                      </button>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-blue-600" /> Preferred delivery day?
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {DAYS.map((d) => (
                      <button
                        key={d}
                        onClick={() => set("deliveryDay", d)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                          form.deliveryDay === d
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-200 hover:border-blue-200 text-slate-600"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 justify-between">
                    <Button variant="outline" onClick={() => setStep("bundle")} className="rounded-xl">
                      Back
                    </Button>
                    <Button
                      disabled={!form.frequency || !form.deliveryDay}
                      onClick={() => setStep("details")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl"
                    >
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Details */}
              {step === "details" && (
                <motion.div key="details"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" /> Your delivery details
                  </h3>

                  {/* Summary pill */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5 flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-1.5 text-blue-700 font-semibold">
                      <Package className="w-4 h-4" /> {form.bundle}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="flex items-center gap-1.5 text-blue-700 font-semibold capitalize">
                      <Repeat2 className="w-4 h-4" /> {form.frequency}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="flex items-center gap-1.5 text-blue-700 font-semibold">
                      <CalendarDays className="w-4 h-4" /> {form.deliveryDay}s
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        <User className="inline w-3.5 h-3.5 mr-1" /> Full Name *
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Your name"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        <Phone className="inline w-3.5 h-3.5 mr-1" /> Mobile Number *
                      </label>
                      <input
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="03xx-xxxxxxx"
                        type="tel"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        <MapPin className="inline w-3.5 h-3.5 mr-1" /> Delivery Address *
                      </label>
                      <textarea
                        value={form.address}
                        onChange={(e) => set("address", e.target.value)}
                        placeholder="House/flat number, street, area, Karachi"
                        rows={2}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Special Instructions <span className="font-normal text-slate-400">(optional)</span>
                      </label>
                      <input
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        placeholder="Gate code, leave with security, etc."
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
                  )}

                  <div className="flex gap-3 justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep("schedule")} className="rounded-xl">
                      Back
                    </Button>
                    <Button
                      disabled={!form.name || !form.phone || !form.address || loading}
                      onClick={submit}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl"
                    >
                      {loading ? "Submitting…" : "Set Up Subscription"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Done */}
              {step === "done" && (
                <motion.div key="done"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">You're subscribed!</h3>
                  <p className="text-slate-500 mb-1">
                    WhatsApp should have opened to confirm your first <strong>{form.deliveryDay}</strong> delivery — if not, tap below.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 text-sm font-semibold text-blue-700 mt-2 mb-6">
                    <Droplets className="w-4 h-4" />
                    {form.bundle} · {form.frequency}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/923222584525?text=${waMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                    >
                      💬 Re-open WhatsApp
                    </a>
                    <button
                      onClick={() => { setForm(EMPTY); setStep("bundle"); }}
                      className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                    >
                      Add Another
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
