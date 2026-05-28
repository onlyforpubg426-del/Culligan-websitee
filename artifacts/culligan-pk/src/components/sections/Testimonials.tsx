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
    color:   { ring: "from-blue-400 to-sky-400",   bg: "bg-blue-600",  quote: "text-blue-100"  },
  },
  {
    quote:   "We switched to Culligan three years ago and haven't looked back. The delivery is always on time and the water tastes noticeably cleaner.",
    name:    "Sana Mirza",
    role:    "Lawmaker",
    company: "DHA, Karachi",
    stars:   5,
    initial: "S",
    color:   { ring: "from-violet-400 to-purple-400", bg: "bg-violet-600", quote: "text-violet-100" },
  },
  {
    quote:   "As someone who takes water quality seriously, I was impressed by Culligan's lab reports and certifications. The only brand I trust for my family.",
    name:    "Dr. Kamran Sheikh",
    role:    "Pediatrician",
    company: "Aga Khan Hospital Area",
    stars:   5,
    initial: "K",
    color:   { ring: "from-emerald-400 to-teal-400", bg: "bg-emerald-600", quote: "text-emerald-100" },
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
      style={{ background: "linear-gradient(160deg,#f0f8ff 0%,#e8f4ff 55%,#f4faff 100%)" }}
    >
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full bg-blue-100/35 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0  w-[420px] h-[420px] rounded-full bg-sky-100/35 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-2"
            style={{ color: "#1d6fa4" }}
          >
            Customer Feedback
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mt-4 text-base text-slate-500 max-w-xl mx-auto leading-relaxed"
          >
            We're proud to serve homes and businesses across Karachi. Here's what customers appreciate most.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="group relative rounded-3xl p-7 flex flex-col
                         bg-white border border-white/80
                         shadow-testimonial
                         transition-all duration-300
                         hover:border-blue-100"
            >
              {/* Large decorative quote mark */}
              <div className="absolute top-5 right-6 opacity-[0.07]">
                <Quote className="w-16 h-16 text-blue-600" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(t.stars)].map((_, s) => (
                  <Star key={s} className="h-[15px] w-[15px] fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 leading-relaxed flex-1 text-[15px] relative z-10">
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                {/* Avatar with gradient ring */}
                <div className={`relative w-11 h-11 rounded-full bg-gradient-to-br ${t.color.ring} p-[2px] shrink-0`}>
                  <div className={`w-full h-full rounded-full ${t.color.bg} flex items-center justify-center
                                   text-white font-bold text-sm`}>
                    {t.initial}
                  </div>
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

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-12"
        >
          {socialProof.map((s, i) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {s.value}
              </div>
              <div className="text-[12px] text-slate-500 mt-0.5 font-medium">{s.label}</div>
              {i < socialProof.length - 1 && (
                <div className="hidden md:block absolute h-8 w-px bg-slate-200 translate-x-24 -translate-y-5" />
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
