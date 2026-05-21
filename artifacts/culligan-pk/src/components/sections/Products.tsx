import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight, ChevronDown, MessageCircle,
  ShieldCheck, Truck, Award, FlaskConical,
  Star, Zap, Droplets, Package, CheckCircle2,
  Phone, Clock, MapPin, ChevronRight
} from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/* ─── Animation variants ─────────────────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

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
  { name: "Hydration Bundle", contents: "60 × 500ml",              salePrice: 2250, originalPrice: 2880, image: "/bundles/hydration.jpg", tag: "Most Ordered", savings: 630 },
  { name: "Family Bundle",    contents: "36 × 500ml + 12 × 1.5L", salePrice: 2240, originalPrice: 2880, image: "/bundles/family.jpg",    tag: "Family Pick", savings: 640 },
  { name: "Purity Bundle",    contents: "30 × 1.5L",              salePrice: 2225, originalPrice: 2850, image: "/bundles/purity.jpg",    tag: null, savings: 625 },
  { name: "Bachat Bundle",    contents: "12 × 6L",                salePrice: 2580, originalPrice: 2820, image: "/bundles/bachat.jpg",    tag: null, savings: 240 },
  { name: "Freshness Bundle", contents: "6 × 6L",                 salePrice: 1308, originalPrice: 1410, image: "/bundles/freshness.jpg", tag: "Starter Pack", savings: 102 },
  { name: "Picnic Bundle",    contents: "12×500ml + 6×1.5L + 1×6L", salePrice: 1120, originalPrice: 1430, image: "/bundles/picnic.jpg", tag: "Event Ready", savings: 310 },
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
          <motion.div
            key={s}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: s * 0.05 }}
          >
            <Star
              className={`h-3.5 w-3.5 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
            />
          </motion.div>
        ))}
      </div>
      <span className="text-xs text-slate-500 font-medium">{rating} ({count})</span>
    </div>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="inline-block"
    >
      {value}{suffix}
    </motion.span>
  );
}

/* ─── Main Products section ──────────────────────────────── */

export function Products() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredBundle, setHoveredBundle] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

  const waMsg = (product: string) => {
    const msg = encodeURIComponent(`Hi, I'd like to order ${product}. Please confirm availability and delivery. Thank you!`);
    window.open(`https://wa.me/923001113535?text=${msg}`, "_blank");
  };

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="relative overflow-hidden" 
      style={{ background: "linear-gradient(180deg,#90caf9 0%,#f0f7ff 8%,#ffffff 24%,#f8fbff 62%,#ffffff 100%)" }}
    >
      {/* ── Parallax background blobs ────────────────────── */}
      <motion.div 
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ y: smoothBackgroundY }}
      />
      <motion.div 
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-sky-100/30 blur-3xl translate-x-1/3 pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]) }}
      />

      {/* ════════════════════════════════════════════════════
          1. SECTION HERO BANNER
      ════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#64b0f0 0%,#82c8f6 55%,#a8dbfc 100%)" }}>
        {/* Ripple rings with improved easing */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/20 pointer-events-none"
            style={{ left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }}
            initial={{ width: 120 + i * 80, height: 120 + i * 80, opacity: 0.5 }}
            animate={{ width: 520 + i * 120, height: 520 + i * 120, opacity: 0 }}
            transition={{ duration: 4, delay: i * 1, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {/* Floating bubbles with varied paths */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 border border-white/20"
            style={{ 
              width: 6 + (i % 4) * 8, 
              height: 6 + (i % 4) * 8, 
              left: `${5 + i * 8}%`, 
              bottom: `${5 + (i % 3) * 15}%` 
            }}
            animate={{ 
              y: [0, -40 - i * 15, 0], 
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4 + i * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut", 
              delay: i * 0.3 
            }}
          />
        ))}

        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Droplets className="h-4 w-4 text-sky-300" />
              </motion.div>
              <span className="text-sky-200 text-xs font-semibold tracking-widest uppercase">Pure Water. Every Size.</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-tight"
            >
              Water That Works{" "}
              <span className="text-sky-300 inline-block">
                {"For Your Life.".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.03 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-5 text-xl font-semibold text-white/90 max-w-xl mx-auto leading-relaxed"
            >
              RO + Ozonation purified water in every size — from your morning bottle to your office dispenser.
              Free same-day delivery across Karachi.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <motion.a
                href="tel:11135353535"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/15 border border-white/35 text-white font-bold text-sm backdrop-blur-sm transition-all duration-200"
              >
                <Phone className="h-4 w-4" />
                Get a Quote
              </motion.a>
              <motion.a
                href="#bundles"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-primary font-bold text-sm shadow-lg shadow-primary/20 transition-all duration-200"
              >
                View Bundles
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>

            {/* Trust badges row with stagger */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              {[
                { icon: ShieldCheck, label: "Lab Certified Quality" },
                { icon: Truck,       label: "Free Same-Day Delivery" },
                { icon: Award,       label: "Since 1997 — Trusted" },
              ].map(({ icon: Icon, label }) => (
                <motion.div 
                  key={label} 
                  variants={fadeInUp}
                  className="flex items-center gap-1.5 text-white/70 text-xs font-medium bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-sky-300" />
                  {label}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom wave with animation */}
        <motion.svg 
          className="w-full block" 
          viewBox="0 0 1440 48" 
          preserveAspectRatio="none" 
          fill="#f0f7ff"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.path 
            d="M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z"
            initial={{ d: "M0,48 L0,30 Q360,10 720,30 Q1080,50 1440,30 L1440,48 Z" }}
            animate={{ d: "M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z" }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </motion.svg>
      </div>

      {/* ════════════════════════════════════════════════════
          2. INDIVIDUAL BOTTLES GRID
      ════════════════════════════════════════════════════ */}
      <div className="container mx-auto px-4 md:px-6 pt-16 pb-20">
        <div className="text-center mb-12">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3"
          >
            Individual Sizes
          </motion.p>
          <motion.h3
            variants={fadeInUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          >
            Choose Your Size
          </motion.h3>
          <motion.p
            variants={fadeInUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-3 text-slate-500 max-w-lg mx-auto"
          >
            Every bottle RO + Ozonation purified. Free delivery on all orders.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {bottles.map((bottle, i) => (
            <motion.div
              key={bottle.name}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
              className={`group relative flex flex-col rounded-3xl overflow-hidden cursor-pointer
                ${bottle.highlight
                  ? "ring-2 ring-primary shadow-2xl shadow-primary/15"
                  : "border border-slate-200/80 shadow-lg shadow-slate-200/60"
                }
                bg-white hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-300`}
            >
              {/* Popular ribbon with shimmer */}
              {bottle.highlight && (
                <motion.div 
                  className="absolute top-0 left-0 right-0 z-10 bg-primary text-white text-[10px] font-bold tracking-widest uppercase text-center py-1.5 overflow-hidden"
                  initial={{ y: -30 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  ⭐ Most Popular
                </motion.div>
              )}

              {/* Badge top-right with entrance */}
              {bottle.badge && !bottle.highlight && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`absolute top-3 right-3 z-10 ${bottle.badgeColor} text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full shadow-sm`}
                >
                  {bottle.badge}
                </motion.div>
              )}

              {/* Image with parallax hover */}
              <div className={`relative w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/60 ${bottle.highlight ? "pt-8" : ""}`} style={{ aspectRatio: "1 / 1" }}>
                <motion.img
                  src={`${BASE}${bottle.image}`}
                  alt={bottle.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Size label overlay with slide up */}
                <motion.div 
                  className="absolute bottom-3 left-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <span className="bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                    {bottle.name}
                  </span>
                </motion.div>

                {/* Quick view overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ o
