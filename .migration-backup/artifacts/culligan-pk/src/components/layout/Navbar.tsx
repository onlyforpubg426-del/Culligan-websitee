import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Droplet, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const navLinks = [
  { name: "Products",     href: "#products" },
  { name: "Purification", href: "#purification" },
  { name: "Services",     href: "#services" },
  { name: "Calculator",   href: "#calculator" },
];

export function Navbar() {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink,      setHoveredLink]      = useState<string | null>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white/90 backdrop-blur-lg shadow-md border-slate-200/70 py-2"
            : "bg-transparent border-transparent py-3"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">

            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                animate={shouldReduce ? {} : {
                  y: [0, -3, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                className={`p-1.5 rounded-lg text-primary-foreground transition-all duration-300 ${
                  isScrolled ? "bg-primary" : "bg-white/25 backdrop-blur-sm border border-white/40"
                }`}
              >
                <Droplet className="h-5 w-5 fill-current" />
              </motion.div>

              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className={`text-base font-bold tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                Culligan{" "}
                <span className={`font-medium transition-colors duration-300 ${
                  isScrolled ? "text-muted-foreground" : "text-white/80"
                }`}>
                  Water
                </span>
              </motion.span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`relative text-sm font-medium transition-colors duration-200 py-1 ${
                      isScrolled
                        ? "text-muted-foreground hover:text-primary"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    {link.name}
                    <AnimatePresence>
                      {hoveredLink === link.name && (
                        <motion.span
                          layoutId="nav-underline"
                          className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                            isScrolled ? "bg-primary" : "bg-white"
                          }`}
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.35, type: "spring", stiffness: 200 }}
              >
                <Button
                  asChild
                  className="relative overflow-hidden rounded-full px-5 h-8 text-sm font-semibold shadow-md group"
                >
                  <a href="#order">
                    <motion.span
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      animate={{ translateX: ["−100%", "200%"] }}
                      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
                    />
                    Order Now
                  </a>
                </Button>
              </motion.div>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-foreground hover:bg-slate-100" : "text-white hover:bg-white/15"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span key="menu"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="bg-white/95 backdrop-blur-lg border-t border-slate-200/60 shadow-xl px-4 py-5 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                    className="text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg px-3 py-3 transition-colors border-b border-slate-100 last:border-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.06 + 0.05, duration: 0.25 }}
                  className="mt-3"
                >
                  <Button asChild className="w-full rounded-full" size="lg">
                    <a href="#order" onClick={() => setIsMobileMenuOpen(false)}>
                      Order Now
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
