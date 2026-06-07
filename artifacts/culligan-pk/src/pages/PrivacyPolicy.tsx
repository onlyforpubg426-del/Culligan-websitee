import { useEffect } from "react";
import { usePageMeta } from "@/lib/usePageMeta";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sections = [
  {
    title: "Personal Information",
    body: `In order to enhance your experience, we collect certain information from you. However, this does not necessitate the disclosure of your personal information unless explicitly requested. When you visit our sites, certain cookies and automated systems track your behavior on the site, aiding us in determining how we may better serve you.

For example, we store the domain names from which individuals arrive at our site. Our data scientists analyze this information to identify trends and develop marketing and sales strategies. Please be assured that we do not sell your information to third parties, as we respect the integrity of your data.`,
  },
  {
    title: "Age",
    body: `This site is intended for use by individuals over the age of 14. If you are below this age, we strongly advise against providing us with your personal information and recommend that you leave the site immediately.`,
  },
  {
    title: "Security",
    body: `At Culligan, we are committed to safeguarding the integrity of your personal information. We have implemented state-of-the-art cybersecurity technologies to protect all transactions, including credit card information and other credentials submitted to us online. If you suspect that your security has been compromised, please contact your bank or credit card company immediately.`,
  },
  {
    title: "Links",
    body: `As part of our promotional efforts, we may share backlinks to our affiliated businesses. These links are provided as a service to users, should they choose to utilize them. Culligan shall not be held responsible for the content shared on these external sites.`,
  },
];

export default function PrivacyPolicy() {
  usePageMeta({
    title: "Privacy Policy",
    description: "Culligan Pakistan's privacy policy — how we collect, use, and protect your personal information when you place orders or contact us.",
    path: "/privacy-policy",
  });
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <div
          className="relative py-16 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #e8f4fd 0%, #dceeff 100%)" }}
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#1d6fa4] font-semibold hover:underline mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#1d6fa4]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Privacy Policy</h1>
                <p className="text-slate-500 mt-1 text-sm">Last updated: 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 py-16 max-w-3xl">
          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-5 rounded-full bg-[#1d6fa4]" />
                  {section.title}
                </h2>
                <div className="text-slate-600 leading-relaxed space-y-3">
                  {section.body.split("\n\n").map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-400">
              Questions about this policy?{" "}
              <a href="mailto:info@culliganpk.com" className="text-[#1d6fa4] font-semibold hover:underline">
                info@culliganpk.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
