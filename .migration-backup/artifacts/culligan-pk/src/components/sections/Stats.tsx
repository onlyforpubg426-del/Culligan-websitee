import { motion } from "framer-motion";
import { Building2, Calendar, Phone, Truck } from "lucide-react";

const stats = [
  { icon: Calendar,  value: "Since 1997",      label: "Operating in Pakistan" },
  { icon: Truck,     value: "Free Delivery",    label: "To Your Home or Office" },
  { icon: Building2, value: "Same-day",         label: "Available in Karachi" },
  { icon: Phone,     value: "111 35 35 35",     label: "UAN Support Line" },
];

export function Stats() {
  return (
    <section
      className="relative py-10 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a6fd4 0%, #2e8ee8 60%, #4aa8f5 100%)" }}
    >
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl
                         bg-white/15 backdrop-blur-md
                         border border-white/25
                         shadow-lg shadow-black/10
                         hover:bg-white/20 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-white text-base leading-tight">{value}</div>
                <div className="text-xs text-white/75 font-medium">{label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
