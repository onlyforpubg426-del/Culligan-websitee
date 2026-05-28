import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Droplets,
  ShieldCheck,
  FlaskConical,
  Recycle,
  Package,
  Award,
  Zap,
  Thermometer,
  Activity,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

const benefits = [
  {
    icon: Activity,
    title: "Supports Every Body Function",
    description:
      "Water is found in every living cell. It regulates temperature, carries nutrients and oxygen to cells, cushions joints, and flushes out waste.",
  },
  {
    icon: Zap,
    title: "Boosts Energy & Focus",
    description:
      "Even mild dehydration reduces concentration and endurance. Staying hydrated keeps your mind sharp and your energy levels steady throughout the day.",
  },
  {
    icon: Thermometer,
    title: "Regulates Body Temperature",
    description:
      "Through perspiration, your body dissipates heat. Adequate water intake ensures this cooling system works efficiently, especially in Karachi's climate.",
  },
  {
    icon: Droplets,
    title: "Aids Digestion",
    description:
      "Water softens stool, helps dissolve nutrients, and keeps the digestive tract moving. A well-hydrated body absorbs food more effectively.",
  },
];

const qualityStandards = [
  {
    logo: "NSF",
    name: "NSF International",
    description:
      "Culligan water meets NSF standards for bottled water purity, safety, and quality — one of the most rigorous third-party certifications in the industry.",
  },
  {
    logo: "WHO",
    name: "World Health Organization",
    description:
      "Our processes align with WHO guidelines for drinking water quality, ensuring safe levels of minerals, microorganisms, and chemical contaminants.",
  },
  {
    logo: "PSQCA",
    name: "Pakistan Standards Quality Control Authority",
    description:
      "Culligan is an active member of PSQCA, the national body that enforces standards for consumer goods quality and safety in Pakistan.",
  },
  {
    logo: "IBWA",
    name: "International Bottled Water Association",
    description:
      "Culligan International holds IBWA membership, committing to annual plant inspections, product testing, and continuous quality improvement.",
  },
];

const purificationSteps = [
  {
    step: "01",
    title: "Source Selection",
    description:
      "Water is drawn from deep underground wells below the earth's surface, chosen for natural purity and inspected before extraction.",
  },
  {
    step: "02",
    title: "Multi-Stage Filtration",
    description:
      "Raw water passes through multiple filtration stages — removing particulates, sediment, and impurities while preserving natural mineral balance.",
  },
  {
    step: "03",
    title: "Reverse Osmosis",
    description:
      "High-pressure RO membranes remove dissolved solids, heavy metals, and microcontaminants to achieve pharmaceutical-grade purity.",
  },
  {
    step: "04",
    title: "Re-Mineralisation",
    description:
      "Essential minerals are carefully re-added to restore a balanced, refreshing taste with low sodium levels suitable for all ages.",
  },
  {
    step: "05",
    title: "UV & Ozone Treatment",
    description:
      "Final sterilisation using UV light and ozone eliminates any remaining microorganisms — without the need for chemical additives.",
  },
  {
    step: "06",
    title: "Hourly Lab Testing",
    description:
      "Every batch is tested in our on-site laboratory every hour during production, ensuring each bottle that leaves the plant meets spec.",
  },
];

const containerSizes = [
  {
    size: "19 L",
    label: "5 Gallon",
    type: "Returnable",
    use: "Home & Office delivery",
    color: "bg-blue-50 border-blue-200",
    tag: "Most popular",
    image: "/bottles/19l.png",
  },
  {
    size: "12 L",
    label: "3 Gallon",
    type: "Returnable",
    use: "Retail markets",
    color: "bg-sky-50 border-sky-200",
    image: "/bottles/12l.png",
  },
  {
    size: "6 L",
    label: "6 Litre",
    type: "Non-Returnable",
    use: "Retail markets",
    color: "bg-cyan-50 border-cyan-200",
    image: "/bottles/6l.png",
  },
  {
    size: "1.5 L",
    label: "6 / Case",
    type: "Non-Returnable",
    use: "Retail markets",
    color: "bg-teal-50 border-teal-200",
    image: "/bottles/1-5l.png",
  },
  {
    size: "0.5 L",
    label: "12 / Case",
    type: "Non-Returnable",
    use: "Retail markets",
    color: "bg-emerald-50 border-emerald-200",
    image: "/bottles/500ml.png",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45 },
  }),
};

export default function AboutWater() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

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
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#42a5f5] mb-3">
                About Bottled Water
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-5">
                Pure water.<br className="hidden sm:block" /> Pure difference.
              </h1>
              <p className="text-slate-600 text-base leading-relaxed max-w-xl">
                Everything you need to know about Culligan bottled water — why hydration matters, how we purify our water, our quality certifications, and which bottle sizes suit your needs.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Why hydration matters */}
        <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#42a5f5] mb-2">Hydration</p>
            <h2 className="text-3xl font-black text-slate-900">Why you should drink more water</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm leading-relaxed">
              The average person loses 2.5 litres of water daily through perspiration, respiration, urination, and evaporation. Replacing it consistently is one of the simplest things you can do for your health.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{b.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{b.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Purification process */}
        <section className="bg-slate-50 border-y border-slate-100">
          <div className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
            <div className="mb-10">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#42a5f5] mb-2">Purification</p>
              <h2 className="text-3xl font-black text-slate-900">How we purify our water</h2>
              <p className="text-slate-500 mt-3 max-w-xl text-sm leading-relaxed">
                From deep-well source to your door, every drop passes through six stages of purification — tested hourly in our on-site laboratory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {purificationSteps.map((s, i) => (
                <motion.div
                  key={s.step}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <span className="text-3xl font-black text-blue-100 leading-none shrink-0 select-none">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality standards */}
        <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#42a5f5] mb-2">Certifications</p>
            <h2 className="text-3xl font-black text-slate-900">Quality standards we meet</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm leading-relaxed">
              Culligan water is held to the highest national and international standards, independently verified through third-party certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {qualityStandards.map((s, i) => (
              <motion.div
                key={s.logo}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-black text-white leading-tight text-center px-1">{s.logo}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.logo}</p>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">{s.name}</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bottle sizes */}
        <section className="bg-slate-50 border-y border-slate-100">
          <div className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
            <div className="mb-10">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#42a5f5] mb-2">Container Sizes</p>
              <h2 className="text-3xl font-black text-slate-900">Which bottle size is right for you?</h2>
              <p className="text-slate-500 mt-3 max-w-xl text-sm leading-relaxed">
                All bottles are PET plastic — safe, BPA-compliant, and recyclable. Returnable bottles are collected, sanitised, and reused to keep costs low and waste down.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {containerSizes.map((c, i) => (
                <motion.div
                  key={c.size}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className={`relative rounded-2xl border-2 ${c.color} flex flex-col overflow-hidden`}
                >
                  {c.tag && (
                    <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-bold text-blue-600 bg-white/90 rounded-full px-2 py-0.5 shadow-sm">
                      {c.tag}
                    </span>
                  )}
                  {/* Image */}
                  <div className="flex items-end justify-center pt-4 pb-2 px-4 h-36 bg-white/60">
                    <img
                      src={c.image}
                      alt={`Culligan ${c.size} bottle`}
                      className="h-full w-auto object-contain drop-shadow-md"
                    />
                  </div>
                  {/* Info */}
                  <div className="p-4 flex flex-col gap-1">
                    <span className="text-xl font-black text-slate-900 leading-none">{c.size}</span>
                    <span className="text-xs font-semibold text-slate-500">{c.label}</span>
                    <span className="mt-2 text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Recycle className="w-3 h-3 shrink-0" />
                      {c.type}
                    </span>
                    <span className="text-xs text-slate-500">{c.use}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Shelf life note */}
            <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-100 flex gap-3">
              <Package className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-800 mb-1">Shelf life & storage</p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  All sizes have a one-year shelf life. Store in a cool (5°C–25°C), dark, dry place away from chemicals, detergents, and direct sunlight. Smaller bottles (0.5L, 1.5L, 6L) have an optimal shelf life of 6 months due to thinner plastic, but remain drinkable for one year.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety of PET plastic */}
        <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
          <div className="mb-8">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#42a5f5] mb-2">Packaging</p>
            <h2 className="text-3xl font-black text-slate-900">Is PET plastic safe?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="prose prose-sm text-slate-500 leading-relaxed space-y-4">
              <p>
                Culligan uses PET (polyethylene terephthalate) — a clear, tough polymer with an excellent barrier against oxygen and carbon dioxide. It is the same material used in food packaging worldwide.
              </p>
              <p>
                According to the ILSI 2000 report, PET is <strong>biologically inert if ingested</strong>, <strong>dermally safe during handling</strong>, and <strong>not a hazard if inhaled</strong>. We do not use glass because PET is lighter, safer to deliver, and fully recyclable.
              </p>
              <p className="text-amber-700 bg-amber-50 border border-amber-100 rounded-xl p-4 not-prose text-xs font-medium">
                ⚠️ Important: Do not re-use the bottle after consuming water from it. Returnable 3 and 5-gallon bottles are professionally sanitised by Culligan between uses — single-use bottles are not designed for refilling.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Biologically inert if ingested (ILSI 2000)",
                "Dermally safe during normal handling",
                "No hazard from inhalation",
                "Does not leach chemicals under normal storage conditions",
                "Fully recyclable — collected and reused (returnable sizes)",
                "Lighter and safer to transport than glass",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#1d6fa4] to-[#42a5f5]">
          <div className="container mx-auto px-4 md:px-6 py-14 text-center max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-black text-white mb-2">Ready to start your delivery?</h2>
              <p className="text-blue-100 text-sm mb-7">
                Culligan delivers to homes and offices across Karachi. Place your first order on WhatsApp — no forms, no hassle.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/923222584525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#1d6fa4] bg-white hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Order on WhatsApp
                </a>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white border border-white/30 hover:bg-white/10 transition-colors"
                >
                  Read the FAQs
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
