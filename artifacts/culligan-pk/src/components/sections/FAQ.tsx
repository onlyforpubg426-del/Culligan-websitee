import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const previewFaqs = [
  {
    q: "Do you deliver across all of Karachi?",
    a: "We deliver across most areas of Karachi. Contact us on WhatsApp or phone to confirm whether your area is covered.",
    accent: { border: "#bfdbfe", from: "#eff6ff", icon: "#1d4ed8" },
  },
  {
    q: "What is the minimum order quantity?",
    a: "For 19L and 12L gallons, the minimum order is 3 bottles. All other sizes can be ordered individually or by the case.",
    accent: { border: "#a5f3fc", from: "#f0f9ff", icon: "#0891b2" },
  },
  {
    q: "How fast is delivery in Karachi?",
    a: "Orders placed before 12 PM are delivered by evening, anywhere in Karachi — at no charge. Orders after noon arrive the next morning.",
    accent: { border: "#6ee7b7", from: "#f0fdf4", icon: "#059669" },
  },
  {
    q: "Is Culligan water safe for babies and the elderly?",
    a: "Yes. Our RO + Ozonation process removes all contaminants and pathogens. The water is WHO-certified and suitable for all ages including infants.",
    accent: { border: "#c4b5fd", from: "#f5f3ff", icon: "#7c3aed" },
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8fbff 0%, #ffffff 45%, #f0f9ff 100%)" }}
    >
      {/* Blobs */}
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-35"
        style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 65%)", transform: "translate(-30%, -35%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full pointer-events-none opacity-25"
        style={{ background: "radial-gradient(circle, #a5f3fc 0%, transparent 65%)", transform: "translate(25%, 30%)" }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "26px 26px" }}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-2xl relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border"
            style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", borderColor: "#bfdbfe" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-blue-600">FAQ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight"
          >
            Frequently Asked{" "}
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: "#1976d2" }}>Questions</span>
              <span
                className="absolute bottom-1 left-0 right-0 h-3 rounded-full opacity-20 -z-0"
                style={{ background: "#2196f3" }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mt-4 text-slate-500 text-base leading-relaxed"
          >
            Quick answers to the most common questions.
          </motion.p>
        </div>

        {/* ── Accordion ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {previewFaqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="relative rounded-2xl bg-white border overflow-hidden px-5 shadow-sm"
                style={{
                  borderColor: faq.accent.border,
                  boxShadow: `0 2px 12px rgba(0,0,0,0.03)`,
                }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                  style={{ background: `linear-gradient(to bottom, ${faq.accent.border}, ${faq.accent.from})` }}
                />
                <AccordionTrigger className="text-sm font-bold text-slate-800 hover:no-underline py-4 text-left pl-2">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-500 leading-relaxed pb-4 pl-2">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28 }}
          className="mt-10 text-center"
        >
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white transition-all hover:brightness-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #1976d2, #1d4ed8)",
              boxShadow: "0 6px 20px rgba(25,118,210,0.28)",
            }}
          >
            View all FAQs
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
