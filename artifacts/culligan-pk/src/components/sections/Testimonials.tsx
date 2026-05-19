import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Culligan keeps our entire office hydrated without any hassle. The team is professional and the water quality speaks for itself.",
    name: "Rizwan Ahmed",
    role: "Operations Manager",
    company: "Tech Firm, PECHS Karachi",
    stars: 5,
  },
  {
    quote: "We switched to Culligan three years ago and haven't looked back. The delivery is always on time and the water tastes noticeably cleaner than anything we had before.",
    name: "Sana Mirza",
    role: "Lawmaker",
    company: "DHA, Karachi",
    stars: 5,
  },
  {
    quote: "As someone who takes water quality seriously, I was impressed by Culligan's lab reports and certifications. It's the only brand I trust for my family.",
    name: "Dr. Kamran Sheikh",
    role: "Pediatrician",
    company: "Aga Khan Hospital Area",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #e8f4ff 0%, #f0f8ff 50%, #dceeff 100%)" }}
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sky-200/30 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-semibold tracking-widest uppercase"
          >
            What Customers Say
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-4xl font-bold text-slate-900"
          >
            Trusted by Thousands
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Real families and offices across Karachi who made the switch to pure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="rounded-2xl p-7 flex flex-col
                         bg-white/60 backdrop-blur-md
                         border border-white/80
                         shadow-xl shadow-blue-100/60
                         hover:bg-white/75 hover:shadow-2xl hover:-translate-y-1
                         transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <Quote className="h-7 w-7 text-primary/20 mb-3" />
              <p className="text-slate-700 leading-relaxed flex-1 text-[15px]">"{t.quote}"</p>

              <div className="mt-6 pt-5 border-t border-white/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center text-primary font-bold text-sm shrink-0 border border-primary/20">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
