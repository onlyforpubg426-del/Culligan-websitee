import { motion } from "framer-motion";
import { CheckCircle2, Clock, FlaskConical, MapPin, MessageCircle, ShieldCheck } from "lucide-react";

const proofPoints = [
  { icon: FlaskConical,   title: "RO + Ozonation Purified",    description: "Water is processed through reverse osmosis and ozonation to remove contaminants and bacteria." },
  { icon: ShieldCheck,    title: "Quality Checked Before Delivery", description: "Every batch is inspected before it leaves our facility — no shortcuts, no exceptions." },
  { icon: MessageCircle,  title: "Order by WhatsApp or Phone", description: "Fast, simple ordering via WhatsApp message or a direct call — no app download needed." },
  { icon: MapPin,         title: "Delivery Across Karachi",    description: "We cover a wide range of areas across Karachi, with reliable same-day and scheduled delivery." },
  { icon: Clock,          title: "Serving Since 1997",         description: "Over two decades of delivering clean water to families and businesses across Pakistan." },
];

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8fbff 0%, #eef6ff 50%, #e0f0ff 100%)" }}
    >
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-sky-100/60 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-14 items-center">

          <div className="lg:w-1/3 shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-primary"
            >
              Why People Trust Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-3xl font-bold text-slate-900 leading-tight"
            >
              Built on Quality,{" "}
              <span className="text-primary">Service,</span>
              <br />
              and Consistency
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-slate-600 leading-relaxed text-sm"
            >
              Choosing a drinking water supplier is about trust. Customers want to know the water is handled properly, the service is dependable, and the company will deliver what it promises. We work hard to earn that trust with every order.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-7 p-5 rounded-2xl
                         bg-white/60 backdrop-blur-md
                         border border-white/80
                         shadow-lg shadow-blue-100/50"
            >
              <p className="text-sm font-medium text-slate-700">
                "The only water we deliver is water we would serve to our own families."
              </p>
              <p className="text-xs text-muted-foreground mt-2">— Culligan Pakistan Quality Policy</p>
            </motion.div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {proofPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 p-5 rounded-xl
                             bg-white/60 backdrop-blur-md
                             border border-white/80
                             shadow-md shadow-blue-100/40
                             hover:bg-white/80 hover:shadow-lg hover:-translate-y-0.5
                             transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg
                                  bg-primary/10 backdrop-blur-sm
                                  border border-primary/15
                                  flex items-center justify-center text-primary shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{point.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{point.description}</p>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: proofPoints.length * 0.08 }}
              className="flex gap-4 p-5 rounded-xl
                         bg-primary/5
                         border border-primary/20
                         shadow-md shadow-blue-100/40
                         items-center"
            >
              <CheckCircle2 className="h-8 w-8 text-primary shrink-0" />
              <p className="text-sm font-semibold text-primary leading-snug">
                Every order backed by our delivery and quality guarantee.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
