import { motion } from "framer-motion";
import { Award, Users, Truck, Layers } from "lucide-react";

const stats = [
  {
    icon:  Award,
    value: "Since 1997",
    label: "Serving Karachi",
    accent: { from: "#fef9c3", to: "#fffbeb", border: "#fde68a", icon: "#d97706", glow: "rgba(217,119,6,0.14)" },
  },
  {
    icon:  Users,
    value: "10,000+",
    label: "Monthly customers",
    accent: { from: "#dbeafe", to: "#eff6ff", border: "#bfdbfe", icon: "#1d4ed8", glow: "rgba(29,78,216,0.13)" },
  },
  {
    icon:  Truck,
    value: "Same-day",
    label: "Delivery available",
    accent: { from: "#d1fae5", to: "#f0fdf4", border: "#6ee7b7", icon: "#059669", glow: "rgba(5,150,105,0.13)" },
  },
  {
    icon:  Layers,
    value: "Multi-size",
    label: "Home & office bottles",
    accent: { from: "#e0e7ff", to: "#f5f3ff", border: "#c7d2fe", icon: "#4f46e5", glow: "rgba(79,70,229,0.13)" },
  },
];

export function Stats() {
  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #ffffff 45%, #f5f3ff 100%)" }}
    >
      {/* Blobs */}
      <div
        className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none opacity-35"
        style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 65%)", transform: "translate(-30%, -40%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full pointer-events-none opacity-25"
        style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 65%)", transform: "translate(25%, 35%)" }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "26px 26px" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10">

          {/* Left — intro text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-80 shrink-0"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border"
              style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", borderColor: "#bfdbfe" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-blue-600">
                A Trusted Name
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug mb-3">
              Karachi's most reliable{" "}
              <span className="relative inline-block">
                <span className="relative z-10" style={{ color: "#1976d2" }}>water delivery</span>
                <span
                  className="absolute bottom-0.5 left-0 right-0 h-2.5 rounded-full opacity-20 -z-0"
                  style={{ background: "#2196f3" }}
                />
              </span>{" "}
              — since 1997.
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed">
              Families and businesses across Karachi count on Culligan for clean,
              convenient drinking water — consistent quality and fast delivery when you need it most.
            </p>
          </motion.div>

          {/* Right — stat cards */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {stats.map(({ icon: Icon, value, label, accent }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.09 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl bg-white border overflow-hidden flex flex-col items-start p-4 cursor-default"
                style={{
                  borderColor: accent.border,
                  boxShadow: `0 2px 16px 0 ${accent.glow}, 0 1px 4px rgba(0,0,0,0.03)`,
                }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-3 right-3 h-[3px] rounded-b-full"
                  style={{ background: `linear-gradient(90deg, ${accent.border}, ${accent.from})` }}
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 mt-1 group-hover:scale-110 transition-transform duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                    border: `1.5px solid ${accent.border}`,
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: accent.icon }} />
                </div>

                <div className="font-black text-slate-900 text-base leading-tight">{value}</div>
                <div className="text-[11.5px] text-slate-500 font-medium leading-snug mt-0.5">{label}</div>

                {/* Watermark icon */}
                <div
                  className="absolute -bottom-2 -right-2 opacity-[0.05] pointer-events-none"
                >
                  <Icon className="h-16 w-16" style={{ color: accent.icon }} />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
