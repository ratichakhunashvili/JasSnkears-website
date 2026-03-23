import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@workspace/api-client-react";
import { useAdminMutations } from "@/hooks/use-admin";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  description: z.string().optional().default(""),
  imageUrl: z.string().url("Must be a valid URL"),
  category: z.string().min(1, "Category is required"),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
}

export function ProductFormDialog({ open, onOpenChange, product }: ProductFormProps) {
  const { createProduct, updateProduct } = useAdminMutations();

  const form = useForm<FormValues>({
    resolver: zodResolver(productFormSchema),
    values: product ? {
      name: product.name,
      brand: product.brand,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      category: product.category,
      inStock: product.inStock,
      featured: product.featured,
    } : {
      name: "",
      brand: "",
      price: 0,
      description: "",
      imageUrl: "",
      category: "Sneakers",
      inStock: true,
      featured: false,
    }
  });

  const onSubmit = (data: FormValues) => {
    if (product) {
      updateProduct.mutate({ id: product.id, data }, {
        onSuccess: () => onOpenChange(false)
      });
    } else {
      createProduct.mutate({ data }, {
        onSuccess: () => onOpenChange(false)
      });
    }
  };

  const isPending = createProduct.isPending || updateProduct.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-white/10 text-white p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-display font-bold">
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="text-muted-foreground">Product Name</FormLabel>
                      <FormControl><Input {...field} className="bg-background/50 border-white/10" placeholder="e.g. Air Jordan 1 High" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="brand" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Brand</FormLabel>
                      <FormControl><Input {...field} className="bg-background/50 border-white/10" placeholder="Nike, Adidas..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Category</FormLabel>
                      <FormControl><Input {...field} className="bg-background/50 border-white/10" placeholder="Sneakers, Apparel..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="price" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Price ($)</FormLabel>
                      <FormControl><Input type="number" step="0.01" {...field} className="bg-background/50 border-white/10" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="imageUrl" render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="text-muted-foreground">Image URL</FormLabel>
                      <FormControl><Input {...field} className="bg-background/50 border-white/10" placeholder="https://..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="text-muted-foreground">Description</FormLabel>
                      <FormControl><Textarea {...field} className="bg-background/50 border-white/10 resize-none h-24" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="inStock" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-white/10 p-4 bg-background/50">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-primary data-[state=checked]:text-black border-white/30" />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>In Stock</FormLabel>
                        <p className="text-xs text-muted-foreground">Show as available for purchase</p>
                      </div>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="featured" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-white/10 p-4 bg-background/50">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-primary data-[state=checked]:text-black border-white/30" />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                        <p className="text-xs text-muted-foreground">Display prominently on the home page</p>
                      </div>
                    </FormItem>
                  )} />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-white/20 text-white hover:bg-white/5">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending} className="bg-primary text-black hover:bg-primary/90 font-bold px-8">
                    {isPending ? "Saving..." : "Save Product"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
