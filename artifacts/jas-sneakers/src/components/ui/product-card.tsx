import { Product } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl bg-card border border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_10px_40px_-10px_rgba(255,215,0,0.15)] flex flex-col h-full"
    >
      <div className="aspect-[4/3] overflow-hidden bg-white/5 relative">
        {/* Placeholder handle if image is broken, but generally it works */}
        <img 
          src={product.imageUrl || "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {product.featured && (
          <Badge className="absolute top-4 right-4 bg-primary text-black font-bold uppercase tracking-wider border-none px-3 py-1 shadow-lg">
            Featured
          </Badge>
        )}
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-white font-bold tracking-widest uppercase border-2 border-white/20 px-4 py-2 rounded-full transform -rotate-12 bg-black/40">
              Sold Out
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs font-bold tracking-widest text-primary uppercase mb-2">
          {product.brand}
        </p>
        <h3 className="font-display text-xl font-bold leading-tight mb-4 text-white group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-2xl font-black text-white">
            ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          
          <button 
            disabled={!product.inStock}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white group-hover:bg-primary group-hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
