import { useState } from "react";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, X, FileText } from "lucide-react";
import { Link } from "wouter";

const awardImages = [
  { src: "/award-1.jpg", alt: "Culligan International — Award for Fighting Against All Odds (Johan Pvt. Ltd., 2004)" },
  { src: "/award-2.jpg", alt: "Regional Brands of the Year Award 2006–07 — Best Brand Performance in Drinking Water (Johan Pvt. Ltd.)" },
];

function AwardsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl max-h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-50 border border-yellow-100 flex items-center justify-center">
              <FileText className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Awards</h2>
              <p className="text-xs text-slate-400">Culligan International · Regional Brands of the Year 2006–07</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {awardImages.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className="w-full rounded-xl border border-slate-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const licenseImages = [
  { src: "/license-1.jpg", alt: "Culligan International — Authorized Distributor Letter (Johan Pvt. Ltd., 2004)" },
  { src: "/license-2.jpg", alt: "PSQCA — Licence for the use of the Pakistan Standard Mark (No. CM/L-1363/2002, 2026–2027)" },
];

function LicenseModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl max-h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
              <FileText className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">License</h2>
              <p className="text-xs text-slate-400">Culligan International · PSQCA Pakistan Standard Mark</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {licenseImages.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className="w-full rounded-xl border border-slate-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const intlCerts = [
  { src: "/intl-cert-1.jpg", alt: "Culligan International — Authorized Representative Certificate (Johan Pvt. Ltd., 2004)" },
  { src: "/intl-cert-2.jpg", alt: "International Halal Certification — Halal Certificate (Culligan Water, 2026–2027)" },
  { src: "/intl-cert-3.jpg", alt: "Bureau Veritas — ISO 22000:2018 Certification (Johan Pvt. Ltd., 2024–2027)" },
];

function IntlCertsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl max-h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center">
              <FileText className="w-4 h-4 text-sky-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">International Standards</h2>
              <p className="text-xs text-slate-400">Culligan International · Halal · ISO 22000:2018</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {intlCerts.map((c) => (
            <img
              key={c.src}
              src={c.src}
              alt={c.alt}
              className="w-full rounded-xl border border-slate-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const labReports = [
  { src: "/lab-report-1.jpg", alt: "Bahria University ERC — Analytical Test Report (19L, Apr 2025) Page 1" },
  { src: "/lab-report-2.jpg", alt: "Bahria University ERC — Analytical Test Report (19L, Apr 2025) Page 2" },
  { src: "/lab-report-3.jpg", alt: "Bahria University ERC — Microbiological Report (19L, Sep 2025)" },
  { src: "/lab-report-4.jpg", alt: "Bahria University ERC — Microbiological Report (12L, Sep 2025)" },
  { src: "/lab-report-5.jpg", alt: "Aga Khan University Hospital — Water Quality Report (Jul 2025)" },
  { src: "/lab-report-6.jpg", alt: "Aga Khan University Hospital — Water Quality Report (Aug 2025)" },
];

function LabReportsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl max-h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <FileText className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Lab Reports</h2>
              <p className="text-xs text-slate-400">Bahria University ERC &amp; Aga Khan University Hospital</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {labReports.map((r) => (
            <img
              key={r.src}
              src={r.src}
              alt={r.alt}
              className="w-full rounded-xl border border-slate-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExemptionCertModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl max-h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Exemption Certificate</h2>
              <p className="text-xs text-slate-400">Federal Board of Revenue — Johan (Pvt) Ltd</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          <img
            src="/exemption-cert-p1.png"
            alt="Exemption Certificate Page 1"
            className="w-full rounded-xl border border-slate-200"
          />
          <img
            src="/exemption-cert-p2.png"
            alt="Exemption Certificate Page 2"
            className="w-full rounded-xl border border-slate-200"
          />
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const [certOpen, setCertOpen] = useState(false);
  const [labOpen, setLabOpen] = useState(false);
  const [intlOpen, setIntlOpen] = useState(false);
  const [licenseOpen, setLicenseOpen] = useState(false);
  const [awardsOpen, setAwardsOpen] = useState(false);

  return (
    <>
      <footer className="bg-slate-900 text-slate-300">
        <div className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            <div className="space-y-6">
              <div>
                <img src="/culligan-logo.png" alt="Culligan Water" className="h-9 w-auto max-w-[160px] object-contain object-left brightness-0 invert" />
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                Premium water purification and home delivery brand operating since 1997 in Karachi. Pure water delivered to your door.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><a href="#products" className="hover:text-primary transition-colors">Choose Your Water</a></li>
                <li><a href="#purification" className="hover:text-primary transition-colors">Science Behind Purity</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Our Services</a></li>
                <li><a href="#calculator" className="hover:text-primary transition-colors">Savings Calculator</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Learn More</h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link href="/about-water" className="hover:text-primary transition-colors">
                    About Bottled Water
                  </Link>
                </li>
                <li>
                  <Link href="/dispensers" className="hover:text-primary transition-colors">
                    Water Dispensers
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-primary transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/history" className="hover:text-primary transition-colors">
                    Our History
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Certifications</h3>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => setLicenseOpen(true)}
                    className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    License
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIntlOpen(true)}
                    className="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    International Standards
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setLabOpen(true)}
                    className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    Lab Reports Verified
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setAwardsOpen(true)}
                    className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    Awards
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCertOpen(true)}
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    Exemption Certificate
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Contact Support</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-400 mb-1">UAN Dedicated Support</div>
                    <div className="text-white font-medium text-lg">111 35 35 35</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <span>support@culligan.com.pk</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <span className="text-sm">Head Office, Karachi, Pakistan<br />Free delivery on all orders in Karachi.</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
            <p>&copy; {new Date().getFullYear()} Culligan Pakistan. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        </div>
      </footer>

      {certOpen && <ExemptionCertModal onClose={() => setCertOpen(false)} />}
      {labOpen && <LabReportsModal onClose={() => setLabOpen(false)} />}
      {intlOpen && <IntlCertsModal onClose={() => setIntlOpen(false)} />}
      {licenseOpen && <LicenseModal onClose={() => setLicenseOpen(false)} />}
      {awardsOpen && <AwardsModal onClose={() => setAwardsOpen(false)} />}
    </>
  );
}
