import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Droplets, Refrigerator, Truck, Phone, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    id: "water",
    icon: Droplets,
    label: "Bottled Water",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    activeBg: "bg-blue-600",
    faqs: [
      {
        q: "Why should I drink more water?",
        a: "Water plays a role in every body function and is found in every living cell. Proper hydration supports energy, skin health, digestion, and virtually every system in your body.",
      },
      {
        q: "What type of bottled water do you offer?",
        a: "Purified, re-mineralized bottled water.",
      },
      {
        q: "Where does your water come from?",
        a: "The majority comes from deep wells below the earth's surface, inspected, tested and certified for the best tasting, highest quality water.",
      },
      {
        q: "How do you ensure your water's quality?",
        a: "Our water is subject to stringent national and international standards including NSF and WHO guidelines. It is laboratory tested hourly. Culligan is a member of PSQCA (Pakistan Standards Quality Control Authority), and Culligan International is also a member of IBWA and NSF.",
      },
      {
        q: "What water container sizes are available?",
        a: (
          <ul className="list-disc list-inside space-y-1">
            <li>5 Gallon Returnable Bottles</li>
            <li>3 Gallon Returnable Bottles (retail markets)</li>
            <li>6 Liter Non-Returnable Bottle (retail markets)</li>
            <li>1.5 Liter Bottles – 12/Case (retail markets)</li>
            <li>0.5 Liter Bottles – 24/Case (retail markets)</li>
          </ul>
        ),
      },
      {
        q: "How much water do most people typically use?",
        a: "The average person expels 2.5 litres of water daily through perspiration, respiration, evaporation, urination, etc. Use the hydration calculator on our homepage to estimate your household or office needs.",
      },
      {
        q: "Why choose home delivery over buying water at the store?",
        a: "Home delivery is convenient and affordable — approximately forty rupees a day (based on an average household of 4 people) for crisp, refreshing bottled water delivered directly to your door.",
      },
      {
        q: "Do you use glass bottles?",
        a: "No. We use only returnable plastic bottles — lighter, safer to deliver, and recyclable.",
      },
      {
        q: "What is PET plastic and why is it safe?",
        a: "PET (polyethylene terephthalate) is a clear, tough polymer with an excellent barrier against oxygen and carbon dioxide. It is biologically inert if ingested, dermally safe during handling, and not a hazard if inhaled (per ILSI 2000 report). Note: Do not re-use the bottle after consuming water from it.",
      },
      {
        q: "Do you recycle your bottles?",
        a: "Yes. Empty 3 or 5-gallon bottles are collected, thoroughly sanitized, and reused — which helps keep prices affordable.",
      },
      {
        q: "What is the shelf-life of bottled water?",
        a: "One year. Store in a cool (5°C–25°C), dark, dry place away from chemicals, detergents, and gasoline. Smaller bottles (0.5L, 1.5L, 6L) have an optimal shelf life of 6 months due to thinner plastic, but remain drinkable for one year.",
      },
      {
        q: "Can I use bottled water for all purposes?",
        a: "Yes. It is safe for drinking, cooking, baby bottle preparation, cosmetic and hygiene uses.",
      },
      {
        q: "What is characteristic about Culligan Bottled Water?",
        a: "Low mineral content, especially sodium — making it refreshing and suitable for all ages.",
      },
      {
        q: "Is Culligan a member of any quality standards organization?",
        a: "Yes — PSQCA (Pakistan Standards Quality Control Authority). Culligan International is also a member of IBWA and NSF.",
      },
      {
        q: "How can I be sure I have water for an emergency?",
        a: "Home delivery ensures a constant supply. The Red Cross recommends 1 gallon per person per day for a week. You can also collect from a Culligan Water Shop in Karachi.",
      },
      {
        q: "How do I get my security deposit refund?",
        a: "Call 111-35-35-35 or Contact Us. The refund is made to your delivery address within 10–15 working days. Corporate clients should inform via Fax (2565914) or email.",
      },
      {
        q: "How do I change my delivery address?",
        a: "Call 111-35-35-35 or Contact Us. Delivery to the new address begins within 2–3 working days. Corporate clients must inform via Fax, email, or postal address.",
      },
      {
        q: "I am a retailer. How can I re-sell your product?",
        a: "Contact us at 111-35-35-35 or info@culligan.com.pk.",
      },
      {
        q: "Who do I contact about advertising or event opportunities?",
        a: "Reach out to the Marketing team at info@culligan.com.pk.",
      },
    ],
  },
  {
    id: "dispensers",
    icon: Refrigerator,
    label: "Water Dispensers",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    activeBg: "bg-violet-600",
    faqs: [
      {
        q: "What types of dispensers do you offer?",
        a: "Both electrical and non-electrical options serving hot, cold, and room temperature water.",
      },
      {
        q: "What if I already own a water dispenser?",
        a: "We can still deliver. Our 5-gallon bottles are industry standard and fit most dispensers. Single-serve bottles are also available. Call 111-35-35-35 or order online.",
      },
      {
        q: "Is it safe to have a hot water option if I have small children?",
        a: "Yes — hot water dispensers come with child-resistant spigot options for added safety.",
      },
      {
        q: "How do I place a bottle on the dispenser?",
        a: "Remove the cap (or label if the water guard system is present) and place the bottle onto the dispenser. The spill-safe attachment opens the valve automatically.",
      },
      {
        q: "There's a white plastic piece floating in my bottle. Is it safe?",
        a: "Yes — it's a food-grade part of the spill-free cap system that sometimes detaches if the bottle is placed at an angle. It is too large to flow through the reservoir into your cup.",
      },
      {
        q: "How do I remove a water bottle from the dispenser?",
        a: "Grip both sides of the bottle and pull straight up. If the bottle still has water, it should not spill as long as the white plastic piece is still in place and the cap is intact.",
      },
      {
        q: "The water isn't cold enough — what should I do?",
        a: "Check the dispenser is plugged in and the circuit breaker isn't tripped. Allow 15 minutes to re-chill after heavy use. Adjust the thermostat on the back wire fence — turn clockwise to cool, counter-clockwise to warm. Wait 15–20 minutes between adjustments. If still not working, call 111-35-35-35.",
      },
      {
        q: "My Hot & Cold dispenser water isn't hot — what do I do?",
        a: "Check the hot tank switch on the back is in the ON position. If it is and water is still not hot, call 111-35-35-35.",
      },
      {
        q: "The water in the bottle is boiling — what should I do?",
        a: "Unplug the unit immediately. Do NOT attempt to fix it yourself. Call 111-35-35-35 for exchange (if under warranty) or repair.",
      },
      {
        q: "There's water dripping from the spigot — what should I do?",
        a: "Tighten the top of the water spigot underneath the lever. If it is still dripping, call 111-35-35-35.",
      },
      {
        q: "No water flows from the taps — what should I do?",
        a: "Replace the bottle if empty. If there's an air blockage, lift the bottle off and place it back on 2–3 times. Ensure cups are on the cup station and open both taps.",
      },
      {
        q: "My water dispenser is leaking — what should I do?",
        a: "Remove the bottle first — 9 times out of 10, the bottle (not the dispenser) is the cause. After many sanitizing cycles, bottles can develop micro-fractures. To test: remove the bottle, wait one hour, and try to fill a cup — if water comes out, the bottle is defective. Mark it \"LEAKER\" and return it to your driver on the next delivery day.",
      },
      {
        q: "Should I clean the drip tray?",
        a: "Yes. Pull up on the tray to detach it, clean with warm soapy water, and reattach.",
      },
      {
        q: "How do I clean the inside of my dispenser?",
        a: "See the Cooler Cleaning Guide on our website, or call 111-35-35-35 to schedule a maintenance visit (small charge applies).",
      },
    ],
  },
  {
    id: "delivery",
    icon: Truck,
    label: "Delivery Service",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    activeBg: "bg-emerald-600",
    faqs: [
      {
        q: "How long has Culligan been in business?",
        a: "Producing and distributing bottled water in Karachi since 1997; globally since 1936.",
      },
      {
        q: "Do I need to be home for deliveries?",
        a: "Only for the initial installation if you have an electric dispenser. After that, you do not need to be home — leave empty bottles in a designated spot and they will be swapped out.",
      },
      {
        q: "How often will I receive my water delivery?",
        a: "Depends on your location and account type. Your route sales representative will provide a delivery calendar on the first delivery. Call 111-35-35-35 to adjust your schedule.",
      },
      {
        q: "What if I run out of water before my next delivery?",
        a: "Contact us on WhatsApp or call 111-35-35-35 for a special delivery, or pick up from a Culligan Water Shop in Karachi.",
      },
      {
        q: "Do you deliver across all of Karachi?",
        a: "We deliver across most areas of Karachi. Contact us on WhatsApp or phone to confirm whether your area is covered.",
      },
      {
        q: "How fast is delivery in Karachi?",
        a: "Orders placed before 12 PM are delivered by evening, anywhere in Karachi — at no charge. Orders after noon arrive the next morning.",
      },
      {
        q: "Is same-day delivery available?",
        a: "Same-day delivery is available in selected areas depending on order time, location, and stock availability.",
      },
      {
        q: "Can I set up a recurring delivery?",
        a: "Absolutely. Contact us via WhatsApp or call our UAN to set up a scheduled weekly or bi-weekly delivery.",
      },
      {
        q: "Why am I charged a deposit on my initial order?",
        a: "The deposit is charged per 3 or 5-gallon bottle and is fully refundable when empty bottles are returned. Your invoice reflects bottles delivered vs. returned each billing period.",
      },
      {
        q: "How many days will it take to receive my order?",
        a: "Within 1–2 business days of placing your order, you'll receive a call to schedule installation and/or delivery.",
      },
      {
        q: "What happens if my delivery falls on a Public Holiday or Strike?",
        a: (
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-slate-700 mb-1">One-day Public Holiday</p>
              <p>Distribution and Water Shops open 10:00–16:00. Delivery proceeds as scheduled (corporate accounts receive delivery one day prior).</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700 mb-1">Public Holiday of more than a week (e.g., Eid)</p>
              <p>Delivery made 1–2 days prior. Water Shops open from the third day (10:00–16:00). Corporate accounts receive delivery 3–4 days prior.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700 mb-1">Strike</p>
              <p>With advance notice: all accounts delivered one day prior. With no advance notice: delivery resumes when the strike is over. All operations close during strikes for staff safety — collect from a Water Shop or retail outlet in advance.</p>
            </div>
          </div>
        ),
      },
      {
        q: "What happens to my personal information?",
        a: "Kept in strict confidence. Refer to our Privacy Policy or email info@culligan.com.pk.",
      },
      {
        q: "How will I be billed each month?",
        a: (
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-slate-700 mb-1">Cash Plan</p>
              <p>Pay at the time of delivery.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700 mb-1">Coupon Book Plan</p>
              <p>Purchase a book of 11 coupons (Rs. 4,070); each coupon = 1 bottle (Rs. 370/bottle, saving Rs. 10 vs. cash). Up to 5 coupon books per delivery; call in advance for more.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700 mb-1">Credit Plan (Offices only)</p>
              <p>Receive a delivery ticket each billing cycle; invoice issued by the 10th of every month.</p>
            </div>
          </div>
        ),
      },
      {
        q: "Who do I contact for more help?",
        a: (
          <ul className="space-y-1.5">
            <li>Email: <a href="mailto:info@culligan.com.pk" className="text-[#1d6fa4] hover:underline font-medium">info@culligan.com.pk</a> (include account number; response within 1–2 business days)</li>
            <li>Leave a note for your Route Sales Representative on delivery day</li>
            <li>Call: <a href="tel:111353535" className="text-[#1d6fa4] hover:underline font-medium">111-35-35-35</a></li>
            <li>Visit any Culligan Water Shop in Karachi</li>
          </ul>
        ),
      },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("water");
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const current = faqCategories.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-14">

        {/* Hero */}
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-sky-50 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-sky-100/50 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 py-10 md:py-16 relative z-10">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-[#1d6fa4] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#42a5f5] mb-3">
                Support
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-5">
                Frequently Asked<br className="hidden sm:block" /> Questions
              </h1>
              <p className="text-slate-600 text-base leading-relaxed max-w-xl">
                Have a question? Look below for answers regarding bottled water products, water dispensers, and delivery services. If you don't find your question here,{" "}
                <a href="mailto:info@culligan.com.pk" className="text-[#1d6fa4] font-semibold hover:underline">
                  Contact Us
                </a>{" "}
                and we will be happy to help.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Category tabs + FAQ content */}
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">

          {/* Tab bar */}
          <div className="flex gap-2 mb-10 flex-wrap">
            {faqCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    isActive
                      ? `${cat.activeBg} text-white border-transparent shadow-md`
                      : `bg-white ${cat.color} ${cat.border} hover:${cat.bg}`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* FAQ list */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 rounded-xl ${current.bg} border ${current.border} flex items-center justify-center shrink-0`}>
                <current.icon className={`w-4 h-4 ${current.color}`} />
              </div>
              <h2 className="text-lg font-black text-slate-900">{current.label}</h2>
              <span className="ml-auto text-xs font-semibold text-slate-400">{current.faqs.length} questions</span>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {current.faqs.map((faq, i) => (
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
        </div>

        {/* Still have questions CTA */}
        <div className="bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-4 md:px-6 py-14 text-center max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-black text-slate-900 mb-2">Still have questions?</h2>
              <p className="text-slate-500 text-sm mb-7">
                Our team is available 7 days a week — reach us on WhatsApp or give us a call.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/923222584525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:brightness-105"
                  style={{ background: "#42a5f5", boxShadow: "0 8px 24px rgba(66,165,245,0.35)" }}
                >
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:111353535"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call 111 35 35 35
                </a>
                <a
                  href="mailto:info@culligan.com.pk"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>

      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
