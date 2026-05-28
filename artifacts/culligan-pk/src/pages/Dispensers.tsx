import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Thermometer, Zap, Droplets, Leaf, AlertTriangle, CheckCircle2, MessageCircle } from "lucide-react";

const waOrder = (product: string) => {
  const msg = encodeURIComponent(`Hi, I'd like to order ${product}. Please confirm availability and delivery. Thank you!`);
  window.open(`https://wa.me/923222584525?text=${msg}`, "_blank");
};

const dispenserProducts = [
  {
    name: "Cradle Tap Stand",
    price: "Rs 1,000",
    image: "/cradle-tap-stand.jpg",
    specs: [
      "No heating/cooling element — more sanitary",
      "Simple gravity-fed tap mechanism",
      "Compatible with all standard gallon sizes",
      "Easy to clean & maintain",
      "Durable ABS construction",
    ],
  },
  {
    name: "Homage Dispenser",
    price: "Rs 27,500",
    image: "/homage-dispenser.png",
    specs: [
      "Hot & Cold Water",
      "Child Safety Lock",
      "Low Noise Design",
      "3 Taps",
      "Double Safety — overheat protection",
      "High-efficiency compressor cooling",
      "Indicator LEDs",
    ],
  },
  {
    name: "Tabletop Dispenser",
    price: "Rs 950",
    image: "/tabletop-dispenser.png",
    specs: [
      "Compatible with 12 Ltr & 19 Ltr gallons",
      "Dispenses water at room temperature",
      "Ideal for small kitchens",
    ],
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "HDPE Body",
    description: "Rust & scratch proof, resistant to cracking, fading, and yellowing. ABS plastic shock-absorbing base won't rust or stain.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Technology",
    description: "All materials are FDA approved, lead-free, and UV resistant — safe for your family and the environment.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: Droplets,
    title: "Safety Hot Tap",
    description: "Special tap design prevents unintentional hot water spills — built with children and adults in mind.",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: Thermometer,
    title: "Precision Temperature",
    description: "Thermostat delivers chilled water at 7°C and hot water at 85°C — consistently, every time.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    icon: Zap,
    title: "Energy-Efficient Compressor",
    description: "Uses only 0.8 amperes — significantly reduces your monthly electricity bills without compromising performance.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: CheckCircle2,
    title: "Smart Indicator Light",
    description: "A special switch with an indicator shows whether the unit is actively consuming electricity or heating water.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
];

const warrantyIncluded = [
  "Free service if the compressor fails due to material or workmanship defects within 6 months of purchase",
];

const warrantyExclusions = [
  "Damage from improper wiring, voltage issues, or short circuits",
  "Tampered or misused equipment",
  "Plastic parts",
];

export default function Dispensers() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-14">

        {/* Hero */}
        <div className="relative bg-gradient-to-br from-sky-50 via-white to-blue-50 overflow-hidden">
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
                Culligan Services
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-5">
                Hot &amp; Cold<br className="hidden sm:block" /> Dispensers
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Culligan offers imported hot &amp; cold electric dispensers — attractive, elegant, and packed with
                exceptional features built for home and office use.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-slate-600">Made by Crystal Mountain International · Canadian Brand</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Products */}
        <div className="container mx-auto px-4 md:px-6 py-16 border-b border-slate-100">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#42a5f5] mb-2">Available Now</p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Products</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dispenserProducts.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-black text-slate-900 text-lg leading-tight">{product.name}</h3>
                    <span className="shrink-0 text-lg font-black text-[#1d6fa4]">{product.price}</span>
                  </div>
                  <ul className="flex flex-col gap-1.5 mb-5 flex-1">
                    {product.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-2 text-[11px] text-slate-500 leading-snug">
                        <CheckCircle2 className="h-3 w-3 text-blue-400 shrink-0 mt-0.5" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => waOrder(`${product.name} (${product.price})`)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-white transition-all hover:brightness-105"
                    style={{ background: "#42a5f5", boxShadow: "0 4px 14px rgba(66,165,245,0.35)" }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features grid */}
        <div className="container mx-auto px-4 md:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#42a5f5] mb-2">What's Inside</p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Key Features</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, description, color, bg, border }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group rounded-2xl p-6 bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl ${bg} border ${border} flex items-center justify-center mb-4`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Warranty */}
        <div className="bg-slate-50 border-t border-b border-slate-100">
          <div className="container mx-auto px-4 md:px-6 py-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#42a5f5]/10 border border-[#42a5f5]/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#42a5f5]" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#42a5f5]">Coverage</p>
                  <h2 className="text-xl font-black text-slate-900">Warranty</h2>
                </div>
              </div>

              <div className="space-y-4">
                {/* What's covered */}
                <div className="bg-white rounded-2xl border border-emerald-100 p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">Covered</p>
                  {warrantyIncluded.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <p className="text-slate-700 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Exclusions */}
                <div className="bg-white rounded-2xl border border-amber-100 p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">Not Covered</p>
                  <div className="space-y-2">
                    {warrantyExclusions.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-slate-600 text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 md:px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <h2 className="text-2xl font-black text-slate-900 mb-3">Interested in a dispenser?</h2>
            <p className="text-slate-500 text-sm mb-6">
              Contact us on WhatsApp or call our UAN line to discuss rental and purchase options.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/923222584525"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:brightness-105"
                style={{ background: "#42a5f5", boxShadow: "0 8px 24px rgba(66,165,245,0.35)" }}
              >
                Order on WhatsApp
              </a>
              <a
                href="tel:+922111353535"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
              >
                Call 111 35 35 35
              </a>
            </div>
          </motion.div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
