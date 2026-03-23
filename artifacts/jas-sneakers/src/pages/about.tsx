import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="w-full min-h-screen">
      <section className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black text-white tracking-tight mb-8">
              Our <span className="text-primary">Story</span>
            </h1>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded with a singular vision, JAS Sneakers Geo bridges the gap between global sneaker culture and the streets of Georgia. 
                We are more than just a retailer; we are curators of hype, hunters of the exclusive, and purveyors of premium footwear.
              </p>
              <p>
                What started as a passion for the culture has evolved into the premier destination for authenticated, limited-edition sneakers. 
                Every pair in our vault goes through rigorous authentication to ensure that when you shop with us, you're getting 100% genuine product.
              </p>
              <p className="text-white font-semibold pl-4 border-l-4 border-primary">
                "Our mission is simple: if you want it, we'll find it. We bring the world's most sought-after sneakers right to your doorstep."
              </p>
            </div>
            
            <div className="mt-12 flex gap-6">
              <div className="flex flex-col">
                <span className="text-4xl font-display font-black text-primary">100%</span>
                <span className="text-sm uppercase tracking-widest text-muted-foreground mt-2">Authentic</span>
              </div>
              <div className="w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-4xl font-display font-black text-primary">24/7</span>
                <span className="text-sm uppercase tracking-widest text-muted-foreground mt-2">Support</span>
              </div>
              <div className="w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-4xl font-display font-black text-primary">Fast</span>
                <span className="text-sm uppercase tracking-widest text-muted-foreground mt-2">Shipping</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <img 
              src={`${import.meta.env.BASE_URL}images/about-store.png`} 
              alt="JAS Store Interior" 
              className="relative z-10 w-full rounded-3xl object-cover aspect-[4/5] border border-white/10 shadow-2xl"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
