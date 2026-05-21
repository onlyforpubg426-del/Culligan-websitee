import { motion } from "framer-motion";
import { Building2, MapPin, Thermometer, Truck, Wind } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Home Delivery",
    description: "Free, same-day delivery of your water order to your doorstep. Flexible one-time or recurring schedules.",
  },
  {
    icon: Building2,
    title: "Office Delivery",
    description: "Keep your entire team hydrated. Corporate accounts available with customized scheduling and priority support.",
  },
  {
    icon: Thermometer,
    title: "Hot & Cold Dispensers",
    description: "Rent or purchase Culligan-branded dispensers for home or office — instantly available hot and cold water.",
  },
  {
    icon: Wind,
    title: "Cooler Cleaning",
    description: "Professional sanitization of your water cooler by trained technicians to maintain hygiene and performance.",
  },
  {
    icon: MapPin,
    title: "Water Shop Finder",
    description: "Locate your nearest Culligan authorized water shop across Karachi for walk-in purchases and exchanges.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(140deg, #64b0f0 0%, #6ebaf2 40%, #82c8f6 75%, #9dd8fb 100%)" }}
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sky-300 text-sm font-semibold tracking-widest uppercase"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-4xl font-bold text-white"
          >
            Complete Hydration Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-white/70 max-w-xl mx-auto"
          >
            From home delivery to corporate accounts — we have your hydration covered end to end.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6
                           bg-white/10 backdrop-blur-md
                           border border-white/20
                           shadow-lg shadow-black/20
                           hover:bg-white/20 hover:-translate-y-1 hover:shadow-xl
                           transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl
                                bg-white/15 backdrop-blur-sm
                                border border-white/25
                                flex items-center justify-center text-white mb-5
                                shadow-inner">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{service.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/60 text-sm mt-10"
        >
          Corporate accounts available with customized scheduling.{" "}
          <a href="#order" className="text-sky-300 underline underline-offset-2 hover:text-white transition-colors">
            Request corporate pricing
          </a>
        </motion.p>
      </div>
    </section>
  );
}
