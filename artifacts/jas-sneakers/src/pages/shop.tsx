import { motion } from "framer-motion";
import { useListProducts } from "@workspace/api-client-react";
import { ProductCard } from "@/components/ui/product-card";
import { PackageX } from "lucide-react";

export default function Shop() {
  const { data: products = [], isLoading } = useListProducts();

  return (
    <div className="w-full min-h-screen pb-32">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/5">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-black text-white tracking-tight mb-6"
        >
          The <span className="text-primary">Vault</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-2xl"
        >
          Explore our entire collection of authenticated, premium footwear.
        </motion.p>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[450px] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {products.map((product) => (
              <motion.div 
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center border border-white/10 rounded-3xl bg-white/5"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground mb-6">
              <PackageX size={40} />
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-4">The Vault is Empty</h3>
            <p className="text-muted-foreground text-lg max-w-md">
              We're currently restocking. Check back soon or visit our Instagram for the latest drops.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
