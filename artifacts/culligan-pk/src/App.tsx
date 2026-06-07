import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Products } from "@/components/sections/Products";
import { Purification } from "@/components/sections/Purification";
import { Certifications } from "@/components/sections/Certifications";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { OrderAndEnquiry } from "@/components/sections/OrderAndEnquiry";
import { RetailOutlets } from "@/components/sections/RetailOutlets";
import { Subscription } from "@/components/sections/Subscription";
import CorporatePricingPage from "@/pages/CorporatePricingPage";
import Admin from "@/pages/Admin";
import Dispensers from "@/pages/Dispensers";
import FAQPage from "@/pages/FAQPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import History from "@/pages/History";
import AboutWater from "@/pages/AboutWater";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Purification />
        <Stats />
        <Certifications />
        <Services />
        <Testimonials />
        <RetailOutlets />
        <FAQ />
        <Subscription />
        <OrderAndEnquiry />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/dispensers" component={Dispensers} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/history" component={History} />
      <Route path="/about-water" component={AboutWater} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/corporate-pricing" component={CorporatePricingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <CartDrawer />
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
