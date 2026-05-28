import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, CheckCircle2, Send, PhoneCall, Mail,
  Home, Building2, Zap, HelpCircle, ChevronRight, ChevronLeft,
  Truck, Package, Droplets, Star, Sparkles, Users,
  MapPin, User, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;

/* ═══════════════════════════════════════════════════════════════
   SHARED DATA
═══════════════════════════════════════════════════════════════ */

const USE_CASES = [
  {
    id: "home",
    icon: Home,
    label: "Home / Family",
    sub: "Pure water for my household",
    color: "blue",
    recommended: ["Family Bundle", "Bachat Bundle", "Hydration Bundle"],
  },
  {
    id: "office",
    icon: Building2,
    label: "Office / Corporate",
    sub: "Hydration for my team",
    color: "violet",
    recommended: ["Hydration Bundle", "Custom Order", "Family Bundle"],
  },
  {
    id: "onetime",
    icon: Zap,
    label: "One-time Delivery",
    sub: "Just need a quick drop-off",
    color: "emerald",
    recommended: ["Bachat Bundle", "Family Bundle"],
  },
  {
    id: "unsure",
    icon: HelpCircle,
    label: "Not Sure Yet",
    sub: "Help me pick the right bundle",
    color: "amber",
    recommended: ["Bachat Bundle", "Family Bundle"],
  },
] as const;

type UseCase = (typeof USE_CASES)[number]["id"];

const BUNDLES = [
  {
    id: "Bachat Bundle",
    emoji: "💰",
    label: "Bachat Bundle",
    tagline: "Best value for everyday use",
    contents: "3 × 19L refills",
    price: "Rs 1,140",
    badge: "Economy",
    badgeColor: "bg-emerald-100 text-emerald-700",
    highlight: false,
  },
  {
    id: "Family Bundle",
    emoji: "👨‍👩‍👧‍👦",
    label: "Family Bundle",
    tagline: "Most popular for homes",
    contents: "5 × 19L refills",
    price: "Rs 1,900",
    badge: "Most Popular",
    badgeColor: "bg-blue-100 text-blue-700",
    highlight: true,
  },
  {
    id: "Hydration Bundle",
    emoji: "💧",
    label: "Hydration Bundle",
    tagline: "For large families & offices",
    contents: "8 × 19L refills",
    price: "Rs 3,040",
    badge: "Best for Offices",
    badgeColor: "bg-violet-100 text-violet-700",
    highlight: false,
  },
  {
    id: "Freshness Bundle",
    emoji: "✨",
    label: "Freshness Bundle",
    tagline: "Mixed sizes for variety",
    contents: "19L + assorted sizes",
    price: "Get a quote",
    badge: null,
    badgeColor: "",
    highlight: false,
  },
  {
    id: "Purity Bundle",
    emoji: "🏆",
    label: "Purity Bundle",
    tagline: "Premium certified pack",
    contents: "Selection of certified bottles",
    price: "Get a quote",
    badge: "Premium",
    badgeColor: "bg-amber-100 text-amber-700",
    highlight: false,
  },
  {
    id: "Picnic Bundle",
    emoji: "🧳",
    label: "Picnic Bundle",
    tagline: "Portable on-the-go sizes",
    contents: "1.5L + 6L bottles",
    price: "Get a quote",
    badge: null,
    badgeColor: "",
    highlight: false,
  },
  {
    id: "Custom Order",
    emoji: "🛠️",
    label: "Custom Order",
    tagline: "Tell us exactly what you need",
    contents: "Any combination",
    price: "As quoted",
    badge: null,
    badgeColor: "",
    highlight: false,
  },
];

const SHIPPING = [
  { id: "delivery", icon: Truck, label: "Home / Office Delivery", sub: "Free delivery across Karachi" },
  { id: "dha", icon: MapPin, label: "Pickup — DHA Water Shop", sub: "Ready same day" },
  { id: "society", icon: MapPin, label: "Pickup — Society Water Shop", sub: "Ready same day" },
];

/* ═══════════════════════════════════════════════════════════════
   ORDER WIZARD
═══════════════════════════════════════════════════════════════ */

const colorMap: Record<string, { border: string; bg: string; icon: string; dot: string }> = {
  blue:    { border: "border-blue-400",   bg: "bg-blue-50",   icon: "text-blue-500",   dot: "bg-blue-500" },
  violet:  { border: "border-violet-400", bg: "bg-violet-50", icon: "text-violet-500", dot: "bg-violet-500" },
  emerald: { border: "border-emerald-400",bg: "bg-emerald-50",icon: "text-emerald-500",dot: "bg-emerald-500" },
  amber:   { border: "border-amber-400",  bg: "bg-amber-50",  icon: "text-amber-500",  dot: "bg-amber-500" },
};

function ProgressBar({ step }: { step: 1 | 2 | 3 }) {
  const steps = ["Use Case", "Bundle", "Your Details"];
  return (
    <div className="px-8 pt-7 pb-5">
      <div className="flex items-center gap-0">
        {steps.map((label, i) => {
          const idx = i + 1;
          const done = step > idx;
          const active = step === idx;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                  ${done ? "bg-blue-500 text-white" : active ? "bg-blue-500 text-white shadow-lg shadow-blue-200" : "bg-slate-100 text-slate-400"}`}>
                  {done ? <CheckCircle2 className="h-4 w-4" /> : idx}
                </div>
                <span className={`text-[10px] font-semibold whitespace-nowrap ${active ? "text-blue-600" : done ? "text-slate-500" : "text-slate-300"}`}>
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-2 mb-4 transition-all duration-500 ${done ? "bg-blue-400" : "bg-slate-200"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [useCase, setUseCase] = useState<UseCase | null>(null);
  const [bundle, setBundle] = useState<string | null>(null);
  const [shipping, setShipping] = useState<string>("delivery");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const selectedCase = USE_CASES.find((u) => u.id === useCase);
  const isRecommended = (id: string) => selectedCase?.recommended.includes(id as never) ?? false;

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!mobile.trim() || mobile.trim().length < 10) e.mobile = "Please enter a valid mobile number";
    if (shipping === "delivery" && !address.trim()) e.address = "Please enter your delivery address";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmitting(true);

    const shippingLabel =
      shipping === "delivery"
        ? "Free Delivery at My Door Step (Karachi Only)"
        : shipping === "dha"
        ? "I Will Pick it Up from Your Water Shop (DHA)"
        : "I Will Pick it Up from Your Water Shop (Water Shop Society)";

    const data = {
      name,
      mobile,
      address: address || "Pickup",
      daytimePhone: mobile,
      bundle: bundle ?? "Custom Order",
      paymentMethod: "Cash on Delivery",
      shippingMethod: shippingLabel,
      notes,
    };

    try {
      await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch { /* silent */ }

    setSubmitting(false);
    setDone(true);

    const lines = [
      "Hi, I'd like to place a Culligan water order! 🚿",
      "",
      `📦 Bundle: ${bundle ?? "Custom Order"}`,
      `🚚 Delivery: ${shippingLabel}`,
      shipping === "delivery" ? `📍 Address: ${address}` : "",
      "",
      `👤 Name: ${name}`,
      `📞 Mobile: ${mobile}`,
      notes ? `📝 Notes: ${notes}` : "",
      "",
      "Please confirm availability and delivery schedule. Thank you!",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/923222584525?text=${encodeURIComponent(lines)}`, "_blank");
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-12 text-center"
      >
        <div className="w-20 h-20 rounded-3xl bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Order Sent!</h3>
        <p className="text-slate-500 mb-7 text-sm max-w-xs mx-auto">
          WhatsApp should have opened with your order details. Our team will confirm shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" className="rounded-xl" onClick={() => {
            setDone(false); setStep(1); setUseCase(null); setBundle(null);
            setName(""); setMobile(""); setAddress(""); setNotes("");
          }}>
            Place Another Order
          </Button>
          <Button
            className="rounded-xl bg-green-600 hover:bg-green-700 text-white gap-2"
            onClick={() => {
              const msg = `Hi, I'd like to confirm my Culligan order.\n\nName: ${name}\nBundle: ${bundle}\nMobile: ${mobile}`;
              window.open(`https://wa.me/923222584525?text=${encodeURIComponent(msg)}`, "_blank");
            }}
          >
            <MessageCircle className="h-4 w-4" />
            Re-open WhatsApp
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <ProgressBar step={step} />

      <div className="px-8 pb-8">
        <AnimatePresence mode="wait">

          {/* ── STEP 1: Use Case ── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }}>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Who are you ordering for?</h3>
              <p className="text-sm text-slate-400 mb-5">We'll recommend the best bundle for you.</p>
              <div className="grid grid-cols-2 gap-3">
                {USE_CASES.map((uc) => {
                  const c = colorMap[uc.color];
                  const selected = useCase === uc.id;
                  const Icon = uc.icon;
                  return (
                    <button
                      key={uc.id}
                      onClick={() => { setUseCase(uc.id); setTimeout(() => setStep(2), 180); }}
                      className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                        ${selected ? `${c.border} ${c.bg}` : "border-slate-200 bg-white hover:border-slate-300"}`}
                    >
                      {selected && (
                        <div className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full ${c.dot}`} />
                      )}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${selected ? c.bg : "bg-slate-50"}`}>
                        <Icon className={`h-5 w-5 ${selected ? c.icon : "text-slate-400"}`} />
                      </div>
                      <p className={`font-bold text-sm ${selected ? "text-slate-900" : "text-slate-700"}`}>{uc.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-snug">{uc.sub}</p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Bundle ── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }}>
              <button onClick={() => setStep(1)} className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-4 transition-colors">
                <ChevronLeft className="h-3.5 w-3.5" /> Back
              </button>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Choose your bundle</h3>
              <p className="text-sm text-slate-400 mb-5">
                {selectedCase ? `Recommended for ${selectedCase.label.toLowerCase()}` : "Pick what suits you best"}
              </p>
              <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1 -mr-1">
                {BUNDLES.map((b) => {
                  const rec = isRecommended(b.id);
                  const sel = bundle === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setBundle(b.id)}
                      className={`w-full flex items-center gap-4 p-3.5 rounded-2xl border-2 text-left transition-all duration-200
                        ${sel ? "border-blue-400 bg-blue-50" : rec ? "border-blue-200 bg-blue-50/40 hover:border-blue-300" : "border-slate-200 bg-white hover:border-slate-300"}`}
                    >
                      <span className="text-2xl shrink-0">{b.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-bold text-sm ${sel ? "text-blue-900" : "text-slate-800"}`}>{b.label}</span>
                          {b.badge && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${b.badgeColor}`}>{b.badge}</span>
                          )}
                          {rec && !b.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 flex items-center gap-0.5">
                              <Star className="h-2.5 w-2.5" /> For you
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{b.contents} · {b.tagline}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className={`text-sm font-black ${sel ? "text-blue-600" : "text-slate-700"}`}>{b.price}</span>
                      </div>
                      {sel && (
                        <div className="shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <Button
                onClick={() => setStep(3)}
                disabled={!bundle}
                className="w-full mt-5 rounded-xl h-11 font-bold bg-blue-600 hover:bg-blue-700 text-white gap-2 disabled:opacity-40"
              >
                Continue <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* ── STEP 3: Details ── */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }}>
              <button onClick={() => setStep(2)} className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-4 transition-colors">
                <ChevronLeft className="h-3.5 w-3.5" /> Back
              </button>

              {/* Summary pill */}
              <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-blue-50 border border-blue-100">
                <Package className="h-4 w-4 text-blue-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-blue-500 font-semibold">Your selection</p>
                  <p className="text-sm font-bold text-blue-900">{bundle}</p>
                </div>
                <button onClick={() => setStep(2)} className="text-xs text-blue-500 hover:underline font-medium">Change</button>
              </div>

              {/* Delivery method */}
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Delivery Method</p>
              <div className="space-y-2 mb-5">
                {SHIPPING.map((s) => {
                  const sel = shipping === s.id;
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setShipping(s.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all
                        ${sel ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${sel ? "text-blue-500" : "text-slate-400"}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold ${sel ? "text-blue-900" : "text-slate-700"}`}>{s.label}</p>
                        <p className="text-xs text-slate-400">{s.sub}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${sel ? "border-blue-500" : "border-slate-300"}`}>
                        {sel && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">Your details</h3>
              <p className="text-sm text-slate-400 mb-4">Just the essentials — we'll handle the rest.</p>

              <div className="space-y-3.5">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    <User className="h-3 w-3" /> Full Name <span className="text-red-400 font-normal normal-case tracking-normal">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((v) => ({ ...v, name: "" })); }}
                    placeholder="e.g. Ahmed Khan"
                    autoComplete="name"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition
                      ${errors.name ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"}`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    <Phone className="h-3 w-3" /> Mobile Number <span className="text-red-400 font-normal normal-case tracking-normal">*</span>
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => { setMobile(e.target.value); setErrors((v) => ({ ...v, mobile: "" })); }}
                    placeholder="e.g. 0300 1234567"
                    autoComplete="tel"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition
                      ${errors.mobile ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"}`}
                  />
                  {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
                </div>

                {shipping === "delivery" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      <MapPin className="h-3 w-3" /> Delivery Address <span className="text-red-400 font-normal normal-case tracking-normal">*</span>
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => { setAddress(e.target.value); setErrors((v) => ({ ...v, address: "" })); }}
                      placeholder="House 42, Block 6, PECHS, Karachi"
                      rows={2}
                      autoComplete="street-address"
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none
                        ${errors.address ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"}`}
                    />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </motion.div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                    Special Instructions <span className="font-normal normal-case tracking-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Call before delivery, gate code 1234…"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Payment</span>
                  <span className="font-semibold text-slate-700">Cash on Delivery</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Delivery</span>
                  <span className="text-emerald-600 font-bold text-sm">Free</span>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full mt-5 rounded-xl h-12 font-bold text-[15px] bg-green-600 hover:bg-green-700 text-white gap-2.5 shadow-lg shadow-green-500/20 transition-all disabled:opacity-60"
              >
                <MessageCircle className="h-5 w-5" />
                {submitting ? "Saving order…" : "Confirm Order via WhatsApp"}
              </Button>
              <p className="text-center text-xs text-slate-400 mt-2">
                Opens WhatsApp with your details pre-filled. No account needed.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ENQUIRY QUIZ
═══════════════════════════════════════════════════════════════ */

const TOPICS = [
  { id: "home-delivery", emoji: "🚿", label: "Home Delivery", msg: "Hi! I'm interested in setting up a home water delivery plan for my family." },
  { id: "office",        emoji: "🏢", label: "Office Supply",  msg: "Hi! I'd like to enquire about office/corporate water supply for my team." },
  { id: "dispenser",     emoji: "🤍", label: "Water Dispenser", msg: "Hi! I'm interested in Culligan water dispensers — can you share options and pricing?" },
  { id: "bulk",          emoji: "📦", label: "Bulk / Wholesale", msg: "Hi! I'm interested in bulk or wholesale water orders for commercial use." },
  { id: "track",         emoji: "📋", label: "Track / Update Order", msg: "Hi! I'd like to check on an existing order or update my delivery schedule." },
  { id: "general",       emoji: "💬", label: "General Question", msg: "Hi! I have a general enquiry about Culligan Pakistan." },
];

function EnquiryQuiz() {
  const [topic, setTopic] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedTopic = TOPICS.find((t) => t.id === topic);

  function selectTopic(t: typeof TOPICS[number]) {
    setTopic(t.id);
    setMessage(t.msg);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!phone.trim() || phone.trim().length < 10) e.phone = "Please enter a valid phone number";
    if (!topic) e.topic = "Please select a topic";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, interest: selectedTopic?.label ?? topic, message }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-12 text-center">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="h-10 w-10 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Enquiry Sent!</h3>
        <p className="text-slate-500 mb-7 text-sm max-w-xs mx-auto">
          Our team will get back to you within one business day. For urgent matters, please call or WhatsApp directly.
        </p>
        <Button variant="outline" className="rounded-xl" onClick={() => {
          setDone(false); setTopic(null); setName(""); setPhone(""); setMessage("");
        }}>
          Send Another Enquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Topic chips */}
      <div>
        <p className="text-xl font-bold text-slate-900 mb-1">What can we help with?</p>
        <p className="text-sm text-slate-400 mb-4">Pick a topic and we'll tailor our response.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              onClick={() => selectTopic(t)}
              className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl border-2 text-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                ${topic === t.id ? "border-blue-400 bg-blue-50 shadow-sm" : "border-slate-200 bg-white hover:border-blue-200"}`}
            >
              <span className="text-2xl">{t.emoji}</span>
              <span className={`text-xs font-bold leading-snug ${topic === t.id ? "text-blue-700" : "text-slate-600"}`}>{t.label}</span>
            </button>
          ))}
        </div>
        {errors.topic && <p className="text-xs text-red-500 mt-2">{errors.topic}</p>}
      </div>

      <AnimatePresence>
        {topic && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3.5"
          >
            {/* Auto-filled message preview */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                Your Message <span className="font-normal normal-case tracking-normal text-slate-400">(edit as needed)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-blue-200 bg-blue-50/50 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  <User className="h-3 w-3" /> Full Name <span className="text-red-400 font-normal normal-case tracking-normal">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((v) => ({ ...v, name: "" })); }}
                  placeholder="Ahmed Khan"
                  autoComplete="name"
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition
                    ${errors.name ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"}`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  <Phone className="h-3 w-3" /> Phone Number <span className="text-red-400 font-normal normal-case tracking-normal">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setErrors((v) => ({ ...v, phone: "" })); }}
                  placeholder="0300 1234567"
                  autoComplete="tel"
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition
                    ${errors.phone ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"}`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
            )}

            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full rounded-xl h-11 font-bold gap-2 disabled:opacity-60"
              style={{ background: "#1d6fa4" }}
            >
              <Send className="h-4 w-4" />
              {submitting ? "Sending…" : "Send Enquiry"}
            </Button>
            <p className="text-center text-xs text-slate-400">We'll never share your details. Reply within 1 business day.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════════════════ */

type Tab = "order" | "enquiry";

export function OrderAndEnquiry() {
  const [tab, setTab] = useState<Tab>("order");

  return (
    <section
      id="order"
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f0f7ff 0%, #e6f2ff 60%, #dceeff 100%)" }}
    >
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] rounded-full bg-sky-200/20 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-semibold tracking-widest uppercase"
            >
              Order &amp; Enquiry
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-4xl font-bold text-slate-900"
            >
              Get Pure Water Today
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-3 text-slate-500 text-sm"
            >
              Order in 3 quick steps or send us a question — takes under a minute.
            </motion.p>
          </div>

          {/* Tab switcher */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 p-1.5 mb-4 shadow-sm"
          >
            {([
              { id: "order",   icon: Droplets,   label: "Place an Order"  },
              { id: "enquiry", icon: Sparkles,    label: "Send an Enquiry" },
            ] as const).map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
                  ${tab === id ? "bg-white shadow-md text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-white/80 shadow-2xl shadow-blue-100/60"
          >
            <AnimatePresence mode="wait">
              {tab === "order" ? (
                <motion.div key="order" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                  <OrderWizard />
                </motion.div>
              ) : (
                <motion.div key="enquiry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                  <EnquiryQuiz />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer CTA */}
            <div className="px-8 py-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/60">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <PhoneCall className="h-4 w-4 text-primary shrink-0" />
                <span>Prefer to call? <a href="tel:111353535" className="text-primary font-semibold hover:underline">UAN: 111 35 35 35</a></span>
              </div>
              <a
                href="mailto:info@culligan.com.pk"
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@culligan.com.pk
              </a>
            </div>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400 flex-wrap"
          >
            {[
              { icon: Truck,       label: "Free delivery in Karachi"    },
              { icon: Users,       label: "10,000+ happy families"      },
              { icon: CheckCircle2,label: "Govt. certified pure water"  },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-blue-400" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
