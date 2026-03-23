import { useState } from "react";
import { useListProducts, Product } from "@workspace/api-client-react";
import { useAdminMutations } from "@/hooks/use-admin";
import { useAuth } from "@/lib/auth";
import { ProductFormDialog } from "./product-form";
import { Plus, Edit2, Trash2, LogOut, Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function AdminDashboard() {
  const { data: products = [], isLoading } = useListProducts();
  const { deleteProduct } = useAdminMutations();
  const { logout } = useAuth();
  
  const [formOpen, setFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAdd = () => {
    setSelectedProduct(null);
    setFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      deleteProduct.mutate({ id });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-white/10 bg-card/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-display font-black text-white hover:text-primary transition-colors">
              JAS<span className="text-primary">.</span>
            </Link>
            <span className="text-muted-foreground font-mono text-sm border-l border-white/20 pl-4">ADMIN PORTAL</span>
          </div>
          <Button variant="outline" size="sm" onClick={logout} className="border-white/20 hover:bg-white/5 text-white">
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">Inventory</h1>
            <p className="text-muted-foreground">Manage your product catalog, prices, and stock.</p>
          </div>
          <Button onClick={handleAdd} className="bg-primary text-black font-bold hover:bg-primary/90">
            <Plus size={18} className="mr-2" /> Add New Product
          </Button>
        </div>

        <div className="bg-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p>Loading inventory...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Package size={48} className="text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-white mb-2">No products yet</h3>
              <p className="text-muted-foreground mb-6">Your inventory is currently empty.</p>
              <Button onClick={handleAdd} variant="outline" className="border-white/20 text-white">
                Add your first product
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-muted-foreground text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">Product</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Price</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-background overflow-hidden border border-white/10 shrink-0">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm line-clamp-1">{product.name}</p>
                            <p className="text-xs text-primary font-bold uppercase tracking-wide">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{product.category}</td>
                      <td className="p-4 font-mono font-bold text-white">${product.price.toFixed(2)}</td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2 items-start">
                          <Badge variant="outline" className={product.inStock ? "border-green-500/50 text-green-400 bg-green-500/10" : "border-red-500/50 text-red-400 bg-red-500/10"}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                          {product.featured && (
                            <Badge className="bg-primary/20 text-primary border-primary/50 text-[10px]">Featured</Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(product)} className="text-muted-foreground hover:text-white hover:bg-white/10">
                            <Edit2 size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/20">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <ProductFormDialog 
        open={formOpen} 
        onOpenChange={setFormOpen} 
        product={selectedProduct} 
      />
    </div>
  );
}
