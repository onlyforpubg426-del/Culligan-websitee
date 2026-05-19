import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ShoppingCart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Category = "bottles" | "bundles";

const bottles = [
  { name: "19 Litre",   price: "Rs 300", image: "/bottles/19l.jpg",  badge: "Best Seller", popular: true },
  { name: "12 Litre",   price: "Rs 220", image: "/bottles/12l.jpg" },
  { name: "6 Litre",    price: "Rs 130", image: "/bottles/6l.jpg" },
  { name: "1.5 Litre",  price: "Rs 60",  image: "/bottles/1-5l.jpg" },
  { name: "500 ml",     price: "Rs 30",  image: "/bottles/500ml.jpg",  badge: "On-the-go" },
];

const bundles = [
  { name: "Bachat Bundle",    price: "Rs 1,200", image: "/bundles/bachat.jpg",     badge: "Savings" },
  { name: "Family Bundle",    price: "Rs 2,500", image: "/bundles/family.jpg",     badge: "Most Popular", popular: true },
  { name: "Freshness Bundle", price: "Rs 1,800", image: "/bundles/freshness.jpg" },
  { name: "Hydration Bundle", price: "Rs 2,000", image: "/bundles/hydration.jpg" },
  { name: "Picnic Bundle",    price: "Rs 900",   image: "/bundles/picnic.jpg",     badge: "Seasonal" },
  { name: "Purity Bundle",    price: "Rs 1,500", image: "/bundles/purity.jpg" },
];

const WA_URL = (text: string) =>
  `https://wa.me/923001113535?text=${encodeURIComponent(text)}`;

export function Products() {
  const [active, setActive] = useState<Category>("bottles");

  const items = active === "bottles" ? bottles : bundles;

  return (
    <section id="products" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-semibold tracking-widest uppercase"
            >
              Choose Your Water
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-4xl font-bold text-slate-900"
            >
              Products & Bundles
            </motion.h2>
          </div>

          <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-1 self-start md:self-auto">
            {(["bottles", "bundles"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "relative flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200",
                  active === cat
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-slate-700"
                )}
              >
                {cat === "bottles" ? <Package className="h-4 w-4" /> : <Tag className="h-4 w-4" />}
                {cat}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group relative flex flex-col rounded-2xl overflow-hidden
                           bg-white border border-border shadow-sm
                           hover:shadow-xl hover:-translate-y-1.5
                           transition-all duration-300"
              >
                {item.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge
                      className={cn(
                        "text-[11px] px-2 py-0.5 font-semibold shadow",
                        item.popular ? "bg-primary text-white" : "bg-yellow-400 text-yellow-900"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  </div>
                )}

                <div className="relative aspect-square bg-slate-50 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-slate-900 text-sm">{item.name}</h3>
                    {"price" in item && (
                      <span className="text-sm font-bold text-primary whitespace-nowrap">{(item as typeof bottles[0]).price}</span>
                    )}
                  </div>

                  <Button
                    asChild
                    size="sm"
                    className="w-full rounded-lg mt-auto text-xs font-semibold gap-1.5 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <a
                      href={WA_URL(`Hi! I'd like to order Culligan ${item.name}. Please confirm availability and delivery. Thank you!`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Order
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          All prices are per unit. Coupon book discounts available.{" "}
          <a href="#calculator" className="text-primary underline underline-offset-2">See the savings calculator</a>.
        </motion.p>
      </div>
    </section>
  );
}
