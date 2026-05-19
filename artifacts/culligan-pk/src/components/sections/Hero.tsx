import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, ShieldCheck, Truck } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
});

export function Hero() {
  return (
    <section
      className="relative flex items-center overflow-hidden min-h-[100svh]"
      style={{
        background: "linear-gradient(140deg, #64b0f0 0%, #6ebaf2 40%, #82c8f6 75%, #9dd8fb 100%)",
      }}
    >
      {/* ── Background depth layers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-0 w-[800px] h-[800px] rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[600px] h-[600px] rounded-full bg-sky-500/8 blur-3xl" />
        {/* Subtle grid texture */}
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
      <div className="container mx-auto px-4 md:px-6 pt-28 pb-12 md:pt-40 md:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-12 items-center">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 max-w-2xl mx-auto lg:mx-0">

            {/* Eyebrow — brand credential, tracked caps */}
            <motion.div {...fadeIn(0.05)}
              className="inline-flex items-center gap-2.5 mb-7 w-fit"
            >
              <div className="h-px w-6 bg-sky-400/70" />
              <span
                className="text-[11px] font-bold tracking-[0.22em] uppercase text-sky-300"
              >
                Pakistan's Premium Water Brand · Est. 1997
              </span>
            </motion.div>

            {/* Headline — ultra-tight, black weight, maximum size */}
            <motion.h1 {...fadeUp(0.12)}
              className="font-black text-white leading-[0.96] tracking-[-0.035em] mb-6"
              style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.5rem)" }}
            >
              Pakistan's Most{" "}
              <br className="hidden sm:block" />
              <span
                style={{
                  background: "linear-gradient(90deg, #7dd3fc 0%, #bae6fd 50%, #e0f2fe 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Trusted Water.
              </span>
              <br />
              <span className="text-white/90 font-extrabold tracking-[-0.025em]"
                style={{ fontSize: "0.62em" }}>
                Certified Quality. Delivered to Your Door.
              </span>
            </motion.h1>

            {/* Subheadline — short, benefit-first, human */}
            <motion.p {...fadeUp(0.22)}
              className="text-white/65 leading-[1.65] mb-3"
              style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.125rem)", maxWidth: "38ch" }}
            >
              RO-purified, ozonation-treated, government-certified water —
              free same-day delivery across Karachi.
            </motion.p>

            {/* Social proof line — tight, inline */}
            <motion.div {...fadeIn(0.3)}
              className="flex items-center justify-center lg:justify-start gap-2.5 mb-9"
            >
              <div className="flex -space-x-1">
                {["#1d7ed8","#2563eb","#1e40af","#0369a1"].map((c, i) => (
                  <div key={i}
                    className="w-6 h-6 rounded-full border-2 border-[#003580] bg-blue-400/30 flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: c }}
                  >
                    {["A","S","R","F"][i]}
                  </div>
                ))}
              </div>
              <span className="text-[13px] text-white/55">
                <span className="text-white/85 font-semibold">2,400+ families</span>
                {" "}trust Culligan every month
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.32)}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-8"
            >
              {/* Primary */}
              <a
                href="#order"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl
                           px-7 font-bold text-[15px] tracking-[-0.01em]
                           bg-white text-slate-900
                           shadow-[0_4px_24px_rgba(0,0,0,0.35),0_1px_4px_rgba(0,0,0,0.2)]
                           hover:bg-white/93 hover:shadow-[0_6px_32px_rgba(0,0,0,0.45)]
                           transition-all duration-200"
                style={{ height: "52px" }}
              >
                <svg className="h-5 w-5 text-[#25D366] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.854L.057 23.268a.75.75 0 00.917.915l5.428-1.473A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.741-.522-5.295-1.432l-.38-.223-3.923 1.065 1.068-3.898-.247-.394A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Order on WhatsApp
              </a>

              {/* Secondary */}
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl
                           px-6 font-semibold text-[15px] tracking-[-0.01em]
                           text-white/80 border border-white/20 backdrop-blur-sm
                           hover:text-white hover:border-white/40 hover:bg-white/6
                           transition-all duration-200"
                style={{ height: "52px" }}
              >
                See Pricing
                <ChevronRight className="h-4 w-4 opacity-70" />
              </a>
            </motion.div>

            {/* Trust strip — horizontal, minimal */}
            <motion.div {...fadeIn(0.44)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2"
            >
              {[
                { icon: Truck,       label: "Free same-day delivery"   },
                { icon: ShieldCheck, label: "Govt. certified purity"   },
                { icon: CheckCircle2,label: "Every batch lab-tested"   },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-sky-400 shrink-0" strokeWidth={2} />
                  <span className="text-[12.5px] text-white/55 font-medium">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Product image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center order-1 lg:order-2 w-full"
          >
            {/* Soft radial halo behind the image */}
            <div
              className="absolute inset-[-10%] rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)" }}
            />

            {/* Image card */}
            <div className="relative w-full rounded-[2rem] overflow-hidden
                            border border-white/15
                            shadow-[0_32px_80px_rgba(0,0,0,0.55)]
                            bg-white/5 backdrop-blur-sm">
              <img
                src={`${BASE}/hero-product.jpg`}
                alt="Culligan Water — Over 80 years of pure hydration"
                loading="eager"
                className="w-full h-auto object-contain block"
                style={{ maxHeight: "clamp(280px, 55vw, 680px)" }}
              />
              {/* Inset ring */}
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none" />
              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Floating pill — phone */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
              className="absolute -bottom-5 left-4
                         bg-white rounded-2xl px-4 py-3
                         shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                         flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-[0.1em]">Call to order</p>
                <p className="text-[13px] font-black text-slate-900 tracking-[-0.02em]">111&nbsp;35&nbsp;35&nbsp;35</p>
              </div>
            </motion.div>

            {/* Floating pill — delivery status */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.82, duration: 0.4, ease: "easeOut" }}
              className="absolute -top-5 right-4
                         rounded-2xl px-4 py-2.5
                         shadow-[0_8px_32px_rgba(0,0,0,0.15)]
                         border border-slate-100 backdrop-blur-xl
                         bg-white"
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                <p className="text-[11px] font-bold text-slate-800 tracking-[0.02em]">Free Delivery</p>
              </div>
              <p className="text-[10px] text-slate-400 tracking-[0.03em]">Same-day · Karachi</p>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#2196f3] to-transparent pointer-events-none" />
    </section>
  );
}
