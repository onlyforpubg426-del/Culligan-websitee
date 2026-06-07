import { useEffect } from "react";
import { usePageMeta } from "@/lib/usePageMeta";
import { Link } from "wouter";
import { ArrowLeft, Globe } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function History() {
  usePageMeta({
    title: "Our History",
    description: "Over 80 years of pure hydration. Discover the story of Culligan — from its global founding to becoming Pakistan's #1 trusted water brand since 1997.",
    path: "/history",
  });
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(140deg, #dcf1ff 0%, #e2f4ff 40%, #ecf8ff 75%, #f4fbff 100%)" }}>
          <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-sky-500/8 blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 relative">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors text-sm mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our History</h1>
            <p className="text-slate-500 text-lg max-w-xl">The Clear Solution — Our Knowledge And Expertise At Your Service</p>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start gap-10 lg:gap-14">
              <div className="w-full md:w-1/2 shrink-0">
                <img
                  src="/culligan-world-map.jpg"
                  alt="Culligan global presence — 800+ dealers in 90 countries"
                  className="w-full rounded-2xl shadow-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-primary">1936</div>
                    <div className="text-sm text-slate-500 mt-1">Year Established</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-primary">90+</div>
                    <div className="text-sm text-slate-500 mt-1">Countries Worldwide</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-primary">800+</div>
                    <div className="text-sm text-slate-500 mt-1">Global Dealers</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-primary">80+</div>
                    <div className="text-sm text-slate-500 mt-1">Years of Innovation</div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 space-y-6 text-slate-600 leading-8">
                <p>
                  Established in <strong className="text-slate-900">1936</strong>, Culligan has become the most recognized name in the water business. Following in the innovative footsteps of its founder, Culligan has emerged as the world's leading water treatment company.
                </p>
                <p>
                  For over <strong className="text-slate-900">80 years</strong>, Culligan has led the way in water treatment technology, providing the most advanced products and solutions for the world's water problems.
                </p>
                <p>
                  As the world's water experts, we are dedicated to delivering high quality water solutions that will improve the lives of our customers. Simply stated, we believe that better water will make life better for you and your family.
                </p>
                <p>
                  In addition to standing at the forefront of water treatment technology, our network of Culligan dealers and service technicians is the largest in the world. With over <strong className="text-slate-900">800 Culligan dealers in 90 countries</strong>, we are without question the world's water experts.
                </p>

                <div className="border-l-4 border-primary pl-6 py-2 mt-8">
                  <p className="text-slate-900 font-semibold text-lg italic">
                    "Better water will make life better for you and your family."
                  </p>
                  <p className="text-sm text-slate-400 mt-2">— Culligan International</p>
                </div>

                <div className="pt-4">
                  <h2 className="text-slate-900 text-xl font-bold mb-3">Culligan Water of Pakistan</h2>
                  <p>
                    Johan Pvt. Ltd. has been the authorized representative of Culligan International in Pakistan since 2004, operating as <strong className="text-slate-900">Culligan Water of Pakistan</strong>. We bring Culligan's world-class water purification technology to homes and businesses across Karachi, upholding the same standards of quality and service that have made Culligan a trusted name globally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
