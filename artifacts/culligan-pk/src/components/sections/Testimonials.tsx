import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "My kids refused tap water for years. Since switching to Culligan six months ago they actually drink enough water every day. The taste difference is real.",
    name: "Nadia Hussain",
    role: "Mother of three",
    location: "Gulshan-e-Iqbal, Karachi",
    stars: 5,
    seed: "NadiaHussain",
    color: "#1976d2",
  },
  {
    quote: "We run a 60-person office and have tried multiple water suppliers. Culligan is the only one that has never missed a delivery in two years.",
    name: "Tariq Mehmood",
    role: "General Manager",
    location: "Clifton Block 5, Karachi",
    stars: 5,
    seed: "TariqMehmood",
    color: "#7c3aed",
  },
  {
    quote: "The lab reports sealed the deal for me. I verified them independently — the TDS and mineral profile are exactly what they claim. Rare honesty in this market.",
    name: "Dr. Ambreen Siddiqui",
    role: "Nutritionist",
    location: "Aga Khan Hospital Area",
    stars: 5,
    seed: "AmbreenSiddiqui",
    color: "#059669",
  },
  {
    quote: "Switched from a local brand that kept changing quality. Culligan is consistent every single delivery. Worth every rupee for peace of mind.",
    name: "Imran Butt",
    role: "Restaurant Owner",
    location: "Bahadurabad, Karachi",
    stars: 4,
    seed: "ImranButt",
    color: "#d97706",
  },
  {
    quote: "The 19-litre dispenser was installed same day I called. The technician was professional, explained everything and left no mess. Great service culture.",
    name: "Saira Fatima",
    role: "Interior Designer",
    location: "DHA Phase 6",
    stars: 5,
    seed: "SairaFatima",
    color: "#db2777",
  },
  {
    quote: "I was skeptical about the price premium over local brands. One month in and the ozone-treated taste convinced my entire extended family to subscribe too.",
    name: "Babar Chaudhry",
    role: "Senior Engineer",
    location: "North Nazimabad, Karachi",
    stars: 5,
    seed: "BabarChaudhry",
    color: "#0284c7",
  },
  {
    quote: "Our café uses Culligan exclusively for espresso and cold brew. Customers genuinely comment on how clean the water tastes. It shows in every cup.",
    name: "Zainab Malik",
    role: "Café Owner",
    location: "Zamzama, Karachi",
    stars: 5,
    seed: "ZainabMalik",
    color: "#be185d",
  },
  {
    quote: "Delivery team is punctual and courteous. I've recommended Culligan to four neighbours — all have stuck with it. The 19L bottles are easy to handle too.",
    name: "Khalid Rauf",
    role: "Retired Teacher",
    location: "Gulberg Town, Karachi",
    stars: 4,
    seed: "KhalidRauf",
    color: "#4f46e5",
  },
  {
    quote: "As someone who tracks hydration carefully, I appreciate that Culligan's water doesn't have that flat, over-filtered taste. Minerals are still balanced.",
    name: "Mariam Qureshi",
    role: "Fitness Coach",
    location: "PECHS, Karachi",
    stars: 5,
    seed: "MariamQureshi",
    color: "#0f766e",
  },
  {
    quote: "The subscription plan removed all the hassle of reordering. Bottles arrive before I run out, and the app makes it easy to pause during travel.",
    name: "Ahmed Farooqi",
    role: "Entrepreneur",
    location: "Korangi Industrial Area",
    stars: 5,
    seed: "AhmedFarooqi",
    color: "#c2410c",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= count ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      className="relative flex-shrink-0 w-[320px] md:w-[360px] bg-white rounded-2xl p-6 mx-3 border border-slate-100 flex flex-col gap-4"
      style={{
        boxShadow: "0 2px 20px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Accent bar */}
      <div
        className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full"
        style={{ background: `linear-gradient(90deg, ${t.color}55, ${t.color}22)` }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mt-1">
        <StarRating count={t.stars} />
        <Quote className="w-7 h-7 opacity-[0.07]" style={{ color: t.color }} />
      </div>

      {/* Quote */}
      <p className="text-slate-700 text-[14px] leading-relaxed flex-1">
        "{t.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
        <img
          src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${t.seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&backgroundType=gradientLinear`}
          alt={t.name}
          className="w-10 h-10 rounded-full shrink-0 bg-slate-100"
          loading="lazy"
        />
        <div className="min-w-0">
          <div className="font-semibold text-slate-900 text-sm leading-tight truncate">{t.name}</div>
          <div className="text-[11.5px] text-slate-500 mt-0.5 truncate">{t.role} · {t.location}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
  const direction = reverse ? "marquee-reverse" : "marquee";
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden relative">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #f8fbff 0%, transparent 100%)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, #f8fbff 0%, transparent 100%)" }} />

      <div className={`flex ${direction}`}>
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

const socialProof = [
  { value: "10,000+", label: "Families served" },
  { value: "4.8 ★",  label: "Avg. customer rating" },
  { value: "27 yrs", label: "Serving Karachi" },
  { value: "99%",    label: "On-time delivery" },
];

export function Testimonials() {
  const row1 = testimonials.slice(0, 5);
  const row2 = testimonials.slice(5);

  return (
    <section
      id="testimonials"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8fbff 0%, #ffffff 40%, #f0f9ff 70%, #eef7ff 100%)" }}
    >
      {/* Blobs */}
      <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 65%)", transform: "translate(30%,-30%)" }} />
      <div className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #ede9fe 0%, transparent 65%)", transform: "translate(-25%,25%)" }} />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="container mx-auto px-4 md:px-6 text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border"
            style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", borderColor: "#bfdbfe" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-blue-600">Customer Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight"
          >
            Trusted by{" "}
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: "#1976d2" }}>10,000+ Families</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 rounded-full opacity-20 -z-0" style={{ background: "#2196f3" }} />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-5 text-slate-500 text-base leading-relaxed max-w-lg mx-auto"
          >
            Real customers. Real reviews. From homes, offices, cafés, and clinics across Karachi.
          </motion.p>
        </div>

        {/* ── Marquee rows ── */}
        <div className="flex flex-col gap-4">
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse />
        </div>

        {/* ── Social proof strip ── */}
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 rounded-3xl border p-6"
            style={{ background: "linear-gradient(135deg,#eff6ff 0%,#f0f9ff 50%,#e0f2fe 100%)", borderColor: "#bfdbfe" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {socialProof.map((s, i) => (
                <div key={s.label} className="text-center relative">
                  <div className="text-3xl font-black tracking-tight" style={{ color: "#1976d2" }}>{s.value}</div>
                  <div className="text-[12px] text-slate-500 mt-1 font-medium">{s.label}</div>
                  {i < socialProof.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 w-px h-8 bg-blue-200" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .marquee {
          display: flex;
          width: max-content;
          animation: marquee-scroll 40s linear infinite;
        }
        .marquee-reverse {
          display: flex;
          width: max-content;
          animation: marquee-scroll-reverse 44s linear infinite;
        }
        .marquee:hover,
        .marquee-reverse:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
