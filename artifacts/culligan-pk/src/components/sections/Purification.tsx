import { motion } from "framer-motion";
import { Beaker, CheckCircle, Filter, FlaskConical, Microscope, Package, Waves } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Waves,
    title: "Source Collection",
    description: "Carefully selected raw water sources from controlled, monitored supply points across the region.",
  },
  {
    number: "02",
    icon: Filter,
    title: "Pre-Filtration",
    description: "Removes sediment, rust, and larger particles using multi-stage sediment and carbon filters.",
  },
  {
    number: "03",
    icon: Microscope,
    title: "Reverse Osmosis",
    description: "Micro-purification at the molecular level — removing dissolved solids, heavy metals, and contaminants.",
  },
  {
    number: "04",
    icon: FlaskConical,
    title: "Ozonation Treated",
    description: "Natural sanitization without harsh chemicals — ozone eliminates bacteria, viruses, and microbes.",
  },
  {
    number: "05",
    icon: Beaker,
    title: "Quality Testing",
    description: "Rigorous lab testing performed on every batch before bottling — documented and certified.",
  },
  {
    number: "06",
    icon: Package,
    title: "Sealed & Delivered",
    description: "Tamper-proof seals applied before delivery, ensuring your water is as pure at your door as when it left our facility.",
  },
];

export function Purification() {
  return (
    <section id="purification" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-semibold tracking-widest uppercase"
          >
            How We Purify
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-4xl font-bold text-slate-900"
          >
            The Science Behind Pure Water
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto"
          >
            A meticulous 6-step process ensuring absolute purity — from source to your door.
          </motion.p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${
                    isLeft ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className={`${isLeft ? "lg:text-right lg:pr-10" : "lg:order-2 lg:pl-10"}`}>
                    <div
                      className={`flex items-start gap-4 ${
                        isLeft ? "lg:flex-row-reverse lg:justify-start" : ""
                      }`}
                    >
                      <div className="flex-1">
                        <div
                          className={`flex items-center gap-3 mb-3 ${
                            isLeft ? "lg:flex-row-reverse" : ""
                          }`}
                        >
                          <span className="text-xs font-bold text-primary tracking-widest">{step.number}</span>
                          <div className="h-px flex-1 bg-border" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`hidden lg:flex lg:order-${isLeft ? "2" : "1"} items-center justify-center relative`}
                  >
                    <div className="absolute w-px h-full bg-border left-1/2 -translate-x-1/2" />
                    <div className="relative z-10 w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary shadow-sm">
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 lg:hidden mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary tracking-widest">{step.number}</span>
                      <span className="text-lg font-bold text-slate-900">{step.title}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 border-t border-border pt-10"
        >
          {["No harsh chemicals", "Every batch tested", "Sealed before delivery", "International standards"].map(
            (label) => (
              <div key={label} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CheckCircle className="h-4 w-4 text-primary" />
                {label}
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
