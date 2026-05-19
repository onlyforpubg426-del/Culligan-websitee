import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const WA_URL = "https://wa.me/923001113535?text=" + encodeURIComponent(
  "Hi! I'd like to order Culligan Water. Please share availability and delivery details. Thank you!"
);

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible || dismissed) return;
    const timer = setTimeout(() => {
      setTooltipOpen(true);
      setTimeout(() => setTooltipOpen(false), 4000);
    }, 4000);
    return () => clearTimeout(timer);
  }, [visible, dismissed]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        >
          <AnimatePresence>
            {tooltipOpen && !dismissed && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center gap-2 bg-white text-slate-800 text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-border max-w-[200px]"
              >
                <span>Order water in 30 seconds!</span>
                <button
                  onClick={() => { setTooltipOpen(false); setDismissed(true); }}
                  className="text-muted-foreground hover:text-slate-700 shrink-0"
                  aria-label="Dismiss"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <div className="absolute -bottom-2 right-7 w-4 h-2 overflow-hidden">
                  <div className="w-3 h-3 bg-white border-r border-b border-border rotate-45 translate-x-0.5 -translate-y-1.5 shadow-sm" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on WhatsApp"
            onHoverStart={() => !dismissed && setTooltipOpen(true)}
            onHoverEnd={() => setTooltipOpen(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl shadow-green-500/40"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
            <svg
              className="w-8 h-8 text-white relative z-10"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.854L.057 23.268a.75.75 0 00.917.915l5.428-1.473A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.741-.522-5.295-1.432l-.38-.223-3.923 1.065 1.068-3.898-.247-.394A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
