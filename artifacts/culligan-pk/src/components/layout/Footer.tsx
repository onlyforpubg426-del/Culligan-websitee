import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Facebook, Instagram, X, FileText,
  ArrowRight, Droplets, ShieldCheck, Award, FlaskConical,
} from "lucide-react";
import { Link } from "wouter";

/* ─── Data ────────────────────────────────────────────────── */

const awardImages = [
  { src: "/award-1.jpg", alt: "Culligan International — Award for Fighting Against All Odds (Johan Pvt. Ltd., 2004)" },
  { src: "/award-2.jpg", alt: "Regional Brands of the Year Award 2006–07 — Best Brand Performance in Drinking Water (Johan Pvt. Ltd.)" },
];

const licenseImages = [
  { src: "/license-1.jpg", alt: "Culligan International — Authorized Distributor Letter (Johan Pvt. Ltd., 2004)" },
  { src: "/license-2.jpg", alt: "PSQCA — Licence for the use of the Pakistan Standard Mark (No. CM/L-1363/2002, 2026–2027)" },
];

const intlCerts = [
  { src: "/intl-cert-1.jpg", alt: "Culligan International — Authorized Representative Certificate (Johan Pvt. Ltd., 2004)" },
  { src: "/intl-cert-2.jpg", alt: "International Halal Certification — Halal Certificate (Culligan Water, 2026–2027)" },
  { src: "/intl-cert-3.jpg", alt: "Bureau Veritas — ISO 22000:2018 Certification (Johan Pvt. Ltd., 2024–2027)" },
];

const labReports = [
  { src: "/lab-report-1.jpg", alt: "Bahria University ERC — Analytical Test Report (19L, Apr 2025) Page 1" },
  { src: "/lab-report-2.jpg", alt: "Bahria University ERC — Analytical Test Report (19L, Apr 2025) Page 2" },
  { src: "/lab-report-3.jpg", alt: "Bahria University ERC — Microbiological Report (19L, Sep 2025)" },
  { src: "/lab-report-4.jpg", alt: "Bahria University ERC — Microbiological Report (12L, Sep 2025)" },
  { src: "/lab-report-5.jpg", alt: "Aga Khan University Hospital — Water Quality Report (Jul 2025)" },
  { src: "/lab-report-6.jpg", alt: "Aga Khan University Hospital — Water Quality Report (Aug 2025)" },
];

/* ─── Shared Modal Shell ──────────────────────────────────── */

function Modal({
  onClose,
  icon: Icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  children,
}: {
  onClose: () => void;
  icon: typeof FileText;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl max-h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: iconBg }}>
              <Icon className="w-4 h-4" style={{ color: iconColor }} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{title}</h2>
              <p className="text-xs text-slate-400">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4 space-y-4">{children}</div>
      </div>
    </div>
  );
}

function AwardsModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} icon={FileText} iconBg="#fefce8" iconColor="#ca8a04"
      title="Awards" subtitle="Culligan International · Regional Brands of the Year 2006–07">
      {awardImages.map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} className="w-full rounded-xl border border-slate-200" />
      ))}
    </Modal>
  );
}

function LicenseModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} icon={FileText} iconBg="#fffbeb" iconColor="#d97706"
      title="License" subtitle="Culligan International · PSQCA Pakistan Standard Mark">
      {licenseImages.map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} className="w-full rounded-xl border border-slate-200" />
      ))}
    </Modal>
  );
}

function IntlCertsModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} icon={FileText} iconBg="#f0f9ff" iconColor="#0284c7"
      title="International Standards" subtitle="Culligan International · Halal · ISO 22000:2018">
      {intlCerts.map((c) => (
        <img key={c.src} src={c.src} alt={c.alt} className="w-full rounded-xl border border-slate-200" />
      ))}
    </Modal>
  );
}

function LabReportsModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} icon={FileText} iconBg="#f0fdf4" iconColor="#059669"
      title="Lab Reports" subtitle="Bahria University ERC & Aga Khan University Hospital">
      {labReports.map((r) => (
        <img key={r.src} src={r.src} alt={r.alt} className="w-full rounded-xl border border-slate-200" />
      ))}
    </Modal>
  );
}

function ExemptionCertModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} icon={FileText} iconBg="#eff6ff" iconColor="#2563eb"
      title="Exemption Certificate" subtitle="Federal Board of Revenue — Johan (Pvt) Ltd">
      <img src="/exemption-cert-p1.png" alt="Exemption Certificate Page 1" className="w-full rounded-xl border border-slate-200" />
      <img src="/exemption-cert-p2.png" alt="Exemption Certificate Page 2" className="w-full rounded-xl border border-slate-200" />
    </Modal>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */

const quickLinks = [
  { label: "Choose Your Water", href: "#products" },
  { label: "How We Purify", href: "#purification" },
  { label: "Our Services", href: "#services" },
  { label: "Savings Calculator", href: "#calculator" },
  { label: "Retail Outlets", href: "#outlets" },
];

const learnLinks = [
  { label: "About Bottled Water", to: "/about-water" },
  { label: "Water Dispensers", to: "/dispensers" },
  { label: "Brand History", to: "/history" },
  { label: "FAQs", to: "/faq" },
  { label: "Contact Us", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy-policy" },
];

const stats = [
  { value: "27", unit: "yrs", label: "Trusted Since 1997" },
  { value: "10K+", unit: "", label: "Happy Families" },
  { value: "99.9%", unit: "", label: "Contaminant Removal" },
  { value: "4.8★", unit: "", label: "Customer Rating" },
];

export function Footer() {
  const [certOpen, setCertOpen] = useState(false);
  const [labOpen, setLabOpen] = useState(false);
  const [intlOpen, setIntlOpen] = useState(false);
  const [licenseOpen, setLicenseOpen] = useState(false);
  const [awardsOpen, setAwardsOpen] = useState(false);

  return (
    <>
      <footer
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(175deg, #06111f 0%, #0a1a2e 40%, #071525 100%)" }}
      >

        {/* ── Atmospheric glow orbs ── */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(33,150,243,0.07) 0%, transparent 65%)", transform: "translateY(-40%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(25,118,210,0.05) 0%, transparent 65%)", transform: "translateY(40%)" }} />

        {/* ── Dot grid texture ── */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(rgba(147,197,253,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        {/* ══════════════════════════════════════════════
            CTA STRIP
        ══════════════════════════════════════════════ */}
        <div className="relative border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="container mx-auto px-4 md:px-6 py-14">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

              {/* Left — statement */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-[10px] font-extrabold tracking-[0.22em] uppercase"
                  style={{ background: "rgba(33,150,243,0.12)", border: "1px solid rgba(33,150,243,0.2)", color: "#60b4f8" }}>
                  <Droplets className="w-3 h-3" />
                  Same-day delivery · Karachi
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
                  Ready for Pure Water,{" "}
                  <span style={{ color: "#42a5f5" }}>Delivered Today?</span>
                </h2>
                <p className="mt-3 text-slate-400 text-sm max-w-md">
                  RO + ozone purified. Lab verified. Free delivery on every order across Karachi.
                </p>
              </div>

              {/* Right — CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <a
                  href="https://wa.me/923333535353"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm text-white overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", boxShadow: "0 4px 24px rgba(34,197,94,0.3)" }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-in-out pointer-events-none"
                    style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)" }} />
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.088.535 4.05 1.475 5.762L0 24l6.395-1.459A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.87 9.87 0 01-5.032-1.373l-.361-.214-3.741.854.87-3.643-.235-.374A9.862 9.862 0 012.118 12C2.118 6.532 6.532 2.118 12 2.118S21.882 6.532 21.882 12 17.468 21.882 12 21.882z" />
                  </svg>
                  Order on WhatsApp
                </a>
                <a
                  href="tel:11135353535"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white border transition-all hover:border-blue-400/50"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)" }}
                >
                  <Phone className="w-4 h-4 shrink-0" style={{ color: "#60b4f8" }} />
                  111 35 35 35
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            STATS STRIP
        ══════════════════════════════════════════════ */}
        <div className="relative border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={s.label} className="relative text-center py-4 px-3 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {i < stats.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px"
                      style={{ background: "rgba(255,255,255,0.06)" }} />
                  )}
                  <div className="text-2xl md:text-3xl font-black tracking-tight leading-none" style={{ color: "#60b4f8" }}>
                    {s.value}<span className="text-base font-bold opacity-70">{s.unit}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1.5 font-medium tracking-wide uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            MAIN FOOTER GRID
        ══════════════════════════════════════════════ */}
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

            {/* ── Col 1: Brand ── */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <img
                  src="/culligan-logo.png"
                  alt="Culligan Water"
                  className="h-8 w-auto max-w-[150px] object-contain object-left brightness-0 invert opacity-90"
                />
                <p className="mt-5 text-sm leading-relaxed text-slate-400 max-w-xs">
                  Pakistan's most trusted water brand since 1997. RO + ozone purified water delivered to your door — lab verified, PSQCA licensed, ISO certified.
                </p>
              </div>

              {/* Certification pills */}
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-slate-600 mb-3">Verified Standards</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "PSQCA Licensed", icon: ShieldCheck, color: "#fbbf24" },
                    { label: "ISO 22000:2018", icon: Award, color: "#60b4f8" },
                    { label: "Halal Certified", icon: FlaskConical, color: "#34d399" },
                    { label: "Lab Verified", icon: FlaskConical, color: "#a78bfa" },
                  ].map((c) => {
                    const CIcon = c.icon;
                    return (
                      <div key={c.label}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
                        style={{ background: `${c.color}12`, border: `1px solid ${c.color}25`, color: c.color }}>
                        <CIcon className="w-2.5 h-2.5 shrink-0" />
                        {c.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-3">
                <a href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                  aria-label="Facebook">
                  <Facebook className="h-4 w-4 text-slate-400" />
                </a>
                <a href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                  aria-label="Instagram">
                  <Instagram className="h-4 w-4 text-slate-400" />
                </a>
              </div>
            </div>

            {/* ── Col 2: Quick Links ── */}
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-slate-600 mb-5">Quick Links</p>
              <ul className="space-y-3">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}
                      className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                      <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Learn More ── */}
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-slate-600 mb-5">Learn More</p>
              <ul className="space-y-3">
                {learnLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.to}
                      className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                      <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 4: Contact + Docs ── */}
            <div className="space-y-8">

              {/* Contact */}
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-slate-600 mb-5">Get in Touch</p>
                <ul className="space-y-4">
                  <li>
                    <a href="tel:11135353535" className="group flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "rgba(33,150,243,0.12)", border: "1px solid rgba(33,150,243,0.2)" }}>
                        <Phone className="w-3.5 h-3.5" style={{ color: "#60b4f8" }} />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-600 uppercase tracking-wider font-medium mb-0.5">UAN Support</div>
                        <div className="text-white font-black text-lg tracking-tight leading-none group-hover:text-blue-400 transition-colors">
                          111 35 35 35
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:support@culligan.com.pk" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      support@culligan.com.pk
                    </a>
                  </li>
                  <li>
                    <div className="flex items-start gap-3 text-sm text-slate-400">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <span className="leading-relaxed">Head Office, Karachi, Pakistan<br /><span className="text-slate-500 text-xs">Free delivery on all Karachi orders</span></span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Documents */}
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-slate-600 mb-4">Documents</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "License",                color: "#fbbf24", colorBg: "rgba(251,191,36,0.1)",  colorBorder: "rgba(251,191,36,0.2)",  onClick: () => setLicenseOpen(true) },
                    { label: "International Standards", color: "#60b4f8", colorBg: "rgba(96,180,248,0.1)",  colorBorder: "rgba(96,180,248,0.2)",  onClick: () => setIntlOpen(true) },
                    { label: "Lab Reports",            color: "#34d399", colorBg: "rgba(52,211,153,0.1)",  colorBorder: "rgba(52,211,153,0.2)",  onClick: () => setLabOpen(true) },
                    { label: "Awards",                 color: "#f59e0b", colorBg: "rgba(245,158,11,0.1)",  colorBorder: "rgba(245,158,11,0.2)",  onClick: () => setAwardsOpen(true) },
                    { label: "Exemption Certificate",  color: "#a78bfa", colorBg: "rgba(167,139,250,0.1)", colorBorder: "rgba(167,139,250,0.2)", onClick: () => setCertOpen(true) },
                  ].map((d) => (
                    <motion.button
                      key={d.label}
                      whileHover={{ x: 3 }}
                      onClick={d.onClick}
                      className="group flex items-center gap-2.5 text-left w-full"
                    >
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all"
                        style={{ background: d.colorBg, border: `1px solid ${d.colorBorder}`, color: d.color }}>
                        <FileText className="w-2.5 h-2.5 shrink-0" />
                        {d.label}
                        <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity -ml-0.5" />
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════════ */}
        <div className="relative" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {/* Gradient rule */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(33,150,243,0.4), transparent)" }} />

          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-slate-600">

              <div className="flex items-center gap-3">
                <img src="/culligan-logo.png" alt="" className="h-5 w-auto opacity-20 brightness-0 invert" />
                <span>© {new Date().getFullYear()} Culligan Pakistan (Johan Pvt. Ltd.). All rights reserved.</span>
              </div>

              <div className="flex items-center gap-6">
                <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
                <span className="w-px h-3 bg-slate-800" />
                <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
                <span className="w-px h-3 bg-slate-800" />
                <Link href="/contact" className="hover:text-slate-400 transition-colors">Contact</Link>
              </div>

            </div>
          </div>
        </div>

      </footer>

      {certOpen    && <ExemptionCertModal onClose={() => setCertOpen(false)} />}
      {labOpen     && <LabReportsModal    onClose={() => setLabOpen(false)} />}
      {intlOpen    && <IntlCertsModal     onClose={() => setIntlOpen(false)} />}
      {licenseOpen && <LicenseModal       onClose={() => setLicenseOpen(false)} />}
      {awardsOpen  && <AwardsModal        onClose={() => setAwardsOpen(false)} />}
    </>
  );
}
