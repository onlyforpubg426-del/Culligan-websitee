import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Star, Truck } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/* One-time entrance variants — run once on mount, then stop */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
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
        background:
          "linear-gradient(135deg, #1a6fd4 0%, #2e8ee8 55%, #4aa8f5 100%)",
      }}
    >
      {/* ── Static background glows (no animation — GPU-composited) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-sky-300/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-200/8 blur-2xl" />
      </div>

      {/* ── CSS-only bubbles (no JS, GPU-composited transform) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 18, left: "8%",  animDuration: "9s",  delay: "0s"   },
          { size: 26, left: "20%", animDuration: "12s", delay: "1.5s" },
          { size: 12, left: "35%", animDuration: "8s",  delay: "3s"   },
          { size: 22, left: "55%", animDuration: "11s", delay: "0.8s" },
          { size: 16, left: "70%", animDuration: "9s",  delay: "2s"   },
          { size: 28, left: "82%", animDuration: "13s", delay: "4s"   },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full bubble-rise"
            style={{
              width: b.size,
              height: b.size,
              left: b.left,
              bottom: "-5%",
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(255,255,255,0.07))",
              border: "1px solid rgba(255,255,255,0.22)",
              animationDuration: b.animDuration,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-10 md:pt-36 md:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Left: Text ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">

            {/* Trust badge */}
            <motion.div {...fadeIn(0.1)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm mb-5 w-fit"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-white/90">
                Trusted in Karachi since 1997
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.18)}
              className="text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-4 md:mb-6"
            >
              Pure Water.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-200">
                Delivered Fresh.
              </span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p {...fadeUp(0.28)}
              className="text-base md:text-lg text-white/75 mb-6 md:mb-9 max-w-lg leading-relaxed"
            >
              Premium water purification through reverse osmosis and ozonation.
              Free same-day home delivery across Karachi — pure water, every time.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.36)}
              className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-10"
            >
              <a
                href="#order"
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 h-12 md:h-14 text-sm md:text-base font-extrabold bg-white text-primary shadow-xl shadow-black/20 tracking-tight hover:bg-white/90 transition-colors"
              >
                <svg className="h-5 w-5 text-green-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.854L.057 23.268a.75.75 0 00.917.915l5.428-1.473A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.741-.522-5.295-1.432l-.38-.223-3.923 1.065 1.068-3.898-.247-.394A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Order on WhatsApp
              </a>

              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 h-12 md:h-14 text-sm md:text-base font-bold border-2 border-white/50 text-white backdrop-blur-sm tracking-tight hover:bg-white/10 hover:border-white/70 transition-colors"
              >
                View Products
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            {/* Trust pills */}
            <motion.div {...fadeUp(0.45)}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: Truck,       text: "Free same-day delivery",   iconColor: "text-emerald-500", iconRing: "bg-emerald-50" },
                { icon: ShieldCheck, text: "Lab certified every batch", iconColor: "text-primary",     iconRing: "bg-blue-50"   },
              ].map(({ icon: Icon, text, iconColor, iconRing }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 pl-2 pr-5 py-2 rounded-full bg-white shadow-lg shadow-black/25"
                >
                  <div className={`w-7 h-7 rounded-full ${iconRing} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-4 w-4 ${iconColor}`} strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-slate-800 font-semibold tracking-tight">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Hero image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center order-1 lg:order-2"
          >
            {/* Glass card */}
            <div className="relative w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black/40 backdrop-blur-sm bg-white/5">
              <img
                src={`${BASE}/hero-product.jpg`}
                alt="Culligan Water — Over 80 years of pure hydration"
                loading="eager"
                className="w-full h-auto object-contain block"
                style={{ maxHeight: "clamp(200px, 38vw, 62vh)" }}
              />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>

            {/* Floating badge — phone */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.45, ease: "easeOut" }}
              className="absolute -bottom-4 left-6 bg-white rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Order by phone</p>
                <p className="text-sm font-bold text-slate-900">UAN: 111 35 35 35</p>
              </div>
            </motion.div>

            {/* Floating badge — delivery */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.88, duration: 0.45, ease: "easeOut" }}
              className="absolute -top-4 right-6 bg-primary rounded-2xl px-4 py-2.5 shadow-xl shadow-primary/30"
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                <p className="text-xs font-bold text-white">Free Delivery</p>
              </div>
              <p className="text-[10px] text-white/80">Across Karachi</p>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 pointer-events-none" />
    </section>
  );
}
