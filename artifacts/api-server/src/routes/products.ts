import { Router, type IRouter } from "express";
import { db, productsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  CreateProductBody,
  UpdateProductBody,
  VerifyAdminBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] || "jas-admin-2024";

function checkAdminKey(req: any, res: any): boolean {
  const key = req.headers["x-admin-key"];
  if (key !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

router.get("/products", async (_req, res) => {
  try {
    const products = await db.select().from(productsTable).orderBy(productsTable.createdAt);
    const mapped = products.map((p) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: Number(p.price),
      description: p.description,
      imageUrl: p.imageUrl,
      category: p.category,
      inStock: p.inStock,
      featured: p.featured,
      createdAt: p.createdAt.toISOString(),
    }));
    res.json(mapped);
  } catch (err) {
    _req.log.error({ err }, "Failed to list products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/products", async (req: any, res: any) => {
  if (!checkAdminKey(req, res)) return;
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input" });
  }
  try {
    const [product] = await db
      .insert(productsTable)
      .values({
        name: parsed.data.name,
        brand: parsed.data.brand,
        price: String(parsed.data.price),
        description: parsed.data.description,
        imageUrl: parsed.data.imageUrl,
        category: parsed.data.category,
        inStock: parsed.data.inStock,
        featured: parsed.data.featured,
      })
      .returning();
    res.status(201).json({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: Number(product.price),
      description: product.description,
      imageUrl: product.imageUrl,
      category: product.category,
      inStock: product.inStock,
      featured: product.featured,
      createdAt: product.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/:id", async (req: any, res: any) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
  try {
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, id));
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: Number(product.price),
      description: product.description,
      imageUrl: product.imageUrl,
      category: product.category,
      inStock: product.inStock,
      featured: product.featured,
      createdAt: product.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/products/:id", async (req: any, res: any) => {
  if (!checkAdminKey(req, res)) return;
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
  const parsed = UpdateProductBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input" });
  }
  try {
    const [product] = await db
      .update(productsTable)
      .set({
        name: parsed.data.name,
        brand: parsed.data.brand,
        price: String(parsed.data.price),
        description: parsed.data.description,
        imageUrl: parsed.data.imageUrl,
        category: parsed.data.category,
        inStock: parsed.data.inStock,
        featured: parsed.data.featured,
      })
      .where(eq(productsTable.id, id))
      .returning();
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: Number(product.price),
      description: product.description,
      imageUrl: product.imageUrl,
      category: product.category,
      inStock: product.inStock,
      featured: product.featured,
      createdAt: product.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to update product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/products/:id", async (req: any, res: any) => {
  if (!checkAdminKey(req, res)) return;
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
  try {
    const [deleted] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/admin/verify", (req: any, res: any) => {
  const parsed = VerifyAdminBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input" });
  }
  if (parsed.data.password === ADMIN_PASSWORD) {
    res.json({ success: true, token: ADMIN_PASSWORD });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

export default router;
