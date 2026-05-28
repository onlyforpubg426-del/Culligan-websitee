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
  },
  {
    q: "What is the minimum order quantity?",
    a: "For 19L and 12L gallons, the minimum order is 3 bottles. All other sizes can be ordered individually or by the case.",
  },
  {
    q: "How fast is delivery in Karachi?",
    a: "Orders placed before 12 PM are delivered by evening, anywhere in Karachi — at no charge. Orders after noon arrive the next morning.",
  },
  {
    q: "Is Culligan water safe for babies and the elderly?",
    a: "Yes. Our RO + Ozonation process removes all contaminants and pathogens. The water is WHO-certified and suitable for all ages including infants.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-16 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-2"
            style={{ color: "#1d6fa4" }}
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-3 text-slate-500 text-base"
          >
            Quick answers to the most common questions.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="space-y-2">
            {previewFaqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-slate-100 rounded-xl px-5 shadow-sm bg-white"
              >
                <AccordionTrigger className="text-sm font-semibold text-slate-800 hover:no-underline py-4 text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-500 leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-8 text-center"
        >
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:brightness-105"
            style={{ background: "#1d6fa4", boxShadow: "0 8px 24px rgba(29,111,164,0.25)" }}
          >
            View all FAQs
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
