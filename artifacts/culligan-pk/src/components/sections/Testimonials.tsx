import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:   "Culligan keeps our entire office hydrated without any hassle. The team is professional and the water quality speaks for itself.",
    name:    "Rizwan Ahmed",
    role:    "Operations Manager",
    company: "Tech Firm, PECHS Karachi",
    stars:   5,
    initial: "R",
    accent:  { from: "#dbeafe", to: "#eff6ff", border: "#bfdbfe", avatar: "#1d4ed8", ring: "#93c5fd" },
  },
  {
    quote:   "We switched to Culligan three years ago and haven't looked back. The delivery is always on time and the water tastes noticeably cleaner.",
    name:    "Sana Mirza",
    role:    "Lawmaker",
    company: "DHA, Karachi",
    stars:   5,
    initial: "S",
    accent:  { from: "#ede9fe", to: "#f5f3ff", border: "#c4b5fd", avatar: "#7c3aed", ring: "#c4b5fd" },
  },
  {
    quote:   "As someone who takes water quality seriously, I was impressed by Culligan's lab reports and certifications. The only brand I trust for my family.",
    name:    "Dr. Kamran Sheikh",
    role:    "Pediatrician",
    company: "Aga Khan Hospital Area",
    stars:   5,
    initial: "K",
    accent:  { from: "#d1fae5", to: "#f0fdf4", border: "#6ee7b7", avatar: "#059669", ring: "#6ee7b7" },
  },
];

const socialProof = [
  { value: "10,000+", label: "Happy customers" },
  { value: "4.9 ★",  label: "Average rating"  },
  { value: "25+ yrs", label: "Serving Karachi" },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8fbff 0%, #ffffff 40%, #f0f9ff 70%, #eef7ff 100%)" }}
    >
      {/* Blobs */}
      <div
        className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 65%)", transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, #ede9fe 0%, transparent 65%)", transform: "translate(-25%, 25%)" }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border"
            style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", borderColor: "#bfdbfe" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-blue-600">Customer Feedback</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight"
          >
            What Our{" "}
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: "#1976d2" }}>Customers Say</span>
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
            className="mt-5 text-slate-500 text-base leading-relaxed max-w-lg mx-auto"
          >
            We're proud to serve homes and businesses across Karachi. Here's what customers appreciate most.
          </motion.p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="group relative rounded-3xl p-7 flex flex-col bg-white border overflow-hidden"
              style={{
                borderColor: t.accent.border,
                boxShadow: `0 2px 24px 0 rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)`,
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full"
                style={{ background: `linear-gradient(90deg, ${t.accent.border}, ${t.accent.from})` }}
              />

              {/* Large decorative quote */}
              <div className="absolute top-4 right-5 opacity-[0.08]">
                <Quote className="w-14 h-14" style={{ color: t.accent.avatar }} />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-5 mt-2">
                {[...Array(t.stars)].map((_, s) => (
                  <Star key={s} className="h-[15px] w-[15px] fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-slate-700 leading-relaxed flex-1 text-[15px] relative z-10">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="mt-6 pt-5 border-t flex items-center gap-3" style={{ borderColor: t.accent.from }}>
                <div
                  className="relative w-11 h-11 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${t.accent.avatar}, ${t.accent.ring})`,
                    boxShadow: `0 0 0 3px ${t.accent.from}`,
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm leading-tight">{t.name}</div>
                  <div className="text-[11.5px] text-slate-500 font-medium mt-0.5">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Social proof strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 rounded-3xl border p-6"
          style={{ background: "linear-gradient(135deg,#eff6ff 0%,#f0f9ff 50%,#e0f2fe 100%)", borderColor: "#bfdbfe" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {socialProof.map((s, i) => (
              <div key={s.label} className="text-center relative">
                <div className="text-3xl font-black tracking-tight" style={{ color: "#1976d2" }}>
                  {s.value}
                </div>
                <div className="text-[12px] text-slate-500 mt-1 font-medium">{s.label}</div>
                {i < socialProof.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 w-px h-8 bg-blue-200" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
