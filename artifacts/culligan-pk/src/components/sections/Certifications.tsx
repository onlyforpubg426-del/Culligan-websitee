import { motion } from "framer-motion";
import { CheckCircle2, Clock, FlaskConical, MapPin, MessageCircle, ShieldCheck } from "lucide-react";

const proofPoints = [
  {
    icon: FlaskConical,
    title: "RO + Ozonation Purified",
    description: "Water is processed through reverse osmosis and ozonation to remove contaminants and bacteria.",
    accent: { from: "#dbeafe", to: "#eff6ff", border: "#bfdbfe", icon: "#1d4ed8", glow: "rgba(29,78,216,0.10)" },
  },
  {
    icon: ShieldCheck,
    title: "Quality Checked Before Delivery",
    description: "Every batch is inspected before it leaves our facility — no shortcuts, no exceptions.",
    accent: { from: "#d1fae5", to: "#f0fdf4", border: "#6ee7b7", icon: "#059669", glow: "rgba(5,150,105,0.10)" },
  },
  {
    icon: MessageCircle,
    title: "Order by WhatsApp or Phone",
    description: "Fast, simple ordering via WhatsApp message or a direct call — no app download needed.",
    accent: { from: "#cffafe", to: "#f0f9ff", border: "#a5f3fc", icon: "#0891b2", glow: "rgba(8,145,178,0.10)" },
  },
  {
    icon: MapPin,
    title: "Delivery Across Karachi",
    description: "We cover a wide range of areas across Karachi, with reliable same-day and scheduled delivery.",
    accent: { from: "#fef9c3", to: "#fffbeb", border: "#fde68a", icon: "#d97706", glow: "rgba(217,119,6,0.10)" },
  },
  {
    icon: Clock,
    title: "Serving Since 1997",
    description: "Over two decades of delivering clean water to families and businesses across Pakistan.",
    accent: { from: "#ede9fe", to: "#f5f3ff", border: "#c4b5fd", icon: "#7c3aed", glow: "rgba(124,58,237,0.10)" },
  },
];

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #ffffff 0%, #f0f9ff 40%, #f5fbff 70%, #eef7ff 100%)" }}
    >
      {/* Blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 65%)", transform: "translate(35%, -35%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, #ede9fe 0%, transparent 65%)", transform: "translate(-28%, 28%)" }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-14 items-start">

          {/* ── Left column — header + quote ── */}
          <div className="lg:w-80 shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border"
              style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", borderColor: "#bfdbfe" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-blue-600">
                Why People Trust Us
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4"
            >
              Built on{" "}
              <span className="relative inline-block">
                <span className="relative z-10" style={{ color: "#1976d2" }}>Quality,</span>
                <span
                  className="absolute bottom-0.5 left-0 right-0 h-2.5 rounded-full opacity-20 -z-0"
                  style={{ background: "#2196f3" }}
                />
              </span>{" "}
              Service &amp; Consistency
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="text-slate-500 text-sm leading-relaxed mb-8"
            >
              Customers want to know the water is handled properly, the service is dependable,
              and the company will deliver what it promises. We earn that trust with every order.
            </motion.p>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-2xl p-5 border overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#eff6ff,#f0f9ff)",
                borderColor: "#bfdbfe",
                boxShadow: "0 2px 20px rgba(29,78,216,0.08)",
              }}
            >
              <div
                className="absolute top-0 left-4 right-4 h-[3px] rounded-b-full"
                style={{ background: "linear-gradient(90deg,#bfdbfe,#93c5fd)" }}
              />
              <p className="text-sm font-medium text-slate-700 leading-relaxed italic">
                "The only water we deliver is water we would serve to our own families."
              </p>
              <p className="text-xs text-slate-400 mt-2 font-semibold">
                — Culligan Pakistan Quality Policy
              </p>
            </motion.div>
          </div>

          {/* ── Right column — proof point cards ── */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {proofPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative flex gap-4 p-5 rounded-2xl bg-white border overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: point.accent.border,
                    boxShadow: `0 2px 16px 0 ${point.accent.glow}, 0 1px 4px rgba(0,0,0,0.03)`,
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                    style={{ background: `linear-gradient(to bottom, ${point.accent.border}, ${point.accent.from})` }}
                  />

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200"
                    style={{
                      background: `linear-gradient(135deg, ${point.accent.from}, ${point.accent.to})`,
                      border: `1.5px solid ${point.accent.border}`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: point.accent.icon }} />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{point.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{point.description}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Guarantee chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: proofPoints.length * 0.09 }}
              className="flex gap-4 items-center p-5 rounded-2xl border"
              style={{
                background: "linear-gradient(135deg,#eff6ff,#dbeafe)",
                borderColor: "#bfdbfe",
                boxShadow: "0 2px 16px rgba(29,78,216,0.10)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "#1976d2", boxShadow: "0 4px 12px rgba(25,118,210,0.30)" }}
              >
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-bold text-blue-900 leading-snug">
                Every order backed by our delivery and quality guarantee.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
