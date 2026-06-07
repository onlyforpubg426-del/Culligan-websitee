import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Phone, ShoppingCart, ArrowRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const navGroups = [
  {
    label: "Products",
    links: [
      { name: "Products",         href: "#products",      section: "products"      },
      { name: "Dispensers",       href: "/dispensers",    section: null            },
    ],
  },
  {
    label: "Learn",
    links: [
      { name: "About Water",      href: "/about-water",   section: null            },
      { name: "How We Purify",    href: "#purification",  section: "purification"  },
    ],
  },
  {
    label: "Company",
    links: [
      { name: "Services",         href: "#services",      section: "services"      },
      { name: "Find Us Near You", href: "#outlets",       section: "outlets"       },
      { name: "Testimonials",     href: "#testimonials",  section: "testimonials"  },
      { name: "FAQ",              href: "/faq",           section: null            },
      { name: "Contact Us",       href: "/contact",       section: null            },
    ],
  },
];

const allLinks = navGroups.flatMap((g) => g.links);
const anchorLinks = allLinks.filter((l) => l.section !== null);

export function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredLink,  setHoveredLink]  = useState<string | null>(null);
  const { totalItems, openCart }        = useCart();
  const [, navigate]                    = useLocation();
  const drawerRef                       = useRef<HTMLDivElement>(null);

  /* ── Scroll state + scroll-spy ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      /* Find the section whose top edge is within 20% below the nav */
      const threshold = window.innerHeight * 0.25;
      let found: string | null = null;
      for (const link of anchorLinks) {
        const el = document.getElementById(link.section!);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= threshold) found = link.section;
      }
      setActiveSection(found);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Lock body scroll when drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleLink = (href: string) => {
    closeMenu();
    if (href.startsWith("/")) {
      navigate(href);
    } else {
      setTimeout(() => {
        const id = href.replace("#", "");
        const el = document.getElementById(id) ?? document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 140);
    }
  };

  const isLinkActive = (link: typeof allLinks[number]) => {
    if (link.section && activeSection === link.section) return true;
    return false;
  };

  const navHeight = scrolled ? "52px" : "60px";

  return (
    <>
      {/* ── Nav bar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        aria-label="Site navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,box-shadow,border-color] duration-300 ${
          scrolled
            ? "bg-white/98 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_32px_rgba(0,0,0,0.09)] border-b border-slate-100"
            : "bg-white/70 backdrop-blur-md border-b border-white/40"
        }`}
        style={{ height: navHeight }}
      >
        <div className="h-full max-w-[1440px] mx-auto px-3 sm:px-6 flex items-center justify-between gap-2">

          {/* Logo — capped to avoid overlap on compact phones */}
          <Link
            href="/"
            className="flex items-center shrink-0 select-none"
            onClick={closeMenu}
          >
            <motion.img
              src={`${BASE}/culligan-logo.png`}
              alt="Culligan Water"
              animate={{ height: scrolled ? 26 : 32 }}
              transition={{ duration: 0.25 }}
              className="w-auto max-w-[90px] xs:max-w-[110px] sm:max-w-[130px] object-contain object-left drop-shadow-sm"
            />
          </Link>

          {/* ── Desktop nav links — xl breakpoint (≥1280px) ── */}
          <nav className="hidden xl:flex items-center" aria-label="Primary">
            {allLinks.map((link) => {
              const isPage    = link.href.startsWith("/");
              const active    = isLinkActive(link);
              const hovered   = hoveredLink === link.name;
              const highlight = active || hovered;

              const cls = `relative px-3 py-2 text-[13px] font-semibold whitespace-nowrap rounded-lg
                           transition-colors duration-150 select-none
                           ${highlight ? "text-[#1d6fa4]" : "text-slate-600 hover:text-[#1d6fa4]"}`;

              const inner = (
                <>
                  {link.name}
                  {highlight && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-[#42a5f5]"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </>
              );

              return isPage ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cls}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {inner}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={cls}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={(e) => { e.preventDefault(); handleLink(link.href); }}
                >
                  {inner}
                </a>
              );
            })}
          </nav>

          {/* ── Desktop right actions ── */}
          <div className="hidden xl:flex items-center gap-2">
            <a
              href="tel:+922111353535"
              className="flex items-center gap-1.5 px-2 text-[12.5px] font-semibold whitespace-nowrap
                         text-slate-500 hover:text-[#1d6fa4] transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              111&nbsp;35&nbsp;35&nbsp;35
            </a>

            <div className="w-px h-4 bg-slate-200" />

            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-xl
                         hover:bg-slate-100 transition-colors text-slate-600"
            >
              <ShoppingCart className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px]
                               bg-blue-600 text-white text-[10px] font-bold
                               rounded-full flex items-center justify-center px-1 leading-none"
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <a
              href="#order"
              className="inline-flex items-center gap-1.5
                         rounded-full px-5 h-[36px] text-[13px] font-bold text-white
                         transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#2196f3,#42a5f5)" }}
            >
              Order Now
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* ── Mobile / tablet right cluster (< xl) ── */}
          <div className="xl:hidden flex items-center gap-1">

            {/* Phone link — visible on sm+ only to avoid logo clash on tiny phones */}
            <a
              href="tel:+922111353535"
              aria-label="Call us"
              className="hidden sm:flex items-center justify-center
                         w-12 h-12 rounded-xl text-slate-600
                         hover:bg-slate-100 transition-colors touch-manipulation"
            >
              <Phone className="w-[18px] h-[18px]" />
            </a>

            {/* Cart */}
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative flex items-center justify-center w-12 h-12
                         rounded-xl text-slate-700 hover:bg-slate-100
                         transition-colors touch-manipulation"
            >
              <ShoppingCart className="h-[20px] w-[20px]" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px]
                               bg-blue-600 text-white text-[9px] font-bold
                               rounded-full flex items-center justify-center px-1 leading-none"
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger — 48 × 48 hit area, 24px icon */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              className="flex items-center justify-center w-12 h-12 rounded-xl
                         text-slate-700 hover:bg-slate-100 active:bg-slate-200
                         transition-colors touch-manipulation"
            >
              <span
                aria-hidden="true"
                className="flex flex-col justify-center items-center w-6 h-6 gap-[5px]"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="block w-6 h-[2.5px] rounded-full bg-current origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.16 }}
                  className="block w-6 h-[2.5px] rounded-full bg-current"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="block w-6 h-[2.5px] rounded-full bg-current origin-center"
                />
              </span>
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Height spacer */}
      <motion.div
        animate={{ height: navHeight }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />

      {/* ── Mobile / tablet drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 bg-slate-900/45 backdrop-blur-[3px]"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="nav-drawer"
              id="mobile-drawer"
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 38, mass: 0.9 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col
                         w-[82vw] max-w-[360px] bg-white
                         shadow-[-4px_0_48px_rgba(0,0,0,0.18)]"
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-5 border-b border-slate-100"
                style={{
                  paddingTop: "calc(env(safe-area-inset-top, 0px) + 18px)",
                  paddingBottom: "14px",
                }}
              >
                <Link href="/" onClick={closeMenu} className="select-none">
                  <img
                    src={`${BASE}/culligan-logo.png`}
                    alt="Culligan Water"
                    className="h-9 w-auto max-w-[140px] object-contain object-left"
                  />
                </Link>

                {/* Close button — 44 × 44 touch target */}
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="flex items-center justify-center w-11 h-11 rounded-xl
                             bg-slate-100 text-slate-600
                             active:bg-slate-200 transition-colors touch-manipulation"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Scrollable nav groups */}
              <div className="flex-1 overflow-y-auto overscroll-contain py-2 px-3">
                {navGroups.map((group, gi) => (
                  <div key={group.label} className={gi > 0 ? "mt-2 pt-2 border-t border-slate-100" : ""}>
                    <p className="px-4 pt-2 pb-1 text-[10.5px] font-extrabold tracking-[0.14em] uppercase text-slate-400 select-none">
                      {group.label}
                    </p>

                    {group.links.map((link, li) => {
                      const active = isLinkActive(link);
                      return (
                        <motion.button
                          key={link.name}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: gi * 0.05 + li * 0.045, duration: 0.22, ease: "easeOut" }}
                          onClick={() => handleLink(link.href)}
                          className={`w-full flex items-center justify-between
                                     min-h-[56px] px-4 rounded-xl
                                     text-[15px] font-semibold
                                     active:bg-blue-100
                                     transition-colors duration-150
                                     touch-manipulation text-left
                                     ${active
                                       ? "bg-blue-50 text-[#1d6fa4]"
                                       : "text-slate-800 hover:bg-blue-50/70 hover:text-[#1d6fa4]"
                                     }`}
                        >
                          <span className="flex items-center gap-2">
                            {active && (
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#42a5f5] shrink-0" />
                            )}
                            {link.name}
                          </span>
                          <ArrowRight className={`w-4 h-4 shrink-0 ${active ? "opacity-60" : "opacity-25"}`} />
                        </motion.button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Bottom CTA bar */}
              <div
                className="px-4 pt-3 border-t border-slate-100 flex flex-col gap-2.5"
                style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
              >
                <a
                  href="#order"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2
                             min-h-[54px] rounded-2xl
                             bg-green-600 text-white font-bold text-[15px]
                             touch-manipulation transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  Order on WhatsApp
                </a>

                <a
                  href="tel:+922111353535"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2
                             min-h-[48px] rounded-2xl
                             bg-slate-50 border border-slate-200
                             text-slate-700 font-semibold text-[14px]
                             touch-manipulation transition-colors hover:bg-slate-100"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  111&nbsp;35&nbsp;35&nbsp;35
                </a>

                <p className="text-center text-[11px] text-slate-400 pb-1">
                  Pakistan's Premium Water Brand · Est. 1997
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
