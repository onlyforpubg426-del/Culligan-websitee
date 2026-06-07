import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Beaker, CheckCircle, Filter, FlaskConical, Microscope, Package, Waves } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Waves,
    title: "Source Collection",
    description: "Carefully selected raw water sources from controlled, monitored supply points across the region.",
    accent: { from: "#e0f2fe", to: "#f0f9ff", border: "#bae6fd", icon: "#0284c7", glow: "rgba(2,132,199,0.12)" },
  },
  {
    number: "02",
    icon: Filter,
    title: "Pre-Filtration",
    description: "Removes sediment, rust, and larger particles using multi-stage sediment and carbon filters.",
    accent: { from: "#dbeafe", to: "#eff6ff", border: "#bfdbfe", icon: "#1d4ed8", glow: "rgba(29,78,216,0.12)" },
  },
  {
    number: "03",
    icon: Microscope,
    title: "Reverse Osmosis",
    description: "Micro-purification at the molecular level — removing dissolved solids, heavy metals, and contaminants.",
    accent: { from: "#e0e7ff", to: "#f5f3ff", border: "#c7d2fe", icon: "#4f46e5", glow: "rgba(79,70,229,0.12)" },
  },
  {
    number: "04",
    icon: FlaskConical,
    title: "Ozonation Treated",
    description: "Natural sanitization without harsh chemicals — ozone eliminates bacteria, viruses, and microbes.",
    accent: { from: "#cffafe", to: "#f0f9ff", border: "#a5f3fc", icon: "#0891b2", glow: "rgba(8,145,178,0.12)" },
  },
  {
    number: "05",
    icon: Beaker,
    title: "Quality Testing",
    description: "Rigorous lab testing performed on every batch before bottling — documented and certified.",
    accent: { from: "#d1fae5", to: "#f0fdf4", border: "#a7f3d0", icon: "#059669", glow: "rgba(5,150,105,0.12)" },
  },
  {
    number: "06",
    icon: Package,
    title: "Sealed & Delivered",
    description: "Tamper-proof seals applied before delivery — your water is as pure at your door as when it left our facility.",
    accent: { from: "#dbeafe", to: "#eff6ff", border: "#bfdbfe", icon: "#1976d2", glow: "rgba(25,118,210,0.14)" },
  },
];

export function Purification() {
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true });

  return (
    <section
      id="purification"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #ffffff 40%, #f5fbff 70%, #eef7ff 100%)" }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 65%)", transform: "translate(-35%, -35%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, #cffafe 0%, transparent 65%)", transform: "translate(30%, 30%)" }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

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
            <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-blue-600">How We Purify</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight"
          >
            The Science Behind{" "}
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: "#1976d2" }}>Pure Water</span>
              <span
                className="absolute bottom-1 left-0 right-0 h-3 rounded-full opacity-20 -z-0"
                style={{ background: "#2196f3" }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-5 text-slate-500 text-base leading-relaxed max-w-md mx-auto"
          >
            A meticulous 6-step process ensuring absolute purity — from source to your door.
          </motion.p>
        </div>

        {/* ── Steps — Mobile: vertical cards, Desktop: alternating timeline ── */}

        {/* MOBILE layout */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="relative rounded-2xl bg-white border overflow-hidden flex items-start gap-4 p-4"
                style={{
                  borderColor: step.accent.border,
                  boxShadow: `0 2px 16px 0 ${step.accent.glow}, 0 1px 4px rgba(0,0,0,0.03)`,
                }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                  style={{ background: `linear-gradient(to bottom, ${step.accent.from}, ${step.accent.border})` }}
                />

                {/* Icon */}
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${step.accent.from}, ${step.accent.to})`, border: `1.5px solid ${step.accent.border}` }}
                >
                  <Icon className="h-5 w-5" style={{ color: step.accent.icon }} />
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-white text-[10px] font-black flex items-center justify-center leading-none shadow-sm"
                    style={{ background: step.accent.icon }}
                  >
                    {parseInt(step.number)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-extrabold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>

                {/* Watermark number */}
                <span
                  className="absolute -bottom-2 right-3 text-[64px] font-black leading-none select-none pointer-events-none opacity-[0.06]"
                  style={{ color: step.accent.icon }}
                >
                  {step.number}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* DESKTOP alternating timeline */}
        <div className="hidden lg:block relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 overflow-hidden"
            style={{ background: "#e2e8f0" }}
          >
            <motion.div
              initial={{ scaleY: 0, transformOrigin: "top" }}
              animate={lineInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
              className="w-full h-full"
              style={{ background: "linear-gradient(to bottom, #93c5fd, #bfdbfe, #93c5fd)", transformOrigin: "top" }}
            />
          </div>

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <div key={step.number} className="grid grid-cols-[1fr_80px_1fr] items-center gap-0">

                  {/* Left card */}
                  {isLeft ? (
                    <motion.div
                      initial={{ opacity: 0, x: -32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.45 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="relative mr-6 rounded-3xl bg-white border overflow-hidden p-6"
                      style={{
                        borderColor: step.accent.border,
                        boxShadow: `0 2px 24px 0 ${step.accent.glow}, 0 1px 4px rgba(0,0,0,0.04)`,
                      }}
                    >
                      <div className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full opacity-80"
                        style={{ background: `linear-gradient(90deg, ${step.accent.border}, ${step.accent.from})` }} />
                      <span className="absolute -bottom-3 -right-1 text-[80px] font-black leading-none select-none pointer-events-none opacity-[0.06]" style={{ color: step.accent.icon }}>{step.number}</span>
                      <p className="text-[10px] font-black tracking-[0.18em] uppercase mb-3" style={{ color: step.accent.icon }}>Step {step.number}</p>
                      <h3 className="text-xl font-black text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                    </motion.div>
                  ) : <div />}

                  {/* Centre node */}
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.15, type: "spring", stiffness: 280, damping: 20 }}
                      className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${step.accent.from}, ${step.accent.to})`,
                        border: `2px solid ${step.accent.border}`,
                        boxShadow: `0 4px 20px ${step.accent.glow}`,
                      }}
                    >
                      <Icon className="h-6 w-6" style={{ color: step.accent.icon }} />
                      <span
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-white text-[10px] font-black flex items-center justify-center leading-none shadow-sm"
                        style={{ background: step.accent.icon }}
                      >
                        {parseInt(step.number)}
                      </span>
                    </motion.div>
                  </div>

                  {/* Right card */}
                  {!isLeft ? (
                    <motion.div
                      initial={{ opacity: 0, x: 32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.45 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="relative ml-6 rounded-3xl bg-white border overflow-hidden p-6"
                      style={{
                        borderColor: step.accent.border,
                        boxShadow: `0 2px 24px 0 ${step.accent.glow}, 0 1px 4px rgba(0,0,0,0.04)`,
                      }}
                    >
                      <div className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full opacity-80"
                        style={{ background: `linear-gradient(90deg, ${step.accent.border}, ${step.accent.from})` }} />
                      <span className="absolute -bottom-3 -right-1 text-[80px] font-black leading-none select-none pointer-events-none opacity-[0.06]" style={{ color: step.accent.icon }}>{step.number}</span>
                      <p className="text-[10px] font-black tracking-[0.18em] uppercase mb-3" style={{ color: step.accent.icon }}>Step {step.number}</p>
                      <h3 className="text-xl font-black text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                    </motion.div>
                  ) : <div />}

                </div>
              );
            })}
          </div>
        </div>

        {/* ── Trust badges ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 rounded-3xl border p-6"
          style={{ background: "linear-gradient(135deg,#eff6ff 0%,#f0f9ff 50%,#e0f2fe 100%)", borderColor: "#bfdbfe" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "No harsh chemicals",
              "Every batch tested",
              "Sealed before delivery",
              "International standards",
            ].map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border text-sm font-semibold text-slate-700 shadow-sm"
                style={{ borderColor: "#bfdbfe" }}
              >
                <CheckCircle className="h-4 w-4 shrink-0" style={{ color: "#1976d2" }} />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
