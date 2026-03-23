import { Link } from "wouter";
import { motion } from "framer-motion";
import { useListProducts } from "@workspace/api-client-react";
import { ProductCard } from "@/components/ui/product-card";
import { ArrowRight, Zap, ShieldCheck, Globe } from "lucide-react";

export default function Home() {
  const { data: products = [], isLoading } = useListProducts();

  // Get up to 4 featured products, or just newest if none featured
  const featuredProducts = products
    .filter(p => p.featured && p.inStock)
    .slice(0, 4);
    
  const displayProducts = featuredProducts.length > 0 
    ? featuredProducts 
    : products.slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-sneaker.png`} 
            alt="Premium Sneaker" 
            className="w-full h-full object-cover opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl">
              Elevate <br className="md:hidden" /> Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#FF9D00]">Game.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium"
          >
            Sourcing the most exclusive premium footwear globally. Delivered to Georgia.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-3 justify-center px-10 py-5 text-lg font-bold uppercase tracking-wider text-black bg-primary rounded-full hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,215,0,0.3)] hover:shadow-[0_0_60px_rgba(255,215,0,0.5)]"
            >
              Shop Collection <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Zap, title: "Exclusive Drops", desc: "Access to limited edition and hard-to-find releases." },
              { icon: ShieldCheck, title: "100% Authentic", desc: "Every pair is rigorously authenticated before delivery." },
              { icon: Globe, title: "Global Sourcing", desc: "We hunt down the grails from around the world to Georgia." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight mb-4">
                Hottest <span className="text-primary">Drops</span>
              </h2>
              <p className="text-xl text-muted-foreground">The most sought-after pairs right now.</p>
            </div>
            <Link 
              href="/shop" 
              className="group flex items-center gap-2 text-white font-bold uppercase tracking-widest hover:text-primary transition-colors pb-2 border-b-2 border-transparent hover:border-primary"
            >
              View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-[400px] rounded-2xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
             <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
               <p className="text-xl text-muted-foreground">No products available at the moment.</p>
             </div>
          )}
        </div>
      </section>
    </div>
  );
}
