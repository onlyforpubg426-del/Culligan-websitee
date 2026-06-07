import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, MessageCircle,
  ShieldCheck, Truck, Award, FlaskConical,
  Star, Zap, Droplets, Package, CheckCircle2, Thermometer,
  ShoppingCart, Check,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { Calculator } from "@/components/sections/Calculator";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/* ─── Add to Cart Button ─────────────────────────────────── */

const BRAND_GRADIENT   = "linear-gradient(135deg, #1976d2 0%, #2196f3 50%, #42a5f5 100%)";
const PREMIUM_GRADIENT = "linear-gradient(135deg, #1565c0 0%, #1976d2 48%, #2196f3 100%)";
const LIGHT_GRADIENT   = "linear-gradient(135deg, #2196f3 0%, #42a5f5 55%, #64b5f6 100%)";

function AddToCartButton({
  onClick,
  bg = BRAND_GRADIENT,
  className = "",
}: {
  onClick: () => void;
  bg?: string;
  className?: string;
}) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    onClick();
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.93 }}
      animate={added ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.25 }}
      className={`relative overflow-hidden w-full rounded-xl py-2.5 text-sm font-bold flex items-center justify-center gap-1.5 text-white select-none cursor-pointer ${className}`}
      style={{
        background: added ? "linear-gradient(135deg,#16a34a,#22c55e)" : bg,
        boxShadow: added
          ? "0 4px 14px rgba(34,197,94,0.45)"
          : "0 4px 14px rgba(25,118,210,0.45), 0 1px 0 rgba(255,255,255,0.14) inset",
        transition: "background 0.25s, box-shadow 0.25s",
      }}
    >
      {/* shimmer sweep — only on idle */}
      {!added && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.22) 50%,transparent 60%)",
          }}
          initial={{ x: "-110%" }}
          animate={{ x: "210%" }}
          transition={{ repeat: Infinity, repeatDelay: 2.8, duration: 0.65, ease: "easeInOut" }}
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.18 }}
          >
            <Check className="h-4 w-4" />
            Added!
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.18 }}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ─── Data ──────────────────────────────────────────────── */

const bottles = [
  {
    id: "19l",
    name: "19 Litre",
    label: "Gallon",
    tagline: "The office & family standard",
    price: 380,
    unit: "/ bottle",
    note: "Min. order 3",
    image: "/bottles/12l.png",
    badge: "Most Popular",
    badgeColor: "bg-primary text-white",
    stars: 4.9,
    reviews: 312,
    highlight: true,
    details: [
      "Ideal for family and office use",
      "Suitable for standard dispensers",
      "Minimum order: 3",
      "Same-day delivery available in selected areas",
    ],
  },
  {
    id: "12l",
    name: "12 Litre",
    label: "Gallon",
    tagline: "Perfect for the home fridge",
    price: 275,
    unit: "/ bottle",
    note: "Min. order 3",
    image: "/bottles/19l.png",
    badge: null,
    badgeColor: "",
    stars: 4.8,
    reviews: 184,
    highlight: false,
    details: [
      "Perfect fit for home refrigerators",
      "Suitable for standard dispensers",
      "Minimum order: 3",
      "Same-day delivery available in selected areas",
    ],
  },
  {
    id: "6l",
    name: "6 Litre",
    label: "Bottle",
    tagline: "Countertop-friendly size",
    price: 235,
    unit: "/ bottle",
    note: null,
    image: "/bottles/6l.png",
    badge: "Great Value",
    badgeColor: "bg-emerald-500 text-white",
    stars: 4.7,
    reviews: 97,
    highlight: false,
    details: [
      "Ideal countertop & small-space size",
      "No dispenser needed — pour directly",
      "Perfect for small families or couples",
      "Same-day delivery available in selected areas",
    ],
  },
  {
    id: "1.5l",
    name: "1.5 Litre",
    label: "Case of 6",
    tagline: "Daily carry, simplified",
    price: 475,
    unit: "/ case",
    note: "6 bottles",
    image: "/bottles/1-5l.png",
    badge: null,
    badgeColor: "",
    stars: 4.8,
    reviews: 143,
    highlight: false,
    details: [
      "Convenient daily carry size",
      "Great for travel, school & office",
      "Sold as a case of 6 bottles",
      "Bulk orders available",
    ],
  },
  {
    id: "500ml",
    name: "500 ml",
    label: "Case of 12",
    tagline: "Pure hydration on the go",
    price: 480,
    unit: "/ case",
    note: "12 bottles",
    image: "/bottles/500ml.png",
    badge: "Best Seller",
    badgeColor: "bg-amber-500 text-white",
    stars: 4.9,
    reviews: 261,
    highlight: false,
    details: [
      "Best for meetings, guests, and events",
      "Convenient single-serve size",
      "Good for offices and gatherings",
      "Bulk order support available",
    ],
  },
];

const bundles = [
  {
    id: "hydration-bundle", name: "Hydration Bundle", contents: "60 × 500ml",
    salePrice: 2250, originalPrice: 2880, image: "/bundles/hydration.jpg", tag: "Most Ordered",
    stars: 4.9, reviews: 284,
    bullets: [
      "60 chilled bottles — stocks an office break room all month",
      "Single-serve size: perfect for desks, meetings & guests",
      "Keeps a family of 4 hydrated for roughly two full weeks",
    ],
  },
  {
    id: "family-bundle", name: "Family Bundle", contents: "36 × 500ml + 12 × 1.5L",
    salePrice: 2240, originalPrice: 2880, image: "/bundles/family.jpg", tag: "Family Pick",
    stars: 4.8, reviews: 197,
    bullets: [
      "Two-size combo — 500ml for lunchboxes, 1.5L for meals",
      "Covers school runs and dinner table all in one order",
      "Fewer mid-month reorders with the mixed quantity split",
    ],
  },
  {
    id: "purity-bundle", name: "Purity Bundle", contents: "30 × 1.5L",
    salePrice: 2225, originalPrice: 2850, image: "/bundles/purity.jpg", tag: null,
    stars: 4.8, reviews: 143,
    bullets: [
      "1.5L bottles — ideal for pour-at-the-table daily drinking",
      "RO + ozonation treated, every bottle in the batch",
      "30 bottles comfortably covers a family of 3 for a month",
    ],
  },
  {
    id: "bachat-bundle", name: "Bachat Bundle", contents: "12 × 6L",
    salePrice: 2580, originalPrice: 2820, image: "/bundles/bachat.jpg", tag: null,
    stars: 4.7, reviews: 119,
    bullets: [
      "Best Rs-per-litre value of any bundle we offer",
      "Compatible with all standard cradle stands & dispensers",
      "12 gallons — significantly cuts your monthly water bill",
    ],
  },
  {
    id: "freshness-bundle", name: "Freshness Bundle", contents: "6 × 6L",
    salePrice: 1308, originalPrice: 1410, image: "/bundles/freshness.jpg", tag: "Starter Pack",
    stars: 4.7, reviews: 88,
    bullets: [
      "Try Culligan quality before committing to a larger order",
      "6 gallons keep a small home going for up to two weeks",
      "No subscription needed — reorder exactly when you want",
    ],
  },
  {
    id: "picnic-bundle", name: "Picnic Bundle", contents: "12×500ml + 6×1.5L + 1×6L",
    salePrice: 1120, originalPrice: 1430, image: "/bundles/picnic.jpg", tag: "Event Ready",
    stars: 4.8, reviews: 76,
    bullets: [
      "Three sizes cover every guest need at dawats & BBQs",
      "The 6L gallon keeps a station topped up all evening",
      "Lightweight 500ml bottles easy to carry on outdoor trips",
    ],
  },
];

const whyPoints = [
  { icon: FlaskConical, title: "RO + Ozonation Purification",   body: "Our water is purified using RO filtration and ozonation treatment to help reduce impurities and maintain safe drinking quality." },
  { icon: ShieldCheck,  title: "Quality Checked in Every Batch", body: "Each production batch is checked before delivery so customers receive water that meets our quality standards." },
  { icon: Truck,        title: "Fast Delivery Across Karachi",   body: "We offer quick and convenient delivery across Karachi, including same-day service in selected areas." },
  { icon: Package,      title: "Sizes for Every Need",           body: "From personal bottles to dispenser gallons, we offer options for home use, offices, events, and daily hydration." },
  { icon: Award,        title: "Reliable Service Since 1997",    body: "We've built our reputation by focusing on consistent quality, dependable service, and customer convenience." },
  { icon: MessageCircle, title: "Easy Ordering on WhatsApp",    body: "Ordering is simple. Message us on WhatsApp, confirm your quantity, and our team will guide you through the rest." },
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
  const [tab, setTab] = useState<"gallons" | "dispensers">("gallons");

  const { addItem, totalItems, totalPrice, openCart } = useCart();

  return (
    <section id="products" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg,#e8f7ff 0%,#f0f7ff 8%,#ffffff 24%,#f8fbff 62%,#ffffff 100%)" }}>

      {/* ── Decorative background blobs ────────────────────── */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-sky-100/30 blur-3xl translate-x-1/3 pointer-events-none" />

      {/* ════════════════════════════════════════════════════
          1. SECTION HERO BANNER
      ════════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #f0f8ff 0%, #e8f5ff 40%, #f5fbff 75%, #ffffff 100%)" }}
      >
        {/* Subtle ambient orbs */}
        <div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(186,230,255,0.45) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-16 -left-16 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(219,244,255,0.5) 0%, transparent 65%)" }} />

        {/* Ripple rings */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: "50%", top: "50%", translateX: "-50%", translateY: "-50%",
              border: "1px solid rgba(147,197,253,0.18)",
            }}
            initial={{ width: 120 + i * 80, height: 120 + i * 80, opacity: 0.6 }}
            animate={{ width: 520 + i * 120, height: 520 + i * 120, opacity: 0 }}
            transition={{ duration: 4, delay: i * 1, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        {/* Floating bubbles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 8 + (i % 3) * 10, height: 8 + (i % 3) * 10,
              left: `${10 + i * 11}%`, bottom: "10%",
              background: "rgba(186,230,253,0.25)",
              border: "1px solid rgba(147,210,250,0.3)",
            }}
            animate={{ y: [-10, -60 - i * 12, -10], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}

        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(147,210,250,0.5)",
                boxShadow: "0 2px 12px rgba(147,197,253,0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Droplets className="h-3.5 w-3.5" style={{ color: "#2196f3" }} />
              <span className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: "#1d6fa4" }}>
                Pure Water. Every Size.
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-black leading-[1.06] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", color: "#0f172a" }}
            >
              Purified Drinking Water{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #1d6fa4 0%, #2196f3 60%, #42a5f5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                in Every Size.
              </span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="mt-5 max-w-xl mx-auto leading-relaxed"
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "#475569",
              }}
            >
              RO + Ozonation purified water in every size — from your morning bottle to your office dispenser.
              Delivered to your door across Karachi — no charges, ever.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.26 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="tel:11135353535"
                className="btn-cta-primary group relative inline-flex items-center gap-2.5 px-9 py-3.5 rounded-full font-bold text-[14.5px] tracking-wide text-white overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #2196f3 0%, #42a5f5 50%, #64b5f6 100%)",
                }}
              >
                {/* Shimmer sweep */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.28) 50%, transparent 60%)",
                  }}
                />
                Get a Quote
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-8 flex flex-wrap justify-center gap-5"
            >
              {[
                { icon: ShieldCheck, label: "Lab Certified Quality" },
                { icon: Truck,       label: "Delivered by Evening"  },
                { icon: Award,       label: "Since 1997 — Trusted"  },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#475569" }}>
                  <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "#2196f3" }} />
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
          3. INDIVIDUAL BOTTLES / DISPENSERS GRID
      ════════════════════════════════════════════════════ */}
      <div className="container mx-auto px-4 md:px-6 pt-16 pb-20">
        <div className="text-center mb-12">
          {/* Toggle pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center p-1 rounded-full bg-slate-100 mb-8 shadow-inner"
          >
            <button
              onClick={() => setTab("gallons")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                tab === "gallons"
                  ? "bg-white text-[#1d6fa4] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Droplets className="w-4 h-4" />
              Gallons
            </button>
            <button
              onClick={() => setTab("dispensers")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                tab === "dispensers"
                  ? "bg-white text-[#1d6fa4] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Thermometer className="w-4 h-4" />
              Dispensers
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            {tab === "gallons" ? (
              <motion.div key="gallons-heading" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">Individual Sizes</p>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  Choose the Right Size for Your Needs
                </h3>
                <p className="mt-3 text-slate-500 max-w-lg mx-auto">
                  From individual bottles to large dispenser gallons, every order is prepared for convenient everyday use and delivered to your doorstep.
                </p>
              </motion.div>
            ) : (
              <motion.div key="dispensers-heading" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">Available Now</p>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  Hot &amp; Cold Dispensers
                </h3>
                <p className="mt-3 text-slate-500 max-w-lg mx-auto">
                  Imported dispensers and accessories for home and office — elegant, durable, and energy-efficient.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {tab === "gallons" ? (
            <motion.div key="gallons-grid" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
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
              <div className={`relative w-full overflow-hidden ${bottle.highlight ? "pt-8" : ""}`} style={{ aspectRatio: "1 / 1" }}>
                <img
                  src={`${BASE}${bottle.image}`}
                  alt={bottle.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ transformOrigin: "center" }}
                  loading="lazy"
                />

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

                {bottle.details && (
                  <ul className="border-t border-slate-100 pt-2 flex flex-col gap-1.5">
                    {bottle.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-[11px] text-slate-500 leading-snug">
                        <CheckCircle2 className="h-3 w-3 text-blue-400 shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Order CTA */}
                <AddToCartButton
                  className="mt-2"
                  bg={bottle.highlight ? PREMIUM_GRADIENT : BRAND_GRADIENT}
                  onClick={() => addItem({ id: bottle.id, name: bottle.name, label: bottle.label, price: bottle.price, unit: bottle.unit, image: bottle.image, minQty: bottle.note?.startsWith("Min") ? 3 : 1 })}
                />
              </div>
            </motion.div>
          ))}
              </div>

              {/* ── Full Calculator ── */}
              <Calculator />
            </motion.div>
          ) : (
            <motion.div key="dispensers-grid" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              <div className="flex flex-wrap gap-5 justify-center">
                {/* Cradle Tap Stand */}
                <div className="group w-full max-w-xs rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
                    <img src="/cradle-tap-stand.jpg" alt="Culligan Cradle Tap Stand" className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-black text-slate-900 text-lg leading-tight">Cradle Tap Stand</h3>
                      <span className="shrink-0 text-lg font-black text-[#1d6fa4]">Rs 1,000</span>
                    </div>
                    <ul className="flex flex-col gap-1.5 mb-4">
                      {[
                        "No heating/cooling element — more sanitary",
                        "Simple gravity-fed tap mechanism",
                        "Compatible with all standard gallon sizes",
                        "Easy to clean & maintain",
                        "Durable ABS construction",
                      ].map((spec) => (
                        <li key={spec} className="flex items-start gap-2 text-[11px] text-slate-500 leading-snug">
                          <CheckCircle2 className="h-3 w-3 text-blue-400 shrink-0 mt-0.5" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                    <AddToCartButton
                      bg={LIGHT_GRADIENT}
                      onClick={() => addItem({ id: "cradle-tap", name: "Cradle Tap Stand", label: "Gravity-fed tap", price: 1000, unit: "/ unit", image: "/cradle-tap-stand.jpg", minQty: 1 })}
                    />
                  </div>
                </div>

                {/* Homage Dispenser */}
                <div className="group w-full max-w-xs rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
                    <img src="/homage-dispenser.png" alt="Homage Dispenser" className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-black text-slate-900 text-lg leading-tight">Homage Dispenser</h3>
                      <span className="shrink-0 text-lg font-black text-[#1d6fa4]">Rs 27,500</span>
                    </div>
                    <ul className="flex flex-col gap-1.5 mb-4">
                      {[
                        "Hot & Cold Water",
                        "Child Safety Lock",
                        "Low Noise Design",
                        "3 Taps",
                        "Double Safety — overheat protection",
                        "High-efficiency compressor cooling",
                        "Indicator LEDs",
                      ].map((spec) => (
                        <li key={spec} className="flex items-start gap-2 text-[11px] text-slate-500 leading-snug">
                          <CheckCircle2 className="h-3 w-3 text-blue-400 shrink-0 mt-0.5" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                    <AddToCartButton
                      bg={LIGHT_GRADIENT}
                      onClick={() => addItem({ id: "homage-dispenser", name: "Homage Dispenser", label: "Hot & Cold, 3 Taps", price: 27500, unit: "/ unit", image: "/homage-dispenser.png", minQty: 1 })}
                    />
                  </div>
                </div>

                {/* Tabletop Dispenser */}
                <div className="group w-full max-w-xs rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
                    <img src="/tabletop-dispenser.png" alt="Tabletop Dispenser" className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-black text-slate-900 text-lg leading-tight">Tabletop Dispenser</h3>
                      <span className="shrink-0 text-lg font-black text-[#1d6fa4]">Rs 950</span>
                    </div>
                    <ul className="flex flex-col gap-1.5 mb-4">
                      {[
                        "Compatible with 12 Ltr & 19 Ltr gallons",
                        "Dispenses water at room temperature",
                        "Ideal for small kitchens",
                      ].map((spec) => (
                        <li key={spec} className="flex items-start gap-2 text-[11px] text-slate-500 leading-snug">
                          <CheckCircle2 className="h-3 w-3 text-blue-400 shrink-0 mt-0.5" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                    <AddToCartButton
                      bg={LIGHT_GRADIENT}
                      onClick={() => addItem({ id: "tabletop-dispenser", name: "Tabletop Dispenser", label: "Room temp, compact", price: 950, unit: "/ unit", image: "/tabletop-dispenser.png", minQty: 1 })}
                    />
                  </div>
                </div>
              </div>

              {/* Link to full dispensers page */}
              <div className="text-center mt-8">
                <Link href="/dispensers" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#42a5f5] hover:underline">
                  See full dispenser range &amp; features
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ════════════════════════════════════════════════════
          3. WHY OUR WATER
      ════════════════════════════════════════════════════ */}
      <div className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #ffffff 40%, #f5fbff 70%, #eef7ff 100%)" }}>

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 65%)", transform: "translate(35%, -35%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-30"
          style={{ background: "radial-gradient(circle, #e0f2fe 0%, transparent 65%)", transform: "translate(-30%, 30%)" }} />

        {/* Dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="container mx-auto px-4 md:px-6 relative z-10">

          {/* ── Header ── */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border"
              style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", borderColor: "#bfdbfe" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-blue-600">The Culligan Difference</span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight"
            >
              Why Customers Choose{" "}
              <span className="relative inline-block">
                <span className="relative z-10" style={{ color: "#1976d2" }}>Culligan</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 rounded-full opacity-20 -z-0" style={{ background: "#2196f3" }} />
              </span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-5 text-slate-500 text-base leading-relaxed max-w-xl mx-auto"
            >
              Quality you can trust, delivery that fits your life, and a brand that's been doing this since 1997.
            </motion.p>
          </div>

          {/* ── Feature grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {whyPoints.map((pt, i) => {
              const Icon = pt.icon;
              const accents = [
                { border: "#bfdbfe", iconBg: "linear-gradient(135deg,#dbeafe,#eff6ff)", iconColor: "#1976d2", num: "#bfdbfe" },
                { border: "#a5f3fc", iconBg: "linear-gradient(135deg,#cffafe,#f0f9ff)", iconColor: "#0369a1", num: "#a5f3fc" },
                { border: "#c7d2fe", iconBg: "linear-gradient(135deg,#e0e7ff,#f5f3ff)", iconColor: "#4f46e5", num: "#c7d2fe" },
                { border: "#bfdbfe", iconBg: "linear-gradient(135deg,#dbeafe,#eff6ff)", iconColor: "#1d4ed8", num: "#bfdbfe" },
                { border: "#99f6e4", iconBg: "linear-gradient(135deg,#ccfbf1,#f0fdf4)", iconColor: "#0f766e", num: "#99f6e4" },
                { border: "#a5f3fc", iconBg: "linear-gradient(135deg,#cffafe,#f0f9ff)", iconColor: "#0284c7", num: "#a5f3fc" },
              ];
              const a = accents[i % accents.length];
              return (
                <motion.div
                  key={pt.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.45 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group relative rounded-3xl p-6 bg-white border overflow-hidden cursor-default"
                  style={{
                    borderColor: a.border,
                    boxShadow: `0 2px 20px 0 ${a.border}80, 0 1px 4px 0 rgba(0,0,0,0.04)`,
                  }}
                >
                  {/* Big decorative number */}
                  <span className="absolute -top-3 -right-1 text-[80px] font-black leading-none select-none pointer-events-none opacity-[0.07]" style={{ color: a.iconColor }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Top border accent line */}
                  <div className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full opacity-70" style={{ background: a.border }} />

                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-sm" style={{ background: a.iconBg }}>
                    <Icon className="h-5 w-5" style={{ color: a.iconColor }} />
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-base mb-2 leading-snug">{pt.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{pt.body}</p>
                </motion.div>
              );
            })}
          </div>

          {/* ── Stats strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border overflow-hidden"
            style={{ background: "linear-gradient(135deg,#eff6ff 0%,#f0f9ff 50%,#e0f2fe 100%)", borderColor: "#bfdbfe" }}
          >
            <div className="grid grid-cols-3 divide-x" style={{ borderColor: "#bfdbfe" }}>
              {[
                { value: "25+",   label: "Years of trust",        sub: "Est. 1997 in Pakistan" },
                { value: "99.9%", label: "Contaminant removal",   sub: "RO + Ozone treated" },
                { value: "10k+",  label: "Happy customers",       sub: "Across Karachi" },
              ].map((s, i) => (
                <div key={s.label} className="text-center py-7 px-4" style={{ borderColor: "#bfdbfe" }}>
                  <p className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "#1976d2" }}>{s.value}</p>
                  <p className="text-slate-800 text-sm font-bold mt-1">{s.label}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Wave bottom */}
        <svg className="w-full block mt-16" viewBox="0 0 1440 48" preserveAspectRatio="none" fill="#f8fbff">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bundles.map((bundle, i) => {
            const saving = bundle.originalPrice - bundle.salePrice;
            const pct = Math.round((saving / bundle.originalPrice) * 100);
            const highlight = bundle.tag === "Most Ordered";
            return (
              <motion.div
                key={bundle.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className={`group relative flex flex-col rounded-3xl overflow-hidden cursor-pointer
                  ${highlight
                    ? "ring-2 ring-primary shadow-2xl shadow-primary/15"
                    : "border border-slate-200/80 shadow-lg shadow-slate-200/60"
                  }
                  bg-white hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-300`}
              >
                {/* Most Ordered ribbon */}
                {highlight && (
                  <div className="absolute top-0 left-0 right-0 z-10 bg-primary text-white text-[10px] font-bold tracking-widest uppercase text-center py-1.5">
                    ⭐ Most Ordered
                  </div>
                )}

                {/* Tag badge (non-highlighted) */}
                {bundle.tag && !highlight && (
                  <div className="absolute top-3 left-3 z-10 bg-primary text-white text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full shadow-sm">
                    {bundle.tag}
                  </div>
                )}

                {/* Save badge */}
                <div className="absolute top-3 right-3 z-10 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                  Save {pct}%
                </div>

                {/* Image — 1:1 like product cards */}
                <div className={`relative w-full overflow-hidden ${highlight ? "pt-8" : ""}`} style={{ aspectRatio: "1 / 1" }}>
                  <img
                    src={`${BASE}${bundle.image}`}
                    alt={bundle.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ transformOrigin: "center" }}
                    loading="lazy"
                  />
                  {/* Bundle name label overlay */}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                      {bundle.name}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col flex-1 gap-2">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bundle</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{bundle.contents}</p>
                  </div>

                  <StarRow rating={bundle.stars} count={bundle.reviews} />

                  <div className="flex items-baseline gap-1.5 mt-auto pt-1">
                    <span className="text-2xl font-black text-slate-900">Rs {bundle.salePrice.toLocaleString()}</span>
                    <span className="text-xs text-slate-400 line-through font-medium">Rs {bundle.originalPrice.toLocaleString()}</span>
                  </div>

                  <ul className="border-t border-slate-100 pt-2 flex flex-col gap-1.5">
                    {bundle.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[11px] text-slate-500 leading-snug">
                        <CheckCircle2 className="h-3 w-3 text-blue-400 shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <AddToCartButton
                    className="mt-2"
                    bg={highlight ? PREMIUM_GRADIENT : BRAND_GRADIENT}
                    onClick={() => addItem({ id: bundle.id, name: bundle.name, label: bundle.contents, price: bundle.salePrice, unit: "/ bundle", image: bundle.image, minQty: 1 })}
                  />
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
                className="btn-cta-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90"
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
          7. FLOATING VIEW CART BAR — visible when cart has items
      ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 28, stiffness: 340 }}
            className="fixed left-1/2 -translate-x-1/2 bottom-5 z-[45] pointer-events-auto"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={openCart}
              className="flex items-center gap-3 rounded-full pl-3 pr-4 py-2.5"
              style={{
                background: "linear-gradient(135deg, #60bef5 0%, #42a5f5 50%, #2196f3 100%)",
                boxShadow: "0 4px 24px rgba(33,150,243,0.45), 0 1px 0 rgba(255,255,255,0.25) inset",
              }}
            >
              {/* Cart icon with badge */}
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <ShoppingCart className="h-3.5 w-3.5 text-white" />
                </div>
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute -top-1 -right-1 min-w-[15px] h-[15px] bg-white text-blue-600 text-[9px] font-black rounded-full flex items-center justify-center px-0.5 leading-none"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              </div>

              {/* Label + price */}
              <div className="flex items-center gap-2">
                <span className="text-white text-xs font-semibold leading-none opacity-90">
                  View Cart
                </span>
                <span className="w-px h-3 bg-white/30 rounded-full" />
                <motion.span
                  key={totalPrice}
                  initial={{ opacity: 0.6, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-xs font-black leading-none"
                >
                  Rs {totalPrice.toLocaleString()}
                </motion.span>
              </div>

              <ArrowRight className="h-3.5 w-3.5 text-white/80" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>


    </section>
  );
}
