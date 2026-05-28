import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, ShieldCheck, Truck } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as unknown as string },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
});

export function Hero() {
  return (
    <section
      className="relative flex flex-col"
      style={{
        minHeight: "100svh",
        background: "linear-gradient(140deg, #dcf1ff 0%, #e2f4ff 40%, #ecf8ff 75%, #f4fbff 100%)",
      }}
    >
      {/* ── Background depth layers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-0 w-[800px] h-[800px] rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[600px] h-[600px] rounded-full bg-sky-500/8 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── CSS-only bubbles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 16, left: "7%",  dur: "10s", delay: "0s"   },
          { size: 24, left: "19%", dur: "13s", delay: "1.8s" },
          { size: 11, left: "34%", dur: "8s",  delay: "3.2s" },
          { size: 20, left: "56%", dur: "12s", delay: "0.6s" },
          { size: 14, left: "71%", dur: "9s",  delay: "2.4s" },
          { size: 26, left: "84%", dur: "14s", delay: "4.5s" },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full bubble-rise"
            style={{
              width: b.size, height: b.size, left: b.left, bottom: "-4%",
              background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(255,255,255,0.06))",
              border: "1px solid rgba(255,255,255,0.18)",
              animationDuration: b.dur,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-2 lg:gap-16 items-center">

            {/* ── Left: Copy ── */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

              {/* Eyebrow */}
              <motion.div {...fadeIn(0.05)}
                className="mb-2 w-full"
              >
                <span
                  className="text-[11px] font-extrabold tracking-[0.22em] uppercase block text-center lg:text-center"
                  style={{ color: "#1d6fa4" }}
                >
                  Pakistan's Premium Water Brand · Est. 1997
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 {...fadeUp(0.12)}
                className="font-black text-slate-900 leading-[0.96] tracking-[-0.035em] mb-5"
                style={{ fontSize: "clamp(2.2rem, 5vw, 5.2rem)" }}
              >
                Pakistan's Most{" "}
                <br className="hidden sm:block" />
                <span
                  style={{
                    background: "linear-gradient(90deg, #1d6fa4 0%, #2196f3 50%, #42a5f5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Trusted Water.
                </span>
                <br />
                <span className="text-slate-700 font-extrabold tracking-[-0.025em] block"
                  style={{ fontSize: "clamp(0.85rem, 2vw, 2.4rem)" }}>
                  Certified Quality.{" "}
                  <span className="whitespace-nowrap">Delivered to Your Door.</span>
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p {...fadeUp(0.22)}
                className="text-slate-600 font-medium leading-[1.7] mb-3"
                style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.1rem)", maxWidth: "42ch" }}
              >
                RO purified, ozonation-treated, government certified water, free same day delivery across Karachi.
              </motion.p>

              {/* Social proof */}
              <motion.div {...fadeIn(0.3)}
                className="flex items-center justify-center lg:justify-start mb-7"
              >
                <span className="text-[13px] text-slate-500">
                  <span className="text-slate-800 font-bold">10,000+ families</span>
                  {" "}trust Culligan every month
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div {...fadeUp(0.32)}
                className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-7 w-full sm:w-auto"
              >
                <a
                  href="#order"
                  className="btn-cta-primary inline-flex items-center justify-center gap-2 rounded-xl
                             px-6 font-bold text-[14px] tracking-[-0.01em]
                             text-white
                             w-full sm:w-auto"
                  style={{
                    height: "48px",
                    background: "#42a5f5",
                  }}
                >
                  <svg className="h-4 w-4 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.854L.057 23.268a.75.75 0 00.917.915l5.428-1.473A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.741-.522-5.295-1.432l-.38-.223-3.923 1.065 1.068-3.898-.247-.394A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Order on WhatsApp
                </a>

                <a
                  href="#products"
                  className="btn-cta-secondary inline-flex items-center justify-center gap-1.5 rounded-xl
                             px-6 font-bold text-[14px] tracking-[-0.01em]
                             bg-white/80 backdrop-blur-sm text-slate-800
                             border border-white
                             w-full sm:w-auto"
                  style={{ height: "48px" }}
                >
                  See Pricing
                  <ChevronRight className="h-4 w-4 opacity-60" />
                </a>
              </motion.div>

              {/* Trust pills */}
              <motion.div {...fadeIn(0.44)}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2"
              >
                {[
                  { icon: Truck,        label: "Free same-day delivery", color: "text-sky-600",     bg: "bg-sky-100"     },
                  { icon: ShieldCheck,  label: "Govt. certified purity", color: "text-emerald-600", bg: "bg-emerald-100" },
                  { icon: CheckCircle2, label: "Every batch lab-tested", color: "text-violet-600",  bg: "bg-violet-100"  },
                ].map(({ icon: Icon, label, color, bg }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-2 pl-1.5 pr-4 py-1.5
                               rounded-full border border-white/70
                               bg-white/70 backdrop-blur-md
                               hover:bg-white transition-colors duration-200"
                  >
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 ${bg}`}>
                      <Icon className={`h-3.5 w-3.5 ${color} shrink-0`} strokeWidth={2.2} />
                    </span>
                    <span className="text-[12px] text-slate-700 font-semibold tracking-[-0.01em] whitespace-nowrap">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Product image ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] as unknown as string }}
              className="relative flex items-center justify-center order-1 lg:order-2 w-full"
            >
              {/* Soft radial halo behind the image */}
              <div
                className="absolute inset-[-10%] rounded-full blur-3xl opacity-50 pointer-events-none"
                style={{ background: "radial-gradient(circle, #93c5fd 0%, transparent 68%)" }}
              />

              <div className="relative w-full mx-auto px-1 pt-4 pb-5 sm:px-3 sm:pt-5 sm:pb-6" style={{ maxWidth: "580px" }}>

                {/* Image card — no pills inside so nothing is clipped */}
                <div className="relative w-full rounded-[2rem] overflow-hidden
                                border border-white/30
                                shadow-[0_20px_60px_rgba(33,150,243,0.35),0_2px_16px_rgba(255,255,255,0.18)]
                                bg-white/10 backdrop-blur-sm">
                  <img
                    src={`${BASE}/hero-product.jpg`}
                    alt="Culligan Water — Over 80 years of pure hydration"
                    loading="eager"
                    className="w-full h-auto object-contain block"
                    style={{ maxHeight: "clamp(300px, 72vw, 640px)" }}
                  />
                  <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none" />
                </div>

                {/* Phone pill — overlaps bottom-left card edge */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.35, ease: "easeOut" }}
                  className="absolute bottom-3 left-0
                             flex items-center gap-2
                             bg-white/90 backdrop-blur-xl rounded-2xl px-3 py-2
                             shadow-[0_8px_28px_rgba(33,150,243,0.22),0_1px_6px_rgba(255,255,255,0.5)]
                             border border-white/80"
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg,#64b0f0,#2196f3)" }}>
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[8px] text-slate-400 font-semibold uppercase tracking-[0.1em]">Call to order</p>
                    <p className="text-[12px] font-black text-slate-900 tracking-[-0.02em]">111&nbsp;35&nbsp;35&nbsp;35</p>
                  </div>
                </motion.div>

                {/* Delivery pill — overlaps top-right card edge */}
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.35, ease: "easeOut" }}
                  className="absolute top-2 right-0
                             rounded-2xl px-3 py-2
                             shadow-[0_8px_28px_rgba(33,150,243,0.22),0_1px_6px_rgba(255,255,255,0.5)]
                             border border-white/80 backdrop-blur-xl
                             bg-white/90"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot shadow-[0_0_5px_rgba(52,211,153,0.7)]" />
                    <p className="text-[10px] font-bold text-slate-800 tracking-[0.02em]">Free Delivery</p>
                  </div>
                  <p className="text-[9px] text-slate-500 font-medium tracking-[0.03em]">Same-day · Karachi</p>
                </motion.div>


              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#e8f7ff] to-transparent pointer-events-none" />
    </section>
  );
}
