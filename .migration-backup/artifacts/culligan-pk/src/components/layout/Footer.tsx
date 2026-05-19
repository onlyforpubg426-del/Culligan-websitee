import { Droplet, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg text-primary-foreground">
                <Droplet className="h-6 w-6" fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Culligan <span className="font-medium text-slate-400">Water</span>
              </span>
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
            <h3 className="text-white font-semibold mb-6">Certifications</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Govt. Approved</li>
              <li className="flex items-center gap-2 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> International Standards</li>
              <li className="flex items-center gap-2 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Lab Reports Verified</li>
              <li className="flex items-center gap-2 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Every Batch Tested</li>
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
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
