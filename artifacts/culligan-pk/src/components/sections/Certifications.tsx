import { motion } from "framer-motion";
import { Award, BadgeCheck, FileText, FlaskConical, Globe, ShieldCheck } from "lucide-react";

const certs = [
  { icon: FileText,    title: "Lab Reports",            description: "Full batch-level lab documentation available upon request." },
  { icon: BadgeCheck,  title: "Govt. Approved",         description: "Recognized and certified by relevant government health authorities in Pakistan." },
  { icon: Globe,       title: "International Standards",description: "Water quality meets WHO and international food safety benchmarks." },
  { icon: Award,       title: "Industry Recognised",    description: "Certified by leading industry and water quality associations." },
  { icon: FlaskConical,title: "Every Batch Tested",     description: "No batch leaves the facility without passing rigorous quality checks." },
  { icon: ShieldCheck, title: "RO Purified",            description: "Our RO process is verified to remove 99.9% of contaminants." },
];

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8fbff 0%, #eef6ff 50%, #e0f0ff 100%)" }}
    >
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-sky-100/60 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          <div className="lg:w-1/3 shrink-0">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-semibold tracking-widest uppercase"
            >
              Quality Assurance
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-4xl font-bold text-slate-900 leading-tight"
            >
              Certified.{" "}
              <span className="text-primary">Tested.</span>
              <br />
              Trusted.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-5 text-slate-600 leading-relaxed"
            >
              Every drop of Culligan water carries the weight of decades of quality commitment. Our certifications
              aren't checkboxes — they're the standard we set for ourselves before any authority requires it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 p-5 rounded-2xl
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
            {certs.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.title}
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
                    <h4 className="font-semibold text-slate-900 text-sm">{cert.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{cert.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
