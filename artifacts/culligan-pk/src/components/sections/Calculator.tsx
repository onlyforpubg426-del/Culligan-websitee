import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, Droplets, Users, Package, ArrowRight, CheckCircle2, CalendarDays } from "lucide-react";
import { Slider } from "@/components/ui/slider";

/* ─── Constants ─────────────────────────────────────────── */
const LITERS_PER_GLASS = 0.25;
const DAYS_PER_MONTH   = 30;
const CASH_PRICE       = 380;
const COUPON_PRICE     = 370;
const COUPONS_PER_BOOK = 11;

const BOTTLE_PLANS = [
  { liters: 19, label: "19L Gallon", price: 380, badge: "Best Value",   badgeColor: "bg-blue-600"   },
  { liters: 12, label: "12L Bottle", price: 275, badge: "Home Size",    badgeColor: "bg-sky-600"    },
  { liters: 6,  label: "6L Bottle",  price: 235, badge: "Compact",      badgeColor: "bg-emerald-600"},
];

/* ─── Mini SVG bottle ────────────────────────────────────── */
function Bottle({ filled, idx }: { filled: boolean; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.03, duration: 0.2 }}
      className="flex flex-col items-center"
    >
      {/* cap */}
      <div
        className={`w-[10px] h-[6px] rounded-sm transition-colors duration-300 ${
          filled ? "bg-blue-500" : "bg-slate-200"
        }`}
      />
      {/* body */}
      <div
        className={`relative w-[18px] h-[32px] rounded-b-xl rounded-t-sm border transition-colors duration-300 overflow-hidden ${
          filled
            ? "border-blue-300 bg-blue-50"
            : "border-slate-200 bg-slate-100/60"
        }`}
      >
        {filled && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "70%" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.03 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500/80 to-blue-400/60"
          />
        )}
        {/* shine */}
        {filled && (
          <div className="absolute top-1 left-1 w-[3px] h-[8px] bg-white/40 rounded-full" />
        )}
      </div>
    </motion.div>
  );
}

/* ─── Hydration gauge ────────────────────────────────────── */
function HydrationGauge({ glasses }: { glasses: number }) {
  const recommended = 8;
  const pct = Math.min((glasses / recommended) * 100, 100);
  const label =
    glasses < 6  ? { text: "Low",      color: "text-amber-600",  bar: "from-amber-400 to-amber-500"  } :
    glasses < 8  ? { text: "Good",     color: "text-blue-600",   bar: "from-blue-400 to-blue-500"    } :
                   { text: "Optimal",  color: "text-emerald-600",bar: "from-emerald-400 to-emerald-500"};

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-slate-500">Daily hydration level</span>
        <span className={label.color}>{label.text}</span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${label.bar}`}
        />
      </div>
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>0 glasses</span>
        <span>{recommended}+ recommended</span>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export function Calculator() {
  const [tab,             setTab]             = useState<"needs" | "savings">("needs");
  const [people,          setPeople]          = useState(4);
  const [glassesPerPerson,setGlassesPerPerson] = useState(8);
  const [bottlesPerMonth, setBottlesPerMonth] = useState(6);

  /* Water-needs calculations */
  const dailyLiters         = people * glassesPerPerson * LITERS_PER_GLASS;
  const monthlyLiters       = dailyLiters * DAYS_PER_MONTH;
  const bottlesNeeded19L    = Math.ceil(monthlyLiters / 19);
  const bottlesNeeded12L    = Math.ceil(monthlyLiters / 12);
  const monthlyCost19L      = bottlesNeeded19L * 380;
  const recommended         = BOTTLE_PLANS[0];
  const MAX_VISUAL_BOTTLES  = 20;
  const displayBottles      = Math.min(bottlesNeeded19L, MAX_VISUAL_BOTTLES);

  /* Savings calculations */
  const couponBooksNeeded   = Math.ceil(bottlesPerMonth / COUPONS_PER_BOOK);
  const regularCost         = bottlesPerMonth * CASH_PRICE;
  const withCouponsCost     = bottlesPerMonth * COUPON_PRICE;
  const monthlySaving       = regularCost - withCouponsCost;
  const annualSaving        = monthlySaving * 12;

  return (
    <section id="calculator" className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-2"
            style={{ color: "#1d6fa4" }}
          >
            Smart Water Planning
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          >
            Find Your Perfect Water Plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mt-3 text-base text-slate-500 max-w-lg mx-auto leading-relaxed"
          >
            Calculate how much water your household needs — and see exactly how much you can save.
          </motion.p>
        </div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center p-1.5 rounded-2xl shadow-card border border-slate-100 bg-slate-50 gap-1">
            {(["needs", "savings"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 touch-manipulation ${
                  tab === t
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="calc-tab"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "linear-gradient(135deg,#2196f3,#42a5f5)" }}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {t === "needs" ? <Droplets className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {t === "needs" ? "Water Needs Guide" : "Coupon Savings"}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── Water Needs Tab ── */}
          {tab === "needs" && (
            <motion.div
              key="needs"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid lg:grid-cols-2 gap-6">

                {/* Left: inputs */}
                <div className="shadow-card rounded-3xl border border-slate-100 bg-white p-7 space-y-8">

                  {/* People selector */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-bold text-slate-800">Household Size</span>
                      </div>
                      <span className="text-2xl font-black text-blue-600">{people}</span>
                    </div>

                    {/* Person bubbles */}
                    <div className="flex gap-2 flex-wrap">
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <button
                          key={n}
                          onClick={() => setPeople(n)}
                          className={`w-11 h-11 rounded-xl font-bold text-sm transition-all duration-200 touch-manipulation
                            ${n <= people
                              ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(33,150,243,0.35)]"
                              : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                            }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 font-medium">
                      Tap to select number of people
                    </p>
                  </div>

                  {/* Glasses per person */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center">
                          <Droplets className="w-4 h-4 text-sky-600" />
                        </div>
                        <span className="text-sm font-bold text-slate-800">Glasses / person / day</span>
                      </div>
                      <span className="text-2xl font-black text-sky-600">{glassesPerPerson}</span>
                    </div>
                    <Slider
                      min={4}
                      max={12}
                      step={1}
                      value={[glassesPerPerson]}
                      onValueChange={([v]) => setGlassesPerPerson(v)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                      <span>4 (minimum)</span>
                      <span>12 (active)</span>
                    </div>

                    {/* Hydration gauge */}
                    <div className="mt-5">
                      <HydrationGauge glasses={glassesPerPerson} />
                    </div>
                  </div>

                  {/* Summary numbers */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                    {[
                      { label: "Daily need",   value: `${dailyLiters.toFixed(1)}L`,    Icon: Droplets,     color: "text-sky-600",  bg: "bg-sky-50"  },
                      { label: "Monthly need", value: `${monthlyLiters.toFixed(0)}L`,   Icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-50" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl bg-slate-50 border border-slate-100 p-4 text-center">
                        <div className={`w-8 h-8 rounded-xl ${s.bg} flex items-center justify-center mx-auto mb-2`}>
                          <s.Icon className={`w-4 h-4 ${s.color}`} />
                        </div>
                        <div className="text-xl font-black text-slate-900">{s.value}</div>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: visual output */}
                <div className="flex flex-col gap-4">

                  {/* Bottle visualizer */}
                  <div className="shadow-card rounded-3xl border border-blue-100/60 bg-gradient-to-br from-blue-50/60 to-sky-50/40 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-bold text-slate-700">Monthly 19L bottles needed</p>
                      <motion.span
                        key={bottlesNeeded19L}
                        initial={{ scale: 1.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-3xl font-black text-blue-600"
                      >
                        {bottlesNeeded19L}
                      </motion.span>
                    </div>

                    {/* Bottle grid */}
                    <div className="flex flex-wrap gap-2 py-2 min-h-[80px] items-end">
                      <AnimatePresence mode="popLayout">
                        {Array.from({ length: MAX_VISUAL_BOTTLES }, (_, i) => (
                          <Bottle key={i} filled={i < displayBottles} idx={i} />
                        ))}
                      </AnimatePresence>
                    </div>

                    {bottlesNeeded19L > MAX_VISUAL_BOTTLES && (
                      <p className="text-xs text-blue-500 font-semibold mt-2 text-center">
                        + {bottlesNeeded19L - MAX_VISUAL_BOTTLES} more bottles
                      </p>
                    )}

                    <p className="text-[11px] text-slate-400 font-medium mt-3 text-center">
                      Each bottle = 19 litres · Shown for {people} {people === 1 ? "person" : "people"}
                    </p>
                  </div>

                  {/* Recommendation card */}
                  <div className="shadow-card-blue rounded-3xl border border-blue-200/50 bg-white p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Package className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-bold text-slate-800">Your recommended plan</p>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          label: `${bottlesNeeded19L}× 19L Gallons`,
                          sub:   "Most economical · Standard dispensers",
                          price: `Rs ${monthlyCost19L.toLocaleString()}/mo`,
                          highlight: true,
                        },
                        {
                          label: `${bottlesNeeded12L}× 12L Bottles`,
                          sub:   "Fridge-friendly size",
                          price: `Rs ${(bottlesNeeded12L * 275).toLocaleString()}/mo`,
                          highlight: false,
                        },
                      ].map((plan) => (
                        <div
                          key={plan.label}
                          className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all
                            ${plan.highlight
                              ? "border-blue-200 bg-blue-50/70 shadow-[0_2px_12px_rgba(33,150,243,0.12)]"
                              : "border-slate-100 bg-slate-50/60"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            {plan.highlight && (
                              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                            )}
                            <div>
                              <p className={`text-sm font-bold ${plan.highlight ? "text-blue-900" : "text-slate-700"}`}>
                                {plan.label}
                              </p>
                              <p className="text-[11px] text-slate-400 font-medium">{plan.sub}</p>
                            </div>
                          </div>
                          <span className={`text-sm font-black whitespace-nowrap ${plan.highlight ? "text-blue-700" : "text-slate-600"}`}>
                            {plan.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        window.dispatchEvent(
                          new CustomEvent("culligan-quick-order", {
                            detail: { qty: bottlesNeeded19L },
                          })
                        );
                        requestAnimationFrame(() => {
                          const el = document.getElementById("order");
                          if (!el) return;
                          const top = el.getBoundingClientRect().top + window.scrollY - 72;
                          window.scrollTo({ top, behavior: "instant" });
                        });
                      }}
                      className="btn-cta-primary mt-5 w-full flex items-center justify-center gap-2
                                 rounded-2xl h-12 text-[14px] font-bold text-white cursor-pointer"
                      style={{ background: "linear-gradient(135deg,#2196f3,#42a5f5)" }}
                    >
                      Order {bottlesNeeded19L} Bottles Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Coupon Savings Tab ── */}
          {tab === "savings" && (
            <motion.div
              key="savings"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl mx-auto"
            >
              <div className="shadow-card rounded-3xl border border-slate-100 bg-white p-8">

                {/* Slider */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-500" />
                      Bottles per month
                    </label>
                    <span className="text-2xl font-black text-blue-600">{bottlesPerMonth}</span>
                  </div>
                  <Slider
                    min={3}
                    max={30}
                    step={1}
                    value={[bottlesPerMonth]}
                    onValueChange={([v]) => setBottlesPerMonth(v)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                    <span>3 (min)</span>
                    <span>30</span>
                  </div>
                </div>

                {/* Coupon info */}
                <div className="mb-8 flex items-start gap-3 p-4 rounded-2xl
                                bg-blue-50/70 border border-blue-100
                                shadow-[0_2px_12px_rgba(33,150,243,0.08)]">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-200/60
                                  flex items-center justify-center text-blue-600 shrink-0">
                    <TrendingDown className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    For <strong className="text-slate-900">{bottlesPerMonth} bottles/month</strong>, you need{" "}
                    <strong className="text-blue-700">
                      {couponBooksNeeded} coupon book{couponBooksNeeded > 1 ? "s" : ""}
                    </strong>{" "}
                    per month — saving Rs 10 per bottle.
                  </p>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Regular cost",  value: `Rs ${regularCost.toLocaleString()}`,      highlight: false, sub: "/month" },
                    { label: "With coupons",  value: `Rs ${withCouponsCost.toLocaleString()}`,   highlight: false, sub: "/month" },
                    { label: "Monthly saving",value: `Rs ${monthlySaving.toLocaleString()}`,     highlight: true,  sub: "saved"  },
                    { label: "Annual saving", value: `Rs ${annualSaving.toLocaleString()}`,      highlight: true,  sub: "saved"  },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      layout
                      className={`rounded-2xl p-4 text-center transition-all ${
                        item.highlight
                          ? "bg-gradient-to-br from-blue-600 to-blue-500 shadow-[0_6px_20px_rgba(33,150,243,0.35)]"
                          : "bg-slate-50 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                      }`}
                    >
                      <div className={`text-[10.5px] font-semibold mb-1.5 ${item.highlight ? "text-blue-100" : "text-slate-400"}`}>
                        {item.label}
                      </div>
                      <div className={`text-lg font-black leading-tight ${item.highlight ? "text-white" : "text-slate-900"}`}>
                        {item.value}
                      </div>
                      <div className={`text-[10px] mt-0.5 ${item.highlight ? "text-blue-200" : "text-slate-400"}`}>
                        {item.sub}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Savings bar */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>Savings with coupon books</span>
                    <span className="text-blue-600 font-bold">
                      {Math.round((monthlySaving / regularCost) * 100)}% off
                    </span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${(monthlySaving / regularCost) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                    />
                  </div>
                </div>

                <p className="text-xs text-center text-slate-400 mt-5">
                  Based on standard coupon book pricing (Rs 370/bottle vs Rs 380 cash).{" "}
                  <Link href="/contact" className="text-blue-500 hover:underline font-semibold">
                    Ask about bulk rates →
                  </Link>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
