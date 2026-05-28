import { motion } from "framer-motion";
import { Award, Users, Truck, Layers } from "lucide-react";

const stats = [
  {
    icon:    Award,
    value:   "Since 1997",
    label:   "Serving Karachi",
    color:   { bg: "bg-amber-50",   icon: "text-amber-600",   border: "border-amber-100",   glow: "rgba(245,158,11,0.18)"  },
  },
  {
    icon:    Users,
    value:   "10,000+",
    label:   "Monthly customers",
    color:   { bg: "bg-blue-50",    icon: "text-blue-600",    border: "border-blue-100",    glow: "rgba(33,150,243,0.18)"  },
  },
  {
    icon:    Truck,
    value:   "Same-day",
    label:   "Delivery available",
    color:   { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100", glow: "rgba(16,185,129,0.18)"  },
  },
  {
    icon:    Layers,
    value:   "Multi-size",
    label:   "Home & office bottles",
    color:   { bg: "bg-violet-50",  icon: "text-violet-600",  border: "border-violet-100",  glow: "rgba(139,92,246,0.18)"  },
  },
];

export function Stats() {
  return (
    <section className="relative py-14 bg-white overflow-hidden">
      {/* Top + bottom rules */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/40 to-transparent" />
      {/* Subtle bg wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-white to-blue-50/40 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10"
        >
          <p className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-blue-500 mb-2">
            A Trusted Name in Drinking Water
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug mb-3">
            Karachi's most reliable<br className="hidden sm:block" /> water delivery — since 1997.
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl">
            Families and businesses across Karachi have counted on Culligan Water for clean,
            convenient drinking water. Our promise: consistent quality, reliable service,
            and fast delivery when you need it most.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map(({ icon: Icon, value, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 + i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex items-center gap-3 px-4 py-4 rounded-2xl
                         bg-white border border-slate-100 cursor-default
                         shadow-stat transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0
                            ${color.bg} ${color.border} border ${color.icon}
                            group-hover:scale-110 transition-transform duration-200`}
                style={{ boxShadow: `0 4px 14px ${color.glow}` }}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Text */}
              <div>
                <div className="font-black text-slate-900 text-sm md:text-[15px] leading-tight">
                  {value}
                </div>
                <div className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5">
                  {label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
