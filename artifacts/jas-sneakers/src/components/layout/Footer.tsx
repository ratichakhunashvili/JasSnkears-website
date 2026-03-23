import { Instagram, MapPin, Mail } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="font-display font-black text-3xl tracking-tighter text-white">
                JAS<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs mb-6 leading-relaxed">
              Sourcing the most exclusive premium sneakers globally and delivering them straight to Georgia.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/jassneakersgeo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white uppercase tracking-wider">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Shop All</Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">Our Story</Link>
              <a href="https://instagram.com/jassneakersgeo" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white uppercase tracking-wider">Contact</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="text-primary shrink-0" size={20} />
                <span>Tbilisi, Georgia<br/>Worldwide Shipping</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="text-primary shrink-0" size={20} />
                <span>DM us on Instagram for orders</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JAS Sneakers Geo. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
