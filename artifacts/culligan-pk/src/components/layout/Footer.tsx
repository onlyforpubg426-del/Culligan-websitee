import { useState } from "react";
import {
  Phone, Mail, MapPin, Facebook, Instagram, X, FileText,
  ShieldCheck, Award, FlaskConical, ExternalLink,
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

/* ─── Shared Modal ────────────────────────────────────────── */

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
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
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
    <Modal onClose={onClose} icon={Award} iconBg="#fefce8" iconColor="#ca8a04"
      title="Awards" subtitle="Culligan International · Regional Brands of the Year 2006–07">
      {awardImages.map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} className="w-full rounded-xl border border-slate-200" />
      ))}
    </Modal>
  );
}

function LicenseModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} icon={ShieldCheck} iconBg="#fffbeb" iconColor="#d97706"
      title="License" subtitle="Culligan International · PSQCA Pakistan Standard Mark">
      {licenseImages.map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} className="w-full rounded-xl border border-slate-200" />
      ))}
    </Modal>
  );
}

function IntlCertsModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} icon={ShieldCheck} iconBg="#eff6ff" iconColor="#2563eb"
      title="International Standards" subtitle="Culligan International · Halal · ISO 22000:2018">
      {intlCerts.map((c) => (
        <img key={c.src} src={c.src} alt={c.alt} className="w-full rounded-xl border border-slate-200" />
      ))}
    </Modal>
  );
}

function LabReportsModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} icon={FlaskConical} iconBg="#f0fdf4" iconColor="#059669"
      title="Lab Reports" subtitle="Bahria University ERC & Aga Khan University Hospital">
      {labReports.map((r) => (
        <img key={r.src} src={r.src} alt={r.alt} className="w-full rounded-xl border border-slate-200" />
      ))}
    </Modal>
  );
}

function ExemptionCertModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} icon={FileText} iconBg="#f5f3ff" iconColor="#7c3aed"
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
  { label: "Find Us Near You", href: "#outlets" },
];

const learnLinks = [
  { label: "About Bottled Water", to: "/about-water" },
  { label: "Water Dispensers", to: "/dispensers" },
  { label: "Brand History", to: "/history" },
  { label: "FAQs", to: "/faq" },
  { label: "Contact Us", to: "/contact" },
];

const docs = [
  { label: "License",                 icon: ShieldCheck,  color: "#d97706", bg: "#fffbeb", border: "#fde68a", action: "license" },
  { label: "International Standards", icon: ShieldCheck,  color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", action: "intl" },
  { label: "Lab Reports",             icon: FlaskConical, color: "#059669", bg: "#f0fdf4", border: "#bbf7d0", action: "lab" },
  { label: "Awards",                  icon: Award,        color: "#ca8a04", bg: "#fefce8", border: "#fde68a", action: "awards" },
  { label: "Exemption Certificate",   icon: FileText,     color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", action: "cert" },
];

export function Footer() {
  const [certOpen, setCertOpen] = useState(false);
  const [labOpen, setLabOpen] = useState(false);
  const [intlOpen, setIntlOpen] = useState(false);
  const [licenseOpen, setLicenseOpen] = useState(false);
  const [awardsOpen, setAwardsOpen] = useState(false);

  function handleDoc(action: string) {
    if (action === "license") setLicenseOpen(true);
    if (action === "intl") setIntlOpen(true);
    if (action === "lab") setLabOpen(true);
    if (action === "awards") setAwardsOpen(true);
    if (action === "cert") setCertOpen(true);
  }

  return (
    <>
      <footer className="bg-white border-t border-slate-100">

        {/* ── thin top accent line ── */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 50%, #1976d2 100%)" }} />

        <div className="container mx-auto px-4 md:px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* ── Col 1: Brand ── */}
            <div className="space-y-5">
              <img
                src="/culligan-logo.png"
                alt="Culligan Water"
                className="h-9 w-auto max-w-[160px] object-contain object-left"
              />
              <p className="text-sm leading-relaxed text-slate-500 max-w-[240px]">
                Pakistan's most trusted water brand since 1997. RO + ozone purified, lab verified, and delivered free across Karachi.
              </p>

              {/* Cert pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "PSQCA",        color: "#d97706", bg: "#fffbeb" },
                  { label: "ISO 22000",    color: "#2563eb", bg: "#eff6ff" },
                  { label: "Halal",        color: "#059669", bg: "#f0fdf4" },
                  { label: "Lab Verified", color: "#7c3aed", bg: "#f5f3ff" },
                ].map((c) => (
                  <span key={c.label}
                    className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide"
                    style={{ background: c.bg, color: c.color }}>
                    {c.label}
                  </span>
                ))}
              </div>

              {/* Socials */}
              <div className="flex gap-2 pt-1">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Instagram, label: "Instagram" },
                ].map(({ Icon, label }) => (
                  <a key={label} href="#" aria-label={label}
                    className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 text-slate-400 flex items-center justify-center transition-all">
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Col 2: Quick Links ── */}
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-slate-400 mb-5">Quick Links</p>
              <ul className="space-y-3">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}
                      className="group flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium">
                      <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors shrink-0" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Learn + Docs ── */}
            <div className="space-y-8">
              <div>
                <p className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-slate-400 mb-5">Learn More</p>
                <ul className="space-y-3">
                  {learnLinks.map((l) => (
                    <li key={l.label}>
                      <Link href={l.to}
                        className="group flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium">
                        <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors shrink-0" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-slate-400 mb-4">Documents</p>
                <div className="flex flex-col gap-2">
                  {docs.map((d) => {
                    const DIcon = d.icon;
                    return (
                      <button key={d.label} onClick={() => handleDoc(d.action)}
                        className="group flex items-center gap-2 text-left w-fit">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all group-hover:shadow-sm"
                          style={{ background: d.bg, color: d.color, border: `1px solid ${d.border}` }}>
                          <DIcon className="w-3 h-3 shrink-0" />
                          {d.label}
                          <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-70 transition-opacity" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Col 4: Contact ── */}
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-slate-400 mb-5">Contact</p>
              <ul className="space-y-5">
                <li>
                  <a href="tel:11135353535" className="group block">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">UAN Support</div>
                    <div className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-none">
                      111 35 35 35
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:support@culligan.com.pk"
                    className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                    <Mail className="w-4 h-4 shrink-0 text-blue-400" />
                    support@culligan.com.pk
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Head Office, Karachi, Pakistan<br />
                      <span className="text-xs text-slate-400">Free delivery on all Karachi orders</span>
                    </p>
                  </div>
                </li>
                <li>
                  <a
                    href="https://wa.me/923333535353"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:shadow-md hover:shadow-green-200/60 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.088.535 4.05 1.475 5.762L0 24l6.395-1.459A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.87 9.87 0 01-5.032-1.373l-.361-.214-3.741.854.87-3.643-.235-.374A9.862 9.862 0 012.118 12C2.118 6.532 6.532 2.118 12 2.118S21.882 6.532 21.882 12 17.468 21.882 12 21.882z" />
                    </svg>
                    Order on WhatsApp
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-slate-100">
          <div className="container mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <span>© {new Date().getFullYear()} Culligan Pakistan (Johan Pvt. Ltd.). All rights reserved.</span>
            <div className="flex items-center gap-5">
              <Link href="/privacy-policy" className="hover:text-slate-700 transition-colors">Privacy Policy</Link>
              <span className="w-px h-3 bg-slate-200" />
              <Link href="/contact" className="hover:text-slate-700 transition-colors">Contact</Link>
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
