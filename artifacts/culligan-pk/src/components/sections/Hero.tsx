import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: EASE },
});

const STATS = [
  { value: "10K+",  label: "Families Served" },
  { value: "27yrs", label: "Trusted Since 1997" },
  { value: "RO+O₃", label: "Dual Purification" },
];

export function Hero() {
  return (
    <section
      className="relative flex flex-col overflow-hidden lg:[min-height:min(100svh,900px)]"
      style={{
        background: "linear-gradient(140deg, #dcf1ff 0%, #e2f4ff 40%, #ecf8ff 75%, #f4fbff 100%)",
      }}
    >
      {/* ── Ambient depth layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-20 w-[700px] h-[700px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #bae6fd 0%, transparent 65%)" }} />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #93c5fd 0%, transparent 65%)" }} />
      </div>

      {/* ── Water ripples ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { cx: "18%",  cy: "30%", size: 320, dur: "4.2s", delay: "0s"    },
          { cx: "18%",  cy: "30%", size: 320, dur: "4.2s", delay: "1.4s"  },
          { cx: "18%",  cy: "30%", size: 320, dur: "4.2s", delay: "2.8s"  },
          { cx: "72%",  cy: "60%", size: 420, dur: "5.5s", delay: "0.8s"  },
          { cx: "72%",  cy: "60%", size: 420, dur: "5.5s", delay: "2.6s"  },
          { cx: "72%",  cy: "60%", size: 420, dur: "5.5s", delay: "4.4s"  },
          { cx: "45%",  cy: "80%", size: 260, dur: "3.8s", delay: "1.9s"  },
          { cx: "45%",  cy: "80%", size: 260, dur: "3.8s", delay: "3.8s"  },
          { cx: "88%",  cy: "18%", size: 200, dur: "4.8s", delay: "0.4s"  },
          { cx: "88%",  cy: "18%", size: 200, dur: "4.8s", delay: "2.8s"  },
        ].map((r, i) => (
          <div
            key={i}
            className="absolute water-ripple rounded-full"
            style={{
              width: r.size,
              height: r.size,
              left: `calc(${r.cx} - ${r.size / 2}px)`,
              top:  `calc(${r.cy} - ${r.size / 2}px)`,
              border: "1.5px solid rgba(33,150,243,0.22)",
              boxShadow: "0 0 12px rgba(33,150,243,0.08) inset",
              animationDuration: r.dur,
              animationDelay: r.delay,
            }}
          />
        ))}
      </div>

      {/* ── Rising bubbles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 9,  left: "4%",  dur: "11s",  delay: "0s",    cls: "bubble-rise"      },
          { size: 18, left: "10%", dur: "32s",  delay: "3.5s",  cls: "bubble-rise-slow" },
          { size: 7,  left: "16%", dur: "9s",   delay: "1.2s",  cls: "bubble-rise"      },
          { size: 26, left: "21%", dur: "38s",  delay: "0.5s",  cls: "bubble-rise-slow" },
          { size: 11, left: "28%", dur: "12s",  delay: "4.8s",  cls: "bubble-rise"      },
          { size: 6,  left: "34%", dur: "8.5s", delay: "2.2s",  cls: "bubble-rise"      },
          { size: 20, left: "40%", dur: "30s",  delay: "6s",    cls: "bubble-rise-slow" },
          { size: 8,  left: "47%", dur: "10s",  delay: "1.8s",  cls: "bubble-rise"      },
          { size: 14, left: "53%", dur: "13s",  delay: "0.9s",  cls: "bubble-rise"      },
          { size: 30, left: "60%", dur: "42s",  delay: "3s",    cls: "bubble-rise-slow" },
          { size: 9,  left: "66%", dur: "11s",  delay: "5.5s",  cls: "bubble-rise"      },
          { size: 16, left: "72%", dur: "14s",  delay: "2.7s",  cls: "bubble-rise"      },
          { size: 5,  left: "78%", dur: "8s",   delay: "0.3s",  cls: "bubble-rise"      },
          { size: 22, left: "83%", dur: "35s",  delay: "4.2s",  cls: "bubble-rise-slow" },
          { size: 10, left: "89%", dur: "11.5s",delay: "1.5s",  cls: "bubble-rise"      },
          { size: 7,  left: "94%", dur: "9.5s", delay: "3.8s",  cls: "bubble-rise"      },
        ].map((b, i) => (
          <div key={i} className={`absolute rounded-full ${b.cls}`} style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: "-6%",
            background: `radial-gradient(circle at 32% 28%,
              rgba(255,255,255,0.72) 0%,
              rgba(200,234,255,0.35) 35%,
              rgba(147,197,253,0.12) 70%,
              transparent 100%)`,
            border: "1px solid rgba(255,255,255,0.45)",
            boxShadow: "inset 0 -1px 3px rgba(147,197,253,0.3), 0 2px 6px rgba(33,150,243,0.08)",
            animationDuration: b.dur,
            animationDelay: b.delay,
          }}>
            {/* Highlight glint */}
            <div className="absolute rounded-full" style={{
              width: "35%", height: "25%",
              top: "14%", left: "18%",
              background: "rgba(255,255,255,0.7)",
              filter: "blur(1px)",
            }} />
          </div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex items-start lg:items-center relative z-10">
        <div className="w-full container mx-auto px-4 sm:px-8 pt-[62px] pb-6 sm:pt-[68px] lg:pt-[80px] lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-4 lg:gap-16 items-center">

            {/* ── Copy column ── */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

              {/* Top badge */}
              <motion.div {...rise(0.05)} className="mb-3">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase border"
                  style={{
                    background: "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(12px)",
                    borderColor: "rgba(147,197,253,0.35)",
                    boxShadow: "0 2px 12px rgba(33,150,243,0.10), 0 1px 0 rgba(255,255,255,0.85) inset",
                    color: "#1565c0",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Pakistan's #1 Water Brand · Est. 1997
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                {...rise(0.12)}
                className="font-black text-slate-900 leading-[0.94] tracking-[-0.04em] mb-3"
                style={{ fontSize: "clamp(1.85rem, 8vw, 5.2rem)" }}
              >
                Pure Water.{" "}
                <br />
                <span style={{
                  background: "linear-gradient(95deg, #0d47a1 0%, #1976d2 40%, #42a5f5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Delivered Fast.
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                {...rise(0.18)}
                className="font-bold text-slate-700 mb-0.5"
                style={{ fontSize: "clamp(0.88rem, 3.8vw, 1.15rem)" }}
              >
                Certified Quality, Delivered to Your Door.
              </motion.p>

              {/* Sub-headline */}
              <motion.p
                {...rise(0.24)}
                className="text-slate-500 leading-[1.5] mb-2"
                style={{ fontSize: "clamp(0.78rem, 3.2vw, 1rem)", maxWidth: "38ch" }}
              >
                RO purified, ozone-treated, government certified. Free same-day delivery across Karachi.
              </motion.p>

              {/* Star rating row */}
              <motion.div {...rise(0.26)} className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[12px] font-bold text-slate-700">4.9</span>
                <span className="text-[12px] text-slate-400 font-medium">· 10,000+ happy families</span>
              </motion.div>

              {/* CTAs */}
              <motion.div {...rise(0.3)} className="flex flex-col gap-2.5 w-full sm:w-auto mb-5">
                <a
                  href="#order"
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-2xl
                             font-bold text-[14px] sm:text-[15px] tracking-[-0.01em] text-white cursor-pointer w-full sm:w-auto sm:px-8"
                  style={{
                    height: "48px",
                    background: "linear-gradient(110deg, #1565c0 0%, #1976d2 40%, #42a5f5 100%)",
                    boxShadow: "0 8px 28px rgba(25,118,210,0.45), 0 1px 0 rgba(255,255,255,0.18) inset",
                  }}
                >
                  {/* shimmer */}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.2) 50%,transparent 60%)" }}
                    initial={{ x: "-110%" }}
                    animate={{ x: "210%" }}
                    transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.7, ease: "easeInOut" }}
                  />
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.854L.057 23.268a.75.75 0 00.917.915l5.428-1.473A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.741-.522-5.295-1.432l-.38-.223-3.923 1.065 1.068-3.898-.247-.394A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Order on WhatsApp
                </a>

                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-1.5 rounded-2xl
                             font-bold text-[13px] sm:text-[14px] text-slate-700 w-full sm:w-auto sm:px-8 cursor-pointer border"
                  style={{
                    height: "48px",
                    background: "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(10px)",
                    borderColor: "rgba(255,255,255,0.9)",
                    boxShadow: "0 2px 12px rgba(33,150,243,0.12), 0 1px 0 rgba(255,255,255,0.8) inset",
                  }}
                >
                  See Pricing
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </a>
              </motion.div>

              {/* Stats row */}
              <motion.div
                {...rise(0.38)}
                className="flex items-stretch divide-x divide-blue-100/40 rounded-2xl overflow-hidden w-full sm:w-auto"
                style={{
                  background: "rgba(255,255,255,0.70)",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 4px 24px rgba(33,150,243,0.12), 0 1.5px 0 rgba(255,255,255,0.95) inset, 0 0 0 1px rgba(147,197,253,0.18)",
                }}
              >
                {STATS.map(({ value, label }) => (
                  <div key={label} className="flex-1 flex flex-col items-center justify-center px-3 py-3 gap-0.5">
                    <span className="text-[18px] font-black text-slate-900 tracking-[-0.04em] leading-none">{value}</span>
                    <span className="text-[10px] text-slate-500 font-medium text-center leading-tight">{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Image column ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="relative flex items-center justify-center order-1 lg:order-2 w-full"
            >
              {/* Glow behind image */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-60 pointer-events-none"
                style={{ background: "radial-gradient(circle, #93c5fd 0%, transparent 65%)", transform: "scale(1.1)" }}
              />

              <div className="relative w-full mx-auto px-3 sm:px-0" style={{ maxWidth: "560px" }}>

                {/* Main image card */}
                <div
                  className="relative w-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden"
                  style={{
                    boxShadow: "0 24px 72px rgba(33,150,243,0.28), 0 8px 32px rgba(33,150,243,0.12), 0 0 0 1.5px rgba(255,255,255,0.18) inset",
                    background: "rgba(255,255,255,0.10)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <img
                    src={`${BASE}/hero-product.jpg`}
                    alt="Culligan Water — Pure hydration delivered"
                    loading="eager"
                    className="w-full h-auto object-contain block"
                    style={{ maxHeight: "clamp(220px, 55vw, 580px)" }}
                  />
                  <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] pointer-events-none"
                    style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(33,150,243,0.04) 100%)" }} />
                </div>

                {/* Phone pill — bottom-left */}
                <motion.div
                  initial={{ opacity: 0, x: -12, y: 6 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
                  className="absolute -bottom-2 -left-2 flex items-center gap-1.5 rounded-lg px-2 py-1.5"
                  style={{
                    background: "rgba(255,255,255,0.94)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 8px 28px rgba(33,150,243,0.18), 0 1.5px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(147,197,253,0.2)",
                  }}
                >
                  <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg,#42a5f5,#1565c0)" }}>
                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[7px] text-slate-400 font-semibold uppercase tracking-[0.1em] leading-none mb-0.5">Call to order</p>
                    <p className="text-[10px] font-black text-slate-900 tracking-[-0.02em] leading-none">111 35 35 35</p>
                  </div>
                </motion.div>

                {/* Delivery pill — top-right */}
                <motion.div
                  initial={{ opacity: 0, x: 12, y: -6 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.4, ease: "easeOut" }}
                  className="absolute -top-2 -right-2 rounded-lg px-2 py-1.5"
                  style={{
                    background: "rgba(255,255,255,0.94)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 8px 28px rgba(33,150,243,0.18), 0 1.5px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(147,197,253,0.2)",
                  }}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot"
                      style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }} />
                    <p className="text-[9px] font-black text-slate-800 tracking-[-0.01em]">Free Delivery</p>
                  </div>
                  <p className="text-[8px] text-slate-500 font-semibold">Same-day · Karachi</p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #e8f7ff, transparent)" }} />
    </section>
  );
}
