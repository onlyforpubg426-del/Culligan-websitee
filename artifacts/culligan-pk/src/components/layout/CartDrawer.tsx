import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ShoppingBag, Minus, Plus, Trash2, MessageCircle,
  ChevronRight, ChevronLeft, CheckCircle2, Truck, User, Phone, MapPin,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const API = `${BASE}/api`;

type Step = "cart" | "checkout" | "done";

export function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, totalItems, totalPrice, isOpen, closeCart } =
    useCart();

  const [step, setStep] = useState<Step>("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function handleClose() {
    closeCart();
    setTimeout(() => {
      if (step === "done") {
        setStep("cart");
        setName(""); setPhone(""); setAddress(""); setNotes("");
        setErrors({});
      }
    }, 350);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!phone.trim() || phone.trim().length < 10) e.phone = "Enter a valid mobile number";
    if (!address.trim()) e.address = "Please enter your delivery address";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleCheckout() {
    if (!validate()) return;
    setSubmitting(true);

    const bundleStr = items
      .map((i) => `${i.qty}× ${i.name} (${i.label})`)
      .join(", ");

    try {
      await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, address, bundle: bundleStr, notes }),
      });
    } catch {}

    setSubmitting(false);
    setStep("done");
    clearCart();

    const lines = items
      .map((i) => `• ${i.qty}× ${i.name} (${i.label}) — Rs ${(i.price * i.qty).toLocaleString()}`)
      .join("\n");

    const msg = [
      "Hi, I'd like to place a Culligan water order! 🚿",
      "",
      "🛒 Items:",
      lines,
      "",
      `💰 Total: Rs ${totalPrice.toLocaleString()}`,
      "",
      `👤 Name: ${name}`,
      `📞 Phone: ${phone}`,
      `📍 Address: ${address}`,
      notes ? `📝 Notes: ${notes}` : "",
      "",
      "Please confirm availability and delivery. Thank you!",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/923222584525?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const inputClass = (field: string) =>
    `w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition
    ${errors[field] ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50 hover:border-slate-300"}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col shadow-[−8px_0_60px_rgba(0,0,0,0.18)]"
          >
            {/* ── Header ─────────────────────────────────────── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center">
                  <ShoppingBag className="h-[18px] w-[18px] text-blue-500" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-[15px] leading-tight">
                    {step === "checkout" ? "Checkout" : step === "done" ? "Order Placed" : "Your Cart"}
                  </h2>
                  {step === "cart" && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      {totalItems === 0
                        ? "No items yet"
                        : `${totalItems} item${totalItems !== 1 ? "s" : ""} · Rs ${totalPrice.toLocaleString()}`}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </div>

            {/* ── Body ───────────────────────────────────────── */}
            <AnimatePresence mode="wait">

              {/* DONE */}
              {step === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center gap-5 px-6 text-center"
                >
                  <div className="w-20 h-20 rounded-3xl bg-green-50 border border-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Order sent!</h3>
                    <p className="text-slate-500 text-sm mt-2 max-w-xs">
                      WhatsApp should have opened with your full order. If not, tap below to retry.
                    </p>
                  </div>
                  <Button
                    onClick={handleClose}
                    className="rounded-xl px-8 bg-slate-900 hover:bg-slate-800 text-white"
                  >
                    Done
                  </Button>
                </motion.div>
              )}

              {/* EMPTY */}
              {step === "cart" && items.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center"
                >
                  <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <ShoppingBag className="h-9 w-9 text-slate-200" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-700">Your cart is empty</h3>
                    <p className="text-slate-400 text-sm mt-1.5 max-w-xs">
                      Browse the products above and tap <strong>Add to Cart</strong> to get started.
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleClose} className="rounded-xl mt-1">
                    Browse Products
                  </Button>
                </motion.div>
              )}

              {/* CART ITEMS */}
              {step === "cart" && items.length > 0 && (
                <motion.div
                  key="items"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  {/* Scrollable item list */}
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 48, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-100 p-3"
                        >
                          {/* Thumbnail */}
                          <div className="w-[52px] h-[52px] rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                            <img
                              src={`${BASE}${item.image}`}
                              alt={item.name}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>

                          {/* Name + label + price */}
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 text-sm leading-tight truncate">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{item.label}</p>
                            <p className="text-sm font-black text-blue-600 mt-1">
                              Rs {(item.price * item.qty).toLocaleString()}
                            </p>
                          </div>

                          {/* Controls */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors group"
                              aria-label="Remove"
                            >
                              <Trash2 className="h-3.5 w-3.5 text-slate-300 group-hover:text-red-400 transition-colors" />
                            </button>
                            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2 py-1.5 shadow-sm">
                              <button
                                onClick={() => updateQty(item.id, -1)}
                                className="w-5 h-5 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
                              >
                                <Minus className="h-3 w-3 text-slate-500" />
                              </button>
                              <span className="text-sm font-bold text-slate-900 min-w-[1.25rem] text-center tabular-nums">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, 1)}
                                className="w-5 h-5 rounded-lg hover:bg-blue-50 flex items-center justify-center transition-colors"
                              >
                                <Plus className="h-3 w-3 text-blue-500" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Footer */}
                  <div className="shrink-0 px-5 pt-4 pb-6 border-t border-slate-100 space-y-4 bg-gradient-to-b from-white to-slate-50/60">
                    {/* Free delivery badge */}
                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-3.5 py-2.5">
                      <Truck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span className="text-emerald-700 text-xs font-semibold">Free delivery across Karachi</span>
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-sm font-medium">Order total</span>
                      <span className="text-2xl font-black text-slate-900">
                        Rs {totalPrice.toLocaleString()}
                      </span>
                    </div>

                    <Button
                      onClick={() => setStep("checkout")}
                      className="w-full rounded-xl h-12 font-bold text-[15px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all"
                    >
                      Proceed to Checkout
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* CHECKOUT FORM */}
              {step === "checkout" && (
                <motion.div
                  key="checkout"
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  {/* Back */}
                  <div className="px-5 pt-3.5 pb-1 shrink-0">
                    <button
                      onClick={() => setStep("cart")}
                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      Back to cart
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-5 pb-3 space-y-4">
                    {/* Order summary */}
                    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
                        Order Summary
                      </p>
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs text-slate-600">
                          <span className="font-medium">
                            {item.qty}× {item.name}
                          </span>
                          <span className="font-bold">
                            Rs {(item.price * item.qty).toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-slate-200 pt-2.5 mt-1 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">Total</span>
                        <span className="text-sm font-black text-blue-600">
                          Rs {totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Delivery details */}
                    <div className="space-y-3.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Delivery Details
                      </p>

                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5">
                          <User className="h-3 w-3" /> Full Name <span className="text-red-400 ml-0.5">*</span>
                        </label>
                        <input
                          value={name}
                          onChange={(e) => { setName(e.target.value); setErrors((v) => ({ ...v, name: "" })); }}
                          placeholder="e.g. Ahmed Khan"
                          autoComplete="name"
                          className={inputClass("name")}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5">
                          <Phone className="h-3 w-3" /> Phone Number <span className="text-red-400 ml-0.5">*</span>
                        </label>
                        <input
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value); setErrors((v) => ({ ...v, phone: "" })); }}
                          placeholder="e.g. 0300-1234567"
                          type="tel"
                          autoComplete="tel"
                          className={inputClass("phone")}
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5">
                          <MapPin className="h-3 w-3" /> Delivery Address <span className="text-red-400 ml-0.5">*</span>
                        </label>
                        <textarea
                          value={address}
                          onChange={(e) => { setAddress(e.target.value); setErrors((v) => ({ ...v, address: "" })); }}
                          placeholder="House 42, Block 6, PECHS, Karachi"
                          rows={2}
                          autoComplete="street-address"
                          className={`${inputClass("address")} resize-none`}
                        />
                        {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                          Notes <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Any special instructions…"
                          rows={2}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-3.5 py-2.5">
                        <Truck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span className="text-emerald-700 text-xs font-semibold">Free delivery · Cash on Delivery</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="shrink-0 px-5 pt-4 pb-6 border-t border-slate-100 space-y-2 bg-white">
                    <Button
                      onClick={handleCheckout}
                      disabled={submitting}
                      className="w-full rounded-xl h-12 font-bold text-[15px] bg-green-600 hover:bg-green-700 text-white gap-2.5 shadow-lg shadow-green-500/20 disabled:opacity-50 transition-all"
                    >
                      <MessageCircle className="h-5 w-5" />
                      {submitting ? "Sending…" : "Confirm Order via WhatsApp"}
                    </Button>
                    <p className="text-center text-xs text-slate-400">
                      Your order is confirmed via WhatsApp — no account needed.
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
