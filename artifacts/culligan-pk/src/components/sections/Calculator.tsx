import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const BOTTLE_PRICE = 300;
const COUPON_DISCOUNT_PER_BOTTLE = 70;

export function Calculator() {
  const [bottlesPerMonth, setBottlesPerMonth] = useState(6);

  const couponBooksNeeded = Math.ceil(bottlesPerMonth / 12);
  const regularCost = bottlesPerMonth * BOTTLE_PRICE;
  const couponCostPerBottle = BOTTLE_PRICE - COUPON_DISCOUNT_PER_BOTTLE;
  const withCouponsCost = bottlesPerMonth * couponCostPerBottle;
  const monthlySaving = regularCost - withCouponsCost;
  const annualSaving = monthlySaving * 12;

  return (
    <section id="calculator" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-semibold tracking-widest uppercase"
            >
              Coupon Book Calculator
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-4xl font-bold text-slate-900"
            >
              See How Much You Save
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-lg text-muted-foreground"
            >
              Coupon books unlock significant savings on every order.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-border shadow-sm p-8"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-slate-800">Bottles per month</label>
                <span className="text-xl font-bold text-primary">{bottlesPerMonth}</span>
              </div>
              <Slider
                min={3}
                max={30}
                step={1}
                value={[bottlesPerMonth]}
                onValueChange={([v]) => setBottlesPerMonth(v)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>3 (min)</span>
                <span>30</span>
              </div>
            </div>

            <div className="mb-8 flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <TrendingDown className="h-4 w-4" />
              </div>
              <p className="text-sm text-slate-700">
                For <strong>{bottlesPerMonth} bottles/month</strong>, you need{" "}
                <strong className="text-primary">{couponBooksNeeded} coupon book{couponBooksNeeded > 1 ? "s" : ""}</strong>{" "}
                per month.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Regular cost", value: `Rs ${regularCost.toLocaleString()}`, highlight: false },
                { label: "With coupons", value: `Rs ${withCouponsCost.toLocaleString()}`, highlight: false },
                { label: "Monthly saving", value: `Rs ${monthlySaving.toLocaleString()}`, highlight: true },
                { label: "Annual saving", value: `Rs ${annualSaving.toLocaleString()}`, highlight: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-xl p-4 text-center ${
                    item.highlight
                      ? "bg-primary text-primary-foreground"
                      : "bg-slate-50 border border-border"
                  }`}
                >
                  <div className={`text-xs font-medium mb-1 ${item.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {item.label}
                  </div>
                  <div className={`text-xl font-bold ${item.highlight ? "text-white" : "text-slate-900"}`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-center text-muted-foreground mt-5">
              Savings based on standard coupon book pricing. Contact us for bulk or corporate rates.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
