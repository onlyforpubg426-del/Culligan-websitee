import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Beaker, CheckCircle, Filter, FlaskConical, Microscope, Package, Waves } from "lucide-react";

const steps = [
  {
    number: "01",
    icon:   Waves,
    title:  "Source Collection",
    description: "Carefully selected raw water sources from controlled, monitored supply points across the region.",
    color:  { bg: "bg-sky-50",     icon: "text-sky-600",     border: "border-sky-100",     glow: "rgba(14,165,233,0.18)"  },
  },
  {
    number: "02",
    icon:   Filter,
    title:  "Pre-Filtration",
    description: "Removes sediment, rust, and larger particles using multi-stage sediment and carbon filters.",
    color:  { bg: "bg-blue-50",    icon: "text-blue-600",    border: "border-blue-100",    glow: "rgba(33,150,243,0.18)"  },
  },
  {
    number: "03",
    icon:   Microscope,
    title:  "Reverse Osmosis",
    description: "Micro-purification at the molecular level — removing dissolved solids, heavy metals, and contaminants.",
    color:  { bg: "bg-indigo-50",  icon: "text-indigo-600",  border: "border-indigo-100",  glow: "rgba(99,102,241,0.16)"  },
  },
  {
    number: "04",
    icon:   FlaskConical,
    title:  "Ozonation Treated",
    description: "Natural sanitization without harsh chemicals — ozone eliminates bacteria, viruses, and microbes.",
    color:  { bg: "bg-violet-50",  icon: "text-violet-600",  border: "border-violet-100",  glow: "rgba(139,92,246,0.16)"  },
  },
  {
    number: "05",
    icon:   Beaker,
    title:  "Quality Testing",
    description: "Rigorous lab testing performed on every batch before bottling — documented and certified.",
    color:  { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100", glow: "rgba(16,185,129,0.16)"  },
  },
  {
    number: "06",
    icon:   Package,
    title:  "Sealed & Delivered",
    description: "Tamper-proof seals applied before delivery — your water is as pure at your door as when it left our facility.",
    color:  { bg: "bg-blue-50",    icon: "text-blue-600",    border: "border-blue-100",    glow: "rgba(33,150,243,0.20)"  },
  },
];

function StepCard({ step, index }: { step: typeof steps[number]; index: number }) {
  const ref       = useRef<HTMLDivElement>(null);
  const inView    = useInView(ref, { once: true, margin: "-60px" });
  const Icon      = step.icon;
  const isLeft    = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid lg:grid-cols-[1fr_72px_1fr] lg:gap-0 gap-4 items-center">

      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
        className={`${isLeft ? "lg:block" : "lg:hidden"}`}
      >
        {isLeft && <StepContent step={step} align="right" index={index} />}
      </motion.div>

      {/* Centre timeline node */}
      <div className="hidden lg:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.07 + 0.15, type: "spring", stiffness: 300, damping: 22 }}
          className={`relative z-10 w-14 h-14 rounded-2xl ${step.color.bg} ${step.color.border} border-2
                      flex items-center justify-center ${step.color.icon}
                      shadow-step`}
          style={{ boxShadow: `0 4px 24px ${step.color.glow}, 0 1px 4px rgba(0,0,0,0.06)` }}
        >
          <Icon className="h-6 w-6" />
          {/* Step number badge */}
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-900 text-white
                           text-[10px] font-black flex items-center justify-center leading-none">
            {step.number}
          </span>
        </motion.div>
      </div>

      {/* Right content */}
      <motion.div
        initial={{ opacity: 0, x: 28 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
        className={`${isLeft ? "lg:hidden" : "lg:block"}`}
      >
        {!isLeft && <StepContent step={step} align="left" index={index} />}
      </motion.div>

      {/* Mobile layout — always shown below md */}
      <div className="lg:hidden flex items-start gap-4 col-span-full">
        <div className={`relative shrink-0 w-12 h-12 rounded-xl ${step.color.bg} ${step.color.border} border
                         flex items-center justify-center ${step.color.icon}`}
             style={{ boxShadow: `0 4px 16px ${step.color.glow}` }}>
          <Icon className="h-5 w-5" />
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-900 text-white
                           text-[10px] font-black flex items-center justify-center leading-none">
            {step.number.replace("0", "")}
          </span>
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-1">{step.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
        </div>
      </div>
    </div>
  );
}

function StepContent({
  step,
  align,
}: {
  step: typeof steps[number];
  align: "left" | "right";
  index: number;
}) {
  return (
    <div
      className={`rounded-3xl p-6 border shadow-step transition-all duration-300
                  hover:shadow-[0_8px_36px_rgba(33,150,243,0.16),0_2px_8px_rgba(0,0,0,0.05)]
                  bg-white ${step.color.border}
                  ${align === "right" ? "lg:mr-6 lg:text-right" : "lg:ml-6"}`}
    >
      <div
        className={`flex items-center gap-2 mb-3 ${align === "right" ? "lg:flex-row-reverse" : ""}`}
      >
        <span
          className={`text-[11px] font-black tracking-[0.18em] uppercase ${step.color.icon}`}
        >
          Step {step.number}
        </span>
        <div className={`h-px flex-1 ${step.color.bg} border-t ${step.color.border}`} />
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-2">{step.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
    </div>
  );
}

export function Purification() {
  const lineRef    = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true });

  return (
    <section id="purification" ref={sectionRef} className="py-24 bg-slate-50/60 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky-100/25 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-2"
            style={{ color: "#1d6fa4" }}
          >
            How We Purify
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-2 text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          >
            The Science Behind Pure Water
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mt-4 text-base text-slate-500 max-w-lg mx-auto leading-relaxed"
          >
            A meticulous 6-step process ensuring absolute purity — from source to your door.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line — desktop only */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 top-7 bottom-7 w-px -translate-x-1/2 overflow-hidden"
            style={{ background: "linear-gradient(to bottom, #e2e8f0, #e2e8f0)" }}
          >
            <motion.div
              initial={{ scaleY: 0, transformOrigin: "top" }}
              animate={lineInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
              className="w-full h-full"
              style={{ background: "linear-gradient(to bottom, #42a5f5, #93c5fd, #42a5f5)", transformOrigin: "top" }}
            />
          </div>

          <div className="space-y-6 lg:space-y-8">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-8
                     border-t border-slate-200 pt-10"
        >
          {[
            "No harsh chemicals",
            "Every batch tested",
            "Sealed before delivery",
            "International standards",
          ].map((label) => (
            <div key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full
                         bg-white border border-slate-200 shadow-card
                         text-sm font-semibold text-slate-700"
            >
              <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
