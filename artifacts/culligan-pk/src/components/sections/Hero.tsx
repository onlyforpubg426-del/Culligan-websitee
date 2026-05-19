import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, CheckCircle, Phone, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const badges = [
  { icon: ShieldCheck, label: "Lab Certified" },
  { icon: Star,        label: "Since 1997" },
  { icon: Sparkles,    label: "RO Purified" },
];

export function Hero() {
  const shouldReduce = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(140deg, #001c4a 0%, #003580 35%, #0055cc 65%, #1a7fd4 88%, #4aa8f5 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-300/10 blur-3xl" />
        <div className="absolute top-0 right-1/3 w-[300px] h-[300px] rounded-full bg-white/5 blur-2xl" />

        {!shouldReduce && [...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.25, 0],
              scale: [0.3, 1, 0.3],
              y: [0, -80, -160],
              x: Math.sin(i * 1.1) * 30,
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              left: `${5 + (i / 18) * 90}%`,
              bottom: `${Math.random() * 30}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.6)",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="flex flex-col items-start">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="flex items-center gap-2 px-4 py-2 rounded-full
                         bg-white/10 backdrop-blur-md
                         border border-white/25
                         shadow-inner mb-7"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 text-sm font-medium tracking-wide">
                Free delivery across Karachi
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="text-5xl sm:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight"
            >
              Pure Water.
              <br />
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(90deg, #93d3ff, #c9eaff, #ffffff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Delivered.
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="mt-6 text-lg text-white/75 leading-relaxed max-w-lg"
            >
              Pakistan's trusted water brand since 1997. Government approved, internationally
              certified, and delivered fresh to your home or office in Karachi — because every
              drop counts.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="flex flex-wrap gap-4 mt-9"
            >
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden rounded-full px-8 h-13 text-base font-bold
                           bg-white text-primary hover:bg-white/90
                           shadow-xl shadow-blue-900/30"
              >
                <a href="#order">
                  Order Now
                  <span className="ml-2 inline-block">→</span>
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-7 h-13 text-base font-semibold
                           bg-white/10 backdrop-blur-md
                           border-white/30 text-white
                           hover:bg-white/20 hover:border-white/50"
              >
                <a href="tel:11135353535" className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4" />
                  111 35 35 35
                </a>
              </Button>
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="flex flex-wrap gap-4 mt-9"
            >
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full
                             bg-white/10 backdrop-blur-sm
                             border border-white/20
                             text-white/85 text-sm font-medium"
                >
                  <Icon className="h-3.5 w-3.5 text-sky-300" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: shouldReduce ? 0 : 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute w-[380px] h-[380px] rounded-full bg-sky-400/15 blur-3xl" />
            <div className="absolute w-[280px] h-[280px] rounded-full border border-white/15 animate-spin"
                 style={{ animationDuration: "20s" }} />
            <div className="absolute w-[360px] h-[360px] rounded-full border border-white/8 animate-spin"
                 style={{ animationDuration: "35s", animationDirection: "reverse" }} />

            <motion.div
              animate={shouldReduce ? {} : { y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <img
                src="/hero-product.jpg"
                alt="Culligan Water — Premium 19L bottle"
                className="h-72 md:h-96 w-auto object-contain drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0 30px 40px rgba(0, 40, 120, 0.45))",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute bottom-6 -left-4 md:-left-12 z-20
                         rounded-2xl px-4 py-3
                         bg-white/15 backdrop-blur-xl
                         border border-white/30
                         shadow-2xl shadow-black/20"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-green-400/20 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-300" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Free Delivery</div>
                  <div className="text-white/70 text-xs">Same-day in Karachi</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="absolute top-6 -right-4 md:-right-10 z-20
                         rounded-2xl px-4 py-3
                         bg-white/15 backdrop-blur-xl
                         border border-white/30
                         shadow-2xl shadow-black/20"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-yellow-300" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Certified Purity</div>
                  <div className="text-white/70 text-xs">Govt. approved</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5"
        >
          <span className="text-white/50 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={shouldReduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-5 w-5 text-white/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
