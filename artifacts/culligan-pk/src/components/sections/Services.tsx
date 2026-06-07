import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, MapPin, Thermometer, Truck, Wind, X, CheckCircle2, ChevronRight, ShieldCheck, Clock, Phone, Navigation, Store, Mail, Droplets, Info, BookOpen, MessageSquare, Briefcase } from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    icon: Truck,
    title: "Home Delivery",
    description: "Complimentary doorstep delivery on every order. Choose a one-time drop or set up a recurring schedule — we work around you.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    accent: "group-hover:bg-blue-600",
    hasDeliveryGuide: true,
  },
  {
    icon: Building2,
    title: "Office Delivery",
    description: "Keep your entire team hydrated. Corporate accounts with customized scheduling and dedicated priority support.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
    accent: "group-hover:bg-sky-600",
    hasOfficeGuide: true,
  },
  {
    icon: Thermometer,
    title: "Hot & Cold Dispensers",
    description: "Rent or purchase Culligan-branded dispensers for home or office — instantly available hot and cold water.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    accent: "group-hover:bg-emerald-600",
  },
  {
    icon: Wind,
    title: "Cooler Cleaning",
    description: "Professional sanitization by trained technicians to maintain hygiene and peak cooler performance.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    accent: "group-hover:bg-blue-600",
    hasGuide: true,
  },
  {
    icon: MapPin,
    title: "Water Shop Finder",
    description: "Find your nearest Culligan authorized water shop across Karachi for walk-in purchases and exchanges.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    accent: "group-hover:bg-amber-600",
    hasShopFinder: true,
  },
  {
    icon: MessageSquare,
    title: "Contact Us",
    description: "Got a question or need support? Send us a message and we'll get back to you within a few hours.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    accent: "group-hover:bg-teal-600",
    isContactPage: true,
  },
  {
    icon: Briefcase,
    title: "Corporate Pricing",
    description: "Tailored water delivery programs for offices, factories, and multi-site businesses with volume rates.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    accent: "group-hover:bg-blue-600",
    isCorporatePage: true,
  },
];

const supplyItems = [
  "Clean rubber gloves",
  "Lint-free paper towels or dry cloths",
  "Clean dish scrub brush with a long handle",
  "Plastic scrubbing pad — never use soap, detergent, steel wool, or abrasives",
  "Measuring spoon (1 teaspoon)",
  "Calibrated container (e.g. 2-gallon pail)",
  "Unscented household laundry bleach",
  "1-gallon container filled with bottled water",
];

const cleaningSteps = [
  {
    step: 1,
    title: "Unplug the power cord",
    detail: "Always disconnect power before starting any cleaning.",
  },
  {
    step: 2,
    title: "Remove the bottle",
    detail: "If there is water remaining in the bottle, cap or cover it for re-use.",
  },
  {
    step: 3,
    title: "Drain all water via the cold faucet",
    detail: "Open the COLD FAUCET and drain all water into a bucket. Discard this water.",
  },
  {
    step: 4,
    title: "Remove the cooler top and baffle",
    detail: "Take off the cooler top. If equipped with a no-spill device, remove that first. Check the reservoir for a removable baffle and take it out.",
  },
  {
    step: 5,
    title: "Clear any remaining water or ice",
    detail: "If water or an ice ring remains, add hot water to melt the ice and drain the reservoir completely. Do not spill water outside the reservoir into the cooler interior.",
  },
  {
    step: 6,
    title: "Mix the cleaning solution",
    detail: "In your calibrated container, add 1 teaspoon of unscented household liquid bleach per gallon of water.",
  },
  {
    step: 7,
    title: "Scrub the reservoir interior",
    detail: "Wearing rubber gloves, immerse the towel or scrub brush in the cleaning solution and squeeze out excess. Aggressively scrub all interior surfaces. Do NOT pour the cleaning solution directly into the reservoir.",
  },
  {
    step: 8,
    title: "Rinse thoroughly",
    detail: "Carefully fill the reservoir with bottled water to ½ inch from the top. Drain completely through the cold faucet. Repeat once more to ensure no bleach residue remains.",
  },
  {
    step: 9,
    title: "Clean the baffle, cooler top, drip receptor and faucets",
    detail: "Use the same brush or cloth with cleaning solution to wipe down the baffle, cooler top, drip receptor and faucets. If your cooler is equipped with a no-spill device, clean it with the same cleaning solution. Take care not to get the air filter wet. Use the clean 1 gallon container filled with bottled water to thoroughly rinse these parts.",
  },
  {
    step: 10,
    title: "Reinstall all parts",
    detail: "Wearing rubber gloves, re-install all parts: baffle, cooler top, faucets (if removed) and no-spill device (if equipped). Place a bottle back on the cooler and drain two cups of water from each faucet, or until there is no evidence of a chlorine taste and/or odor. Dry all spilled water on the cooler and the floor.",
  },
  {
    step: 11,
    title: "Restore power and wait",
    detail: "Plug the cooler back into the electrical outlet. Allow forty-five (45) minutes for the water to reach the appropriate temperature.",
  },
];

const deliverySteps = [
  {
    step: 1,
    title: "Sign Up",
    detail: "Simply contact us at WhatsApp or call on our UAN number at 111-35-35-35 and our customer services representative will take your order.",
  },
  {
    step: 2,
    title: "Initial Delivery",
    detail: "Once you've placed your order, our dedicated delivery specialist will deliver your selected bottled water products, plus install and set-up the water dispenser, if applicable. You'll also be informed about the delivery schedule.",
  },
  {
    step: 3,
    title: "Regular Service",
    detail: "After your initial delivery, leave out any empty water bottles and your delivery sales representative will replace them with filled bottles and any other items you may have ordered, regardless of whether you are at home or not.",
  },
  {
    step: 4,
    title: "Account Management",
    detail: "Manage your account by calling our customer service at 111-35-35-35 or visiting our Culligan Water Shop, change or add products, even skip deliveries when on vacation or refer to our FAQ section.",
  },
];

function HomeDeliveryModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Home Delivery Service</h2>
                <p className="text-xs text-slate-400">Crystal clear water delivered to your door</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

            {/* Contact info */}
            <div className="rounded-2xl bg-blue-50 border border-blue-100 px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href="tel:111353535"
                className="flex items-center gap-2 text-sm font-bold text-blue-700 hover:underline"
              >
                <Phone className="w-4 h-4 shrink-0" />
                U.A.N: 111 35 35 35
              </a>
              <span className="hidden sm:block text-slate-300">|</span>
              <a
                href="mailto:info@culligan.com.pk"
                className="flex items-center gap-2 text-sm font-bold text-blue-700 hover:underline"
              >
                <Mail className="w-4 h-4 shrink-0" />
                info@culligan.com.pk
              </a>
            </div>

            {/* Overview */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
                Home Delivery Overview
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Crystal clear, great tasting water the easy way! Looking for a quality, clean, refreshing water service for your home? Store-bought bottled water can get expensive, and hauling all that water home is no fun. Wouldn't it be nice to have great tasting water, as much as you need, delivered right at your doorstep?
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-3">
                Who, other than your Culligan Man, can provide you with top-quality, mineral enriched water with a friendly, dependable service? Thousands of consumers depend on Culligan to deliver healthy bottled water to their homes and offices each day. Our dependable, courteous delivery staff will ensure that your water reaches you on time, every time!
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-3">
                For easy dispensing of our 19-litre bottles (5 gallon) we offer an option of cradle tap-stand or Hot &amp; Cold water dispenser depending on your need.
              </p>
            </div>

            {/* Tip banner */}
            <div className="rounded-2xl bg-sky-50 border border-sky-100 px-4 py-3 flex gap-3 items-start">
              <Droplets className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <p className="text-sm text-sky-800 leading-snug">
                <span className="font-bold">19-litre bottles available</span> — with optional cradle tap-stand or Hot &amp; Cold dispenser for your convenience.
              </p>
            </div>

            {/* How it works */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                How Our Delivery Service Works
              </h3>
              <div className="space-y-3">
                {deliverySteps.map((s) => (
                  <div key={s.step} className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {s.step}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                      <p className="text-sm text-slate-500 leading-snug mt-0.5">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 p-5 text-center">
              <p className="text-sm font-semibold text-slate-800 mb-1">Ready to get started?</p>
              <p className="text-xs text-slate-500 mb-3">Place your first order today — setup and first delivery included.</p>
              <a
                href="#order"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:underline"
              >
                Place an order <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const officeBenefits = [
  "Increased productivity",
  "Improved morale",
  "Improved corporate culture and image",
  "Bottled water and other break room options",
];

const officeServiceItems = [
  "Regular deliveries to an agreed schedule direct to your cooler.",
  "Recommendations on the number of bottles required until the next delivery.",
  "A quality-check of the bottles to ensure they meet company standards.",
  "Delivery of fresh bottles and collection of empty ones.",
  "Advice and delivery of any additional accessories you may require.",
];

function OfficeDeliveryModal({ onClose }: { onClose: () => void }) {
  const [depositOpen, setDepositOpen] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Office Delivery</h2>
                <p className="text-xs text-slate-400">A convenient way to get the water your body really needs</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

            {/* Contact info */}
            <div className="rounded-2xl bg-sky-50 border border-sky-100 px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <a href="tel:111353535" className="flex items-center gap-2 text-sm font-bold text-sky-700 hover:underline">
                <Phone className="w-4 h-4 shrink-0" />
                U.A.N: 111 35 35 35
              </a>
              <span className="hidden sm:block text-slate-300">|</span>
              <a href="mailto:info@culligan.com.pk" className="flex items-center gap-2 text-sm font-bold text-sky-700 hover:underline">
                <Mail className="w-4 h-4 shrink-0" />
                info@culligan.com.pk
              </a>
            </div>

            {/* Overview */}
            <div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our Office Delivery system is a practical and convenient way to ensure you have the water your body needs, close at hand throughout your work day. A Culligan Water Cooler offers you a choice of hot or cold water, as well as ambient temperature, literally at the press of a button. We bring the water to you, so you don't need to worry about stock, or carrying heavy water bottles from the store.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-3">
                In order to deliver you something "special and unique" your Territory Sales Officer will provide the following:
              </p>
              <ul className="mt-3 space-y-2">
                {officeServiceItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Why choose us */}
            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Why Choose Us?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Providing Culligan bottled water to thousands of offices across Karachi we are committed to creating personable, quality service directly to your office. The amount of water, the delivery frequency and the time of delivery, are all tailored to fit your requirements.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                More people are drinking bottled water than ever before — not just at home or in the gym, but in the workplace too. If employees spend 20+ hours a week at work, providing great-tasting bottled water is a simple, cost-effective way to care for their health.
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
                Benefits of Promoting Health in the Workplace
              </h3>
              <ul className="space-y-2">
                {officeBenefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing table */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
                Products &amp; Pricing
              </h3>

              {/* Mobile: stacked cards (hidden on sm+) */}
              <div className="sm:hidden space-y-2">
                {[
                  { product: "12 Litre Bottle", min: "Minimum 3", price: "Rs. 275" },
                  { product: "19 Litre Bottle", min: "Minimum 3", price: "Rs. 380" },
                ].map((row) => (
                  <div key={row.product} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 space-y-1.5">
                    <p className="font-bold text-slate-800 text-sm">{row.product}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{row.min}</span>
                      <span className="text-sm font-black text-sky-700">{row.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: table (hidden below sm) */}
              <div className="hidden sm:block rounded-2xl border border-slate-100 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-sky-50 border-b border-slate-100">
                      <th className="text-left px-4 py-3 font-bold text-slate-700">Product</th>
                      <th className="text-left px-4 py-3 font-bold text-slate-700">Min. Order</th>
                      <th className="text-right px-4 py-3 font-bold text-slate-700">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-50">
                      <td className="px-4 py-3 text-slate-700 font-medium">12 Litre Bottle</td>
                      <td className="px-4 py-3 text-slate-500">Minimum 3</td>
                      <td className="px-4 py-3 text-right font-bold text-sky-700">Rs. 275</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-slate-700 font-medium">19 Litre Bottle</td>
                      <td className="px-4 py-3 text-slate-500">Minimum 3</td>
                      <td className="px-4 py-3 text-right font-bold text-sky-700">Rs. 380</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Info popup buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setDepositOpen(true)}
                className="flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-100 px-4 py-3 text-left transition-colors group"
              >
                <Info className="w-4 h-4 text-sky-500 shrink-0" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-sky-700">Deposit Information</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto group-hover:text-sky-500" />
              </button>
              <button
                onClick={() => setCouponOpen(true)}
                className="flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-100 px-4 py-3 text-left transition-colors group"
              >
                <BookOpen className="w-4 h-4 text-sky-500 shrink-0" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-sky-700">What is a Coupon?</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto group-hover:text-sky-500" />
              </button>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 p-5 text-center">
              <p className="text-sm font-semibold text-slate-800 mb-1">Ready to get started?</p>
              <p className="text-xs text-slate-500 mb-3">Request a sales call for a customised quotation.</p>
              <a
                href="#order"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-700 hover:underline"
              >
                Request a Sales Call <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </motion.div>
      </motion.div>

      {/* Deposit sub-popup */}
      <AnimatePresence>
        {depositOpen && (
          <motion.div
            key="deposit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setDepositOpen(false)}
          >
            <motion.div
              key="deposit-modal"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                    <Info className="w-4 h-4 text-sky-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Deposit Information</h3>
                </div>
                <button onClick={() => setDepositOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="px-6 py-5 space-y-3">
                <p className="text-sm text-slate-600 leading-relaxed">
                  The minimum order for the 19 litre bottle is <span className="font-semibold text-slate-800">3 units</span>. The security deposit for which is <span className="font-semibold text-slate-800">PKR 800 each</span>.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For 4 bottles, a security deposit of <span className="font-semibold text-slate-800">PKR 3,200</span> has to be made.
                </p>
                <div className="rounded-xl bg-sky-50 border border-sky-100 px-4 py-3 text-sm text-sky-800">
                  The security deposit amount is <span className="font-semibold">fully refundable</span> upon account closure. A partial refund can also be made if the customer has more than 3 bottles deposited, as a minimum of 3 bottles must be registered to avail free home delivery.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coupon sub-popup */}
      <AnimatePresence>
        {couponOpen && (
          <motion.div
            key="coupon-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setCouponOpen(false)}
          >
            <motion.div
              key="coupon-modal"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-sky-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">What is a Coupon?</h3>
                </div>
                <button onClick={() => setCouponOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="px-6 py-5 space-y-3">
                <p className="text-sm text-slate-600 leading-relaxed">
                  The coupon book consists of <span className="font-semibold text-slate-800">11 coupons</span>, each redeemable against 1 (one) 19-litre bottle.
                </p>
                <div className="rounded-2xl border border-slate-100 divide-y divide-slate-50 overflow-x-auto">
                  {[
                    { label: "Coupon book price", value: "Rs. 4,070 (11 coupons)", color: "text-sky-700" },
                    { label: "Price per bottle via coupon", value: "Rs. 370", color: "text-sky-700" },
                    { label: "Saving vs. cash", value: "Rs. 10 (2.9%)", color: "text-emerald-600" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex items-center justify-between gap-4 px-4 py-2.5 flex-wrap">
                      <span className="text-sm text-slate-500 shrink-0">{label}</span>
                      <span className={`text-sm font-bold ${color} text-right`}>{value}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-sky-50 border border-sky-100 px-4 py-3 text-sm text-sky-800">
                  Pay mode can be <span className="font-semibold">switched at any time</span> between cash and coupon.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}

function WaterShopModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:max-w-lg max-h-[92dvh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                <Store className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Culligan Water Shops</h2>
                <p className="text-xs text-slate-400">Official display &amp; service centers</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

            {/* Intro */}
            <p className="text-sm text-slate-600 leading-relaxed">
              We have our Culligan Water Shops — display &amp; service centers in D.H.A &amp; Society (PECHS) area, where our complete range of products are on display for you to see &amp; our staff will be at hand to answer any queries you may have. In case you miss out on your delivery or require an urgent stock of bottled water, just visit us or give us a call and all your drinking water needs will be fulfilled.
            </p>

            {/* Hours + Phone */}
            <div className="rounded-2xl bg-amber-50 border border-amber-100 px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                Monday – Saturday &nbsp;|&nbsp; 10:00 am – 9:00 pm
              </div>
              <a
                href="tel:111353535"
                className="flex items-center gap-2 text-sm font-bold text-amber-700 hover:underline"
              >
                <Phone className="w-4 h-4 shrink-0" />
                111-35-35-35
              </a>
            </div>

            {/* Society Shop */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-[11px] font-extrabold text-amber-600 uppercase tracking-widest mb-3">
                Culligan Water Shop — Society
              </p>
              <div className="flex items-start gap-2 text-sm text-slate-600 mb-4">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>379 B, Adamjee Nagar Society, Block B, Adamjee Nagar Society, Karachi</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Culligan+Water+Shop+Society+379+B+Adamjee+Nagar+Society+Block+B+Adamjee+Nagar+Society+Karachi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:underline"
              >
                <Navigation className="w-3 h-3" />
                Get Directions
              </a>
            </div>

            {/* DHA Shop */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-[11px] font-extrabold text-amber-600 uppercase tracking-widest mb-3">
                Culligan Water Shop — DHA
              </p>
              <div className="flex items-start gap-2 text-sm text-slate-600 mb-4">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Ground Floor, 18-C, Lane 9, Corner of Lane 12, Nishat Commercial, Phase VI, D.H.A., Karachi</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Q3X5%2BP24+Culligan+Water+Shop+Lane+9+DHA+Phase+6+Nishat+Commercial+Karachi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:underline"
              >
                <Navigation className="w-3 h-3" />
                Get Directions
              </a>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CoolerGuideModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Wind className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Cooler Cleaning Guide</h2>
                <p className="text-xs text-slate-400">Step-by-step sanitization instructions</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-7">

            {/* Tip banner */}
            <div className="rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3 flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-snug">
                <span className="font-bold">Best time to clean:</span> When the bottle is empty — no need to waste water.
              </p>
            </div>

            {/* Supplies */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
                Before You Begin — Items Needed
              </h3>
              <ul className="space-y-2">
                {supplyItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning */}
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700 font-medium">
              ⚠️ Never use soaps, detergents, steel wool, or abrasive scrubbers inside the reservoir.
            </div>

            {/* Steps */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                Cleaning Steps
              </h3>
              <div className="space-y-3">
                {cleaningSteps.map((s) => (
                  <div key={s.step} className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {s.step}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                      <p className="text-sm text-slate-500 leading-snug mt-0.5">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 p-5 text-center">
              <p className="text-sm font-semibold text-slate-800 mb-1">Prefer a professional clean?</p>
              <p className="text-xs text-slate-500 mb-3">Our trained technicians handle the entire process for you.</p>
              <a
                href="#order"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
              >
                Book a cleaning service <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Services() {
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [officeOpen, setOfficeOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <>
      <section
        id="services"
        className="relative py-24 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #ffffff 0%, #f5fbff 40%, #eef7ff 70%, #f0f9ff 100%)" }}
      >
        {/* Blobs */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-35"
          style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 65%)", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-25"
          style={{ background: "radial-gradient(circle, #cffafe 0%, transparent 65%)", transform: "translate(-25%, 25%)" }}
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10">

          {/* ── Header ── */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border"
              style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", borderColor: "#bfdbfe" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-blue-600">What We Offer</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight"
            >
              Complete{" "}
              <span className="relative inline-block">
                <span className="relative z-10" style={{ color: "#1976d2" }}>Hydration Solutions</span>
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
              transition={{ delay: 0.15 }}
              className="mt-5 text-slate-500 text-base leading-relaxed max-w-lg mx-auto"
            >
              From home delivery to corporate accounts — we have your hydration covered end to end.
            </motion.p>
          </div>

          {/* ── Service Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isDispensers    = service.title === "Hot & Cold Dispensers";
              const isCoolerGuide   = service.hasGuide;
              const isShopFinder    = service.hasShopFinder;
              const isDeliveryGuide = service.hasDeliveryGuide;
              const isOfficeGuide   = service.hasOfficeGuide;
              const isContactPage    = !!(service as any).isContactPage;
              const isCorporatePage  = !!(service as any).isCorporatePage;
              const isClickable      = isDispensers || isCoolerGuide || isShopFinder || isDeliveryGuide || isOfficeGuide || isContactPage || isCorporatePage;

              const card = (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`group relative rounded-3xl bg-white border overflow-hidden
                             transition-all duration-300 flex flex-col p-6
                             ${isClickable ? "cursor-pointer" : ""}`}
                  style={{
                    borderColor: "#e2e8f0",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)",
                  }}
                >
                  {/* Top accent bar that reveals on hover */}
                  <div
                    className={`absolute top-0 left-4 right-4 h-[3px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    style={{ background: `linear-gradient(90deg, ${service.bg.includes("blue") ? "#bfdbfe" : service.bg.includes("sky") ? "#bae6fd" : service.bg.includes("emerald") ? "#a7f3d0" : service.bg.includes("amber") ? "#fde68a" : service.bg.includes("teal") ? "#99f6e4" : "#bfdbfe"}, transparent)` }}
                  />

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl ${service.bg} border ${service.border} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`h-6 w-6 ${service.color}`} />
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-2">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{service.description}</p>

                  {isDeliveryGuide && (
                    <span className="mt-4 text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      View delivery details <span>→</span>
                    </span>
                  )}
                  {isOfficeGuide && (
                    <span className="mt-4 text-xs font-semibold text-sky-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      View office delivery <span>→</span>
                    </span>
                  )}
                  {isDispensers && (
                    <span className="mt-4 text-xs font-semibold text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      View options <span>→</span>
                    </span>
                  )}
                  {isCoolerGuide && (
                    <span className="mt-4 text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      View cleaning guide <span>→</span>
                    </span>
                  )}
                  {isShopFinder && (
                    <span className="mt-4 text-xs font-semibold text-amber-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      View our shops <span>→</span>
                    </span>
                  )}
                  {isContactPage && (
                    <span className="mt-4 text-xs font-semibold text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Send us a message <span>→</span>
                    </span>
                  )}
                  {isCorporatePage && (
                    <span className="mt-4 text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Request pricing <span>→</span>
                    </span>
                  )}
                </motion.div>
              );

              if (isDeliveryGuide)  return <div key={service.title} onClick={() => setDeliveryOpen(true)}>{card}</div>;
              if (isOfficeGuide)    return <div key={service.title} onClick={() => setOfficeOpen(true)}>{card}</div>;
              if (isDispensers)     return <Link key={service.title} href="/dispensers">{card}</Link>;
              if (isCoolerGuide)    return <div key={service.title} onClick={() => setGuideOpen(true)}>{card}</div>;
              if (isShopFinder)     return <div key={service.title} onClick={() => setShopOpen(true)}>{card}</div>;
              if (isContactPage)    return <Link key={service.title} href="/contact">{card}</Link>;
              if (isCorporatePage)  return <Link key={service.title} href="/corporate-pricing">{card}</Link>;
              return <div key={service.title}>{card}</div>;
            })}
          </div>

        </div>
      </section>

      {deliveryOpen && <HomeDeliveryModal onClose={() => setDeliveryOpen(false)} />}
      {officeOpen && <OfficeDeliveryModal onClose={() => setOfficeOpen(false)} />}
      {guideOpen && <CoolerGuideModal onClose={() => setGuideOpen(false)} />}
      {shopOpen && <WaterShopModal onClose={() => setShopOpen(false)} />}
    </>
  );
}
