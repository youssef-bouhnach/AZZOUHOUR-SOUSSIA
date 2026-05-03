import { useState, useEffect } from "react";
import {
  Plus, Pencil, Trash2, Search, X, ImagePlus,
  ShoppingBag, ChevronDown, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { productsApi, type Product } from "@/services/api";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Category = "flowers" | "grass" | "soil" | "services";
const CATEGORIES: Category[] = ["flowers", "grass", "soil", "services"];

const categoryColors: Record<Category, string> = {
  flowers: "bg-pink-100 text-pink-800 border-pink-200",
  grass:   "bg-lime-100 text-lime-800 border-lime-200",
  soil:    "bg-amber-100 text-amber-800 border-amber-200",
  services: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const categoryLabels: Record<Category, string> = {
  flowers: "Flowers",
  grass: "Grass",
  soil: "Soil",
  services: "Services",
};

type FormData = {
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  stock: number;
};

const emptyForm = (): FormData => ({
  name: "", 
  category: "flowers", 
  price: 0, 
  image: "", 
  description: "",
  stock: 0,
});

interface FormErrors {
  name?: string;
  price?: string;
  image?: string;
  description?: string;
  stock?: string;
}

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<"All" | Category>("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm());
  const [errors, setErrors] = useState<FormErrors>({});
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Charger les produits
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
    const matchCat = filterCat === "All" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  // ── Dialog helpers ─────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setErrors({});
    setImagePreview("");
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({ 
      name: p.name, 
      category: p.category as Category, 
      price: p.price, 
      image: p.image || "", 
      description: p.description || "",
      stock: p.stock,
    });
    setErrors({});
    setImagePreview(p.image || "");
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyForm());
    setErrors({});
    setImagePreview("");
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.price || form.price <= 0) e.price = "Price must be greater than 0";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.stock < 0) e.stock = "Stock cannot be negative";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Image handling ─────────────────────────────────────────────────────────
  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setImagePreview(url);
      setForm((prev) => ({ ...prev, image: url }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrl = (url: string) => {
    setForm((prev) => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validate()) return;
    
    try {
      if (editingId) {
        await productsApi.update(editingId, {
          name: form.name,
          description: form.description,
          price: form.price,
          image: form.image,
          category: form.category,
          stock: form.stock,
          is_active: true,
        });
        toast.success("Product updated");
      } else {
        await productsApi.create({
          name: form.name,
          description: form.description,
          price: form.price,
          image: form.image,
          category: form.category,
          stock: form.stock,
          is_active: true,
        });
        toast.success("Product added");
      }
      fetchProducts();
      closeDialog();
    } catch (error: any) {
      console.error("Failed to save product:", error);
      toast.error(error.response?.data?.message || "Failed to save product");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await productsApi.delete(deleteId);
      toast.success("Product deleted");
      fetchProducts();
      setDeleteId(null);
    } catch (error: any) {
      console.error("Failed to delete product:", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Products</h1>
          <p className="mt-1 text-muted-foreground">{products.length} product{products.length !== 1 ? "s" : ""} in your catalog</p>
        </div>
        <Button onClick={openAdd} className="rounded-full gap-2 shadow-soft">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-xl"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                filterCat === c
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              )}
            >
              {c === "All" ? "All" : categoryLabels[c as Category]}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-background p-16 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="font-display text-xl text-foreground">No products found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {search || filterCat !== "All" ? "Try adjusting your filters" : "Add your first product to get started"}
          </p>
          {!search && filterCat === "All" && (
            <Button onClick={openAdd} className="mt-4 rounded-full gap-2" variant="outline">
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-background shadow-card overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-5 py-3.5 font-medium text-muted-foreground">Product</th>
                  <th className="text-left px-5 py-3.5 font-medium text-muted-foreground">Category</th>
                  <th className="text-left px-5 py-3.5 font-medium text-muted-foreground">Price</th>
                  <th className="text-left px-5 py-3.5 font-medium text-muted-foreground">Description</th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-muted shrink-0">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <ImagePlus className="h-5 w-5 text-muted-foreground/40" />
                            </div>
                          )}
                        </div>
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn("rounded-full border px-2.5 py-1 text-xs font-medium", categoryColors[p.category as Category])}>
                        {categoryLabels[p.category as Category]}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-display font-semibold text-primary">${p.price}</span>
                    </td>
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-muted-foreground truncate">{p.description || "No description"}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(p)}
                          className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                          aria-label="Edit product"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          aria-label="Delete product"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-border">
            {filtered.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-4">
                <div className="h-14 w-14 rounded-xl overflow-hidden bg-muted shrink-0">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <ImagePlus className="h-5 w-5 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{p.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn("rounded-full border px-2 py-0.5 text-xs font-medium", categoryColors[p.category as Category])}>
                      {categoryLabels[p.category as Category]}
                    </span>
                    <span className="font-display font-semibold text-primary text-sm">${p.price}</span>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(p)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(p.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Add / Edit Dialog ── */}
      <Dialog open={dialogOpen} onOpenChange={(v) => !v && closeDialog()}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {editingId ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Image upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Image</label>
              <div className="flex gap-3">
                {/* Preview */}
                <div className="h-24 w-24 rounded-xl border-2 border-dashed border-border bg-muted shrink-0 overflow-hidden flex items-center justify-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <ImagePlus className="h-7 w-7 text-muted-foreground/40" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground hover:bg-muted cursor-pointer transition-colors">
                    <ImagePlus className="h-4 w-4" />
                    Upload image
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageFile(file);
                      }}
                    />
                  </label>
                  <Input
                    placeholder="…or paste an image URL"
                    value={form.image.startsWith("data:") ? "" : form.image}
                    onChange={(e) => handleImageUrl(e.target.value)}
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="e.g. Japanese Maple"
                value={form.name}
                onChange={(e) => {
                  setForm((p) => ({ ...p, name: e.target.value }));
                  if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                }}
                className={cn("rounded-xl", errors.name && "border-destructive")}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            {/* Category + Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Category</label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Category }))}
                    className="w-full appearance-none rounded-xl border border-input bg-background px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Price ($) <span className="text-destructive">*</span>
                </label>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                  value={form.price || ""}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, price: parseFloat(e.target.value) || 0 }));
                    if (errors.price) setErrors((p) => ({ ...p, price: undefined }));
                  }}
                  className={cn("rounded-xl", errors.price && "border-destructive")}
                />
                {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
              </div>
            </div>

            {/* Description + Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <label className="text-sm font-medium">
                  Description <span className="text-destructive">*</span>
                </label>
                <Textarea
                  placeholder="Product description..."
                  value={form.description}
                  rows={3}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, description: e.target.value }));
                    if (errors.description) setErrors((p) => ({ ...p, description: undefined }));
                  }}
                  className={cn("rounded-xl resize-none", errors.description && "border-destructive")}
                />
                {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Stock <span className="text-destructive">*</span>
                </label>
                <Input
                  type="number"
                  min={0}
                  placeholder="0"
                  value={form.stock || ""}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, stock: parseInt(e.target.value) || 0 }));
                    if (errors.stock) setErrors((p) => ({ ...p, stock: undefined }));
                  }}
                  className={cn("rounded-xl", errors.stock && "border-destructive")}
                />
                {errors.stock && <p className="text-xs text-destructive">{errors.stock}</p>}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeDialog} className="rounded-full">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="rounded-full gap-2">
              <Plus className="h-4 w-4" />
              {editingId ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm ── */}
      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the product from your catalog. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
