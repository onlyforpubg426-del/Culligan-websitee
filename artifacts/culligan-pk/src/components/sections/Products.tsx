import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, MessageCircle,
  ShieldCheck, Truck, Award, FlaskConical,
  Star, Zap, Droplets, Package, CheckCircle2,
} from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/* ─── Data ──────────────────────────────────────────────── */

const bottles = [
  {
    name: "19 Litre",
    label: "Gallon",
    tagline: "The office & family standard",
    price: 380,
    unit: "/ bottle",
    note: "Min. order 3",
    image: "/bottles/19l.jpg",
    badge: "Most Popular",
    badgeColor: "bg-primary text-white",
    stars: 4.9,
    reviews: 312,
    highlight: true,
  },
  {
    name: "12 Litre",
    label: "Gallon",
    tagline: "Perfect for the home fridge",
    price: 275,
    unit: "/ bottle",
    note: "Min. order 3",
    image: "/bottles/12l.jpg",
    badge: null,
    badgeColor: "",
    stars: 4.8,
    reviews: 184,
    highlight: false,
  },
  {
    name: "6 Litre",
    label: "Bottle",
    tagline: "Countertop-friendly size",
    price: 235,
    unit: "/ bottle",
    note: null,
    image: "/bottles/6l.jpg",
    badge: "Great Value",
    badgeColor: "bg-emerald-500 text-white",
    stars: 4.7,
    reviews: 97,
    highlight: false,
  },
  {
    name: "1.5 Litre",
    label: "Case of 6",
    tagline: "Daily carry, simplified",
    price: 475,
    unit: "/ case",
    note: "6 bottles",
    image: "/bottles/1-5l.jpg",
    badge: null,
    badgeColor: "",
    stars: 4.8,
    reviews: 143,
    highlight: false,
  },
  {
    name: "500 ml",
    label: "Case of 12",
    tagline: "Pure hydration on the go",
    price: 480,
    unit: "/ case",
    note: "12 bottles",
    image: "/bottles/500ml.jpg",
    badge: "Best Seller",
    badgeColor: "bg-amber-500 text-white",
    stars: 4.9,
    reviews: 261,
    highlight: false,
  },
];

const bundles = [
  { name: "Hydration Bundle", contents: "60 × 500ml",              salePrice: 2250, originalPrice: 2880, image: "/bundles/hydration.jpg", tag: "Most Ordered" },
  { name: "Family Bundle",    contents: "36 × 500ml + 12 × 1.5L", salePrice: 2240, originalPrice: 2880, image: "/bundles/family.jpg",    tag: "Family Pick" },
  { name: "Purity Bundle",    contents: "30 × 1.5L",              salePrice: 2225, originalPrice: 2850, image: "/bundles/purity.jpg",    tag: null },
  { name: "Bachat Bundle",    contents: "12 × 6L",                salePrice: 2580, originalPrice: 2820, image: "/bundles/bachat.jpg",    tag: null },
  { name: "Freshness Bundle", contents: "6 × 6L",                 salePrice: 1308, originalPrice: 1410, image: "/bundles/freshness.jpg", tag: "Starter Pack" },
  { name: "Picnic Bundle",    contents: "12×500ml + 6×1.5L + 1×6L", salePrice: 1120, originalPrice: 1430, image: "/bundles/picnic.jpg", tag: "Event Ready" },
];

const whyPoints = [
  { icon: FlaskConical, title: "RO + Ozonation", body: "Dual-stage purification removes 99.9% of contaminants — bacteria, heavy metals, and chlorine.", color: "text-sky-500", bg: "bg-sky-50" },
  { icon: ShieldCheck,  title: "Lab Certified", body: "Every batch is tested before leaving our facility. Full lab documentation available on request.", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: Truck,        title: "Same-Day Free Delivery", body: "Order before 12 PM and receive your water the same day, anywhere in Karachi. Zero delivery fee.", color: "text-primary", bg: "bg-blue-50" },
  { icon: Award,        title: "Since 1997", body: "Over 25 years serving homes, offices, and institutions across Pakistan with unwavering quality.", color: "text-amber-500", bg: "bg-amber-50" },
];

const faqs = [
  { q: "What is the minimum order quantity?", a: "For 19L and 12L gallons, the minimum order is 3 bottles. All other sizes can be ordered individually or by the case." },
  { q: "How fast is delivery in Karachi?", a: "We offer free same-day delivery across Karachi for orders placed before 12 PM. Orders placed after noon are delivered the next morning." },
  { q: "Is Culligan water safe for babies and the elderly?", a: "Yes. Our RO + Ozonation process removes all contaminants and pathogens. The water is WHO-certified and suitable for all ages including infants." },
  { q: "Can I set up a recurring delivery?", a: "Absolutely. Contact us via WhatsApp or call our UAN to set up a scheduled weekly or bi-weekly delivery at a discounted rate." },
];

/* ─── Micro components ───────────────────────────────────── */

function StarRow({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`h-3.5 w-3.5 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500 font-medium">{rating} ({count})</span>
    </div>
  );
}

/* ─── Products section ───────────────────────────────────── */

export function Products() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const waMsg = (product: string) => {
    const msg = encodeURIComponent(`Hi, I'd like to order ${product}. Please confirm availability and delivery. Thank you!`);
    window.open(`https://wa.me/923001113535?text=${msg}`, "_blank");
  };

  return (
    <section id="products" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg,#f0f7ff 0%,#ffffff 18%,#f8fbff 60%,#ffffff 100%)" }}>

      {/* ── Decorative background blobs ────────────────────── */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-sky-100/30 blur-3xl translate-x-1/3 pointer-events-none" />

      {/* ════════════════════════════════════════════════════
          1. SECTION HERO BANNER
      ════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#2196f3 0%,#42aaf5 55%,#72c8ff 100%)" }}>
        {/* Ripple rings — CSS divs, no SVG path issues */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/20 pointer-events-none"
            style={{ left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }}
            initial={{ width: 120 + i * 80, height: 120 + i * 80, opacity: 0.5 }}
            animate={{ width: 520 + i * 120, height: 520 + i * 120, opacity: 0 }}
            transition={{ duration: 4, delay: i * 1, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        {/* Floating bubbles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 border border-white/20"
            style={{ width: 8 + (i % 3) * 10, height: 8 + (i % 3) * 10, left: `${10 + i * 11}%`, bottom: "10%" }}
            animate={{ y: [-10, -60 - i * 12, -10], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}

        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm mb-6"
            >
              <Droplets className="h-4 w-4 text-sky-300" />
              <span className="text-sky-200 text-xs font-semibold tracking-widest uppercase">Pure Water. Every Size.</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight"
            >
              Water That Works{" "}
              <span className="text-sky-300">For Your Life.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="mt-5 text-xl font-semibold text-white/90 max-w-xl mx-auto leading-relaxed"
            >
              RO + Ozonation purified water in every size — from your morning bottle to your office dispenser.
              Free same-day delivery across Karachi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.26 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="#order"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-primary font-bold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageCircle className="h-4 w-4" /> Order on WhatsApp
              </a>
              <a
                href="tel:11135353535"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/15 border border-white/35 text-white font-bold text-sm backdrop-blur-sm hover:bg-white/25 transition-all duration-200"
              >
                Get a Quote
              </a>
            </motion.div>

            {/* Trust badges row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              {[
                { icon: ShieldCheck, label: "Lab Certified Quality" },
                { icon: Truck,       label: "Free Same-Day Delivery" },
                { icon: Award,       label: "Since 1997 — Trusted" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
                  <Icon className="h-3.5 w-3.5 text-sky-300" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <svg className="w-full block" viewBox="0 0 1440 48" preserveAspectRatio="none" fill="#f0f7ff">
          <path d="M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z" />
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════
          2. INDIVIDUAL BOTTLES GRID
      ════════════════════════════════════════════════════ */}
      <div className="container mx-auto px-4 md:px-6 pt-16 pb-20">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3"
          >
            Individual Sizes
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          >
            Choose Your Size
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mt-3 text-slate-500 max-w-lg mx-auto"
          >
            Every bottle RO + Ozonation purified. Free delivery on all orders.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {bottles.map((bottle, i) => (
            <motion.div
              key={bottle.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className={`group relative flex flex-col rounded-3xl overflow-hidden cursor-pointer
                ${bottle.highlight
                  ? "ring-2 ring-primary shadow-2xl shadow-primary/15"
                  : "border border-slate-200/80 shadow-lg shadow-slate-200/60"
                }
                bg-white hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-300`}
            >
              {/* Popular ribbon */}
              {bottle.highlight && (
                <div className="absolute top-0 left-0 right-0 z-10 bg-primary text-white text-[10px] font-bold tracking-widest uppercase text-center py-1.5">
                  ⭐ Most Popular
                </div>
              )}

              {/* Badge top-right */}
              {bottle.badge && !bottle.highlight && (
                <div className={`absolute top-3 right-3 z-10 ${bottle.badgeColor} text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full shadow-sm`}>
                  {bottle.badge}
                </div>
              )}

              {/* Image */}
              <div className={`relative w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/60 ${bottle.highlight ? "pt-8" : ""}`} style={{ aspectRatio: "1 / 1" }}>
                <img
                  src={`${BASE}${bottle.image}`}
                  alt={bottle.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  style={{ transformOrigin: "center" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                {/* Size label overlay */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                    {bottle.name}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4 flex flex-col flex-1 gap-2">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{bottle.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">{bottle.tagline}</p>
                </div>

                <StarRow rating={bottle.stars} count={bottle.reviews} />

                <div className="flex items-baseline gap-1 mt-auto pt-1">
                  <span className="text-2xl font-black text-slate-900">Rs {bottle.price.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 font-medium">{bottle.unit}</span>
                </div>

                {bottle.note && (
                  <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Package className="h-3 w-3" /> {bottle.note}
                  </p>
                )}

                {/* Order CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => waMsg(`${bottle.name} (${bottle.label})`)}
                  className={`mt-2 w-full rounded-xl py-2.5 text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200
                    ${bottle.highlight
                      ? "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90"
                      : "bg-slate-900 text-white hover:bg-primary"
                    }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  Order Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          3. WHY OUR WATER
      ════════════════════════════════════════════════════ */}
      <div className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(135deg,#1e88e5 0%,#42a5f5 50%,#64baff 100%)" }}>
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sky-300 text-xs font-bold tracking-[0.2em] uppercase mb-3"
            >
              The Culligan Difference
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-black text-white tracking-tight"
            >
              Why Our Water?
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyPoints.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <motion.div
                  key={pt.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl p-6 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-sky-300" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-2">{pt.title}</h4>
                  <p className="text-white/65 text-sm leading-relaxed">{pt.body}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto"
          >
            {[
              { value: "25+", label: "Years of trust" },
              { value: "99.9%", label: "Contaminant removal" },
              { value: "10k+", label: "Happy customers" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black text-white">{s.value}</p>
                <p className="text-white/55 text-xs mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave bottom */}
        <svg className="w-full block mt-10" viewBox="0 0 1440 48" preserveAspectRatio="none" fill="#f8fbff">
          <path d="M0,48 L0,32 Q360,0 720,28 Q1080,52 1440,20 L1440,48 Z" />
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════
          4. SEASONAL BUNDLES
      ════════════════════════════════════════════════════ */}
      <div className="container mx-auto px-4 md:px-6 py-16 pb-20">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-4"
          >
            <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span className="text-amber-700 text-xs font-bold tracking-wide uppercase">Limited Time Bundles</span>
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          >
            Stack Up &amp; Save
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mt-3 text-slate-500 max-w-lg mx-auto"
          >
            Curated seasonal bundles designed for families, offices, and events.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((bundle, i) => {
            const saving = bundle.originalPrice - bundle.salePrice;
            const pct = Math.round((saving / bundle.originalPrice) * 100);
            return (
              <motion.div
                key={bundle.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/25 transition-all duration-300 flex flex-col"
              >
                {/* Tag badge */}
                {bundle.tag && (
                  <div className="absolute top-4 left-4 z-10 bg-primary text-white text-[10px] font-bold tracking-wide uppercase px-3 py-1 rounded-full shadow-md">
                    {bundle.tag}
                  </div>
                )}

                {/* Save badge */}
                <div className="absolute top-4 right-4 z-10 bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                  Save {pct}%
                </div>

                {/* Image */}
                <div className="relative bg-gradient-to-br from-slate-50 to-blue-50/50" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={`${BASE}${bundle.image}`}
                    alt={bundle.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-slate-900 mb-1">{bundle.name}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span className="text-sm text-slate-500 font-medium">{bundle.contents}</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-5 mt-auto">
                    <span className="text-3xl font-black text-slate-900">Rs {bundle.salePrice.toLocaleString()}</span>
                    <span className="text-sm text-slate-400 line-through font-medium">Rs {bundle.originalPrice.toLocaleString()}</span>
                    <span className="text-xs text-emerald-600 font-bold ml-1">Save Rs {saving.toLocaleString()}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => waMsg(bundle.name)}
                    className="w-full rounded-xl py-3 text-sm font-bold bg-slate-900 text-white hover:bg-primary flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Order Bundle
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Corporate CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 rounded-3xl overflow-hidden relative"
          style={{ background: "linear-gradient(135deg,#f0f7ff 0%,#e0f0ff 100%)" }}
        >
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-8">
            <div>
              <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Corporate Accounts</p>
              <h4 className="text-2xl font-black text-slate-900">Hydration for Your Entire Team</h4>
              <p className="text-slate-500 text-sm mt-1 max-w-md">Customized scheduling, bulk pricing, and priority delivery — built for offices and institutions across Karachi.</p>
            </div>
            <div className="shrink-0 flex gap-3">
              <a
                href="#order"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg hover:bg-primary/90 transition-colors"
              >
                Get a Quote <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:11135353535"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-sm hover:border-primary/40 transition-colors"
              >
                Call Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════
          5. FAQ ACCORDION
      ════════════════════════════════════════════════════ */}
      <div className="py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3"
            >
              Questions
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl font-black text-slate-900"
            >
              Frequently Asked
            </motion.h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 pr-4 text-sm md:text-base">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-slate-400"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          6. STICKY MOBILE CTA BAR
      ════════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 px-4 py-3 flex gap-3 shadow-2xl">
          <a
            href="tel:11135353535"
            className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-800 font-bold text-sm text-center hover:border-primary/40 transition-colors"
          >
            Call Us
          </a>
          <a
            href="#order"
            className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-sm text-center flex items-center justify-center gap-1.5 shadow-lg shadow-primary/30"
          >
            <MessageCircle className="h-4 w-4" /> Order Now
          </a>
        </div>
      </div>

    </section>
  );
}
