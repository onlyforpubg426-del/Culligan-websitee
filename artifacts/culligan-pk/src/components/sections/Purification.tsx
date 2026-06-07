import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Beaker, CheckCircle, ChevronLeft, ChevronRight, Filter, FlaskConical, Microscope, Package, Waves } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Waves,
    title: "Source Collection",
    description: "Carefully selected raw water sources from controlled, monitored supply points across the region.",
    accent: { from: "#e0f2fe", to: "#f0f9ff", border: "#bae6fd", icon: "#0284c7", glow: "rgba(2,132,199,0.18)", ring: "#bae6fd" },
  },
  {
    number: "02",
    icon: Filter,
    title: "Pre-Filtration",
    description: "Removes sediment, rust, and larger particles using multi-stage sediment and carbon filters.",
    accent: { from: "#dbeafe", to: "#eff6ff", border: "#bfdbfe", icon: "#1d4ed8", glow: "rgba(29,78,216,0.18)", ring: "#bfdbfe" },
  },
  {
    number: "03",
    icon: Microscope,
    title: "Reverse Osmosis",
    description: "Micro-purification at the molecular level — removing dissolved solids, heavy metals, and contaminants.",
    accent: { from: "#e0e7ff", to: "#f5f3ff", border: "#c7d2fe", icon: "#4f46e5", glow: "rgba(79,70,229,0.18)", ring: "#c7d2fe" },
  },
  {
    number: "04",
    icon: FlaskConical,
    title: "Ozonation Treated",
    description: "Natural sanitization without harsh chemicals — ozone eliminates bacteria, viruses, and microbes.",
    accent: { from: "#cffafe", to: "#f0f9ff", border: "#a5f3fc", icon: "#0891b2", glow: "rgba(8,145,178,0.18)", ring: "#a5f3fc" },
  },
  {
    number: "05",
    icon: Beaker,
    title: "Quality Testing",
    description: "Rigorous lab testing performed on every batch before bottling — documented and certified.",
    accent: { from: "#d1fae5", to: "#f0fdf4", border: "#a7f3d0", icon: "#059669", glow: "rgba(5,150,105,0.18)", ring: "#a7f3d0" },
  },
  {
    number: "06",
    icon: Package,
    title: "Sealed & Delivered",
    description: "Tamper-proof seals applied before delivery — your water is as pure at your door as when it left our facility.",
    accent: { from: "#dbeafe", to: "#eff6ff", border: "#bfdbfe", icon: "#1976d2", glow: "rgba(25,118,210,0.18)", ring: "#bfdbfe" },
  },
];

const AUTOPLAY_MS = 4000;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.97 }),
};

export function Purification() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((idx: number, direction?: number) => {
    const d = direction ?? (idx > current ? 1 : -1);
    setDir(d);
    setCurrent(idx);
    setProgress(0);
  }, [current]);

  const next = useCallback(() => {
    const n = (current + 1) % steps.length;
    goTo(n, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    const n = (current - 1 + steps.length) % steps.length;
    goTo(n, -1);
  }, [current, goTo]);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    setProgress(0);
    const TICK = 50;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (TICK / AUTOPLAY_MS) * 100, 100));
    }, TICK);

    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        setDir(1);
        setProgress(0);
        return (c + 1) % steps.length;
      });
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, paused]);

  const step = steps[current];
  const Icon = step.icon;

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
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
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
              <span className="absolute bottom-1 left-0 right-0 h-3 rounded-full opacity-20 -z-0" style={{ background: "#2196f3" }} />
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

        {/* ── Carousel ── */}
        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Step pills / progress tracker */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {steps.map((s, i) => {
              const active = i === current;
              return (
                <button
                  key={s.number}
                  onClick={() => goTo(i)}
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer"
                  style={{
                    background: active ? `linear-gradient(135deg,${s.accent.from},${s.accent.to})` : "white",
                    borderColor: active ? s.accent.border : "#e2e8f0",
                    boxShadow: active ? `0 2px 12px ${s.accent.glow}` : "none",
                  }}
                >
                  <span
                    className="w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center leading-none transition-all"
                    style={{
                      background: active ? s.accent.icon : "#cbd5e1",
                      color: "white",
                    }}
                  >
                    {parseInt(s.number)}
                  </span>
                  <span
                    className="text-[11px] font-bold hidden sm:block transition-colors"
                    style={{ color: active ? s.accent.icon : "#94a3b8" }}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main Card */}
          <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: 340 }}>
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={current}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative w-full rounded-3xl border overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${step.accent.from} 0%, white 45%, ${step.accent.to} 100%)`,
                  borderColor: step.accent.border,
                  boxShadow: `0 8px 48px 0 ${step.accent.glow}, 0 2px 8px rgba(0,0,0,0.04)`,
                }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${step.accent.icon}, ${step.accent.border}, ${step.accent.icon})` }}
                />

                {/* Watermark number */}
                <span
                  className="absolute -bottom-6 right-4 text-[160px] md:text-[200px] font-black leading-none select-none pointer-events-none"
                  style={{ color: step.accent.icon, opacity: 0.05 }}
                >
                  {step.number}
                </span>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
                  {/* Icon area */}
                  <div className="shrink-0 flex flex-col items-center gap-3">
                    <motion.div
                      key={`icon-${current}`}
                      initial={{ scale: 0.7, rotate: -10, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 22 }}
                      className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, white, ${step.accent.from})`,
                        border: `2px solid ${step.accent.border}`,
                        boxShadow: `0 8px 32px ${step.accent.glow}, 0 0 0 6px ${step.accent.ring}40`,
                      }}
                    >
                      <Icon className="h-9 w-9 md:h-11 md:w-11" style={{ color: step.accent.icon }} />
                    </motion.div>

                    {/* Step label */}
                    <span
                      className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                      style={{ background: `${step.accent.icon}18`, color: step.accent.icon }}
                    >
                      Step {step.number}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      key={`title-${current}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12, duration: 0.35 }}
                      className="text-2xl md:text-3xl font-black text-slate-900 mb-3 leading-tight"
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p
                      key={`desc-${current}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18, duration: 0.35 }}
                      className="text-base md:text-lg text-slate-500 leading-relaxed max-w-lg"
                    >
                      {step.description}
                    </motion.p>

                    {/* Mini step indicators */}
                    <div className="flex items-center gap-1.5 mt-6">
                      {steps.map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            width: i === current ? 28 : 6,
                            opacity: i === current ? 1 : 0.3,
                          }}
                          transition={{ duration: 0.35 }}
                          className="h-1.5 rounded-full cursor-pointer"
                          style={{ background: step.accent.icon }}
                          onClick={() => goTo(i)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/5 rounded-b-3xl overflow-hidden">
                  <motion.div
                    className="h-full rounded-b-3xl"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${step.accent.icon}80, ${step.accent.icon})`,
                      transition: paused ? "none" : "width 50ms linear",
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:-translate-x-0.5"
              style={{ borderColor: step.accent.border }}
            >
              <ChevronLeft className="h-5 w-5" style={{ color: step.accent.icon }} />
            </button>

            <span className="text-sm font-semibold text-slate-400 tabular-nums min-w-[50px] text-center">
              {String(current + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </span>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:translate-x-0.5"
              style={{ borderColor: step.accent.border }}
            >
              <ChevronRight className="h-5 w-5" style={{ color: step.accent.icon }} />
            </button>
          </div>
        </div>

        {/* Trust badges */}
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
