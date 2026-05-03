import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, ImagePlus, ShoppingBag, Loader2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { productsApi, categoriesApi } from "@/services/api";
import { toast } from "sonner";

const emptyForm = () => ({
  name: "",
  description: "",
  price: 0,
  promo_price: null,
  currency: "USD",
  image: "",
  category: "flowers",
  category_id: null,
  stock: 0,
  status: "available",
  is_featured: false,
  is_indoor: false,
  color: "",
  origin: "",
  // Plant details (category_id = 1)
  sunlight: "",
  watering: "",
  growth_rate: "",
  maintenance_level: "",
  toxicity: "",
  pet_friendly: false,
  // Soil details (category_id = 2)
  ph: "",
  composition: "",
  texture: "",
  drainage: "",
  nutrients: "",
  // Grass details (category_id = 5)
  grass_type: "",
  blade_height: "",
  density: "",
  climate_suitability: "",
  maintenance_frequency: "",
  // Vase details (category_id = 3)
  material: "",
  style: "",
  diameter: "",
  height: "",
  weight: "",
  drainage_hole: false,
  // Service details (category_id = 4)
  service_type: "",
  location_type: "",
  duration: "",
  includes: "",
  requirements: "",
  // Variants
  variants: [],
});

export const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [deleteId, setDeleteId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productsApi.getAll(),
        categoriesApi.getAll().catch(() => []),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setImagePreview("");
    setDialogOpen(true);
  };

  const openView = (p) => {
    navigate(`/admin/products/${p.id}`);
  };

  const openEdit = async (p) => {
    try {
      setLoading(true);
      // Fetch full product details including relationships
      const fullProduct = await productsApi.getOne(p.id);
      
      setEditingId(fullProduct.id);
      setForm({
        name: fullProduct.name,
        description: fullProduct.description || "",
        price: fullProduct.price,
        promo_price: fullProduct.promo_price || null,
        currency: fullProduct.currency || "USD",
        image: fullProduct.image || "",
        category: fullProduct.category,
        category_id: fullProduct.category_id || null,
        stock: fullProduct.stock,
        status: fullProduct.status || "available",
        is_featured: fullProduct.is_featured || false,
        is_indoor: fullProduct.is_indoor || false,
        color: fullProduct.color || "",
        origin: fullProduct.origin || "",
        // Plant details
        sunlight: fullProduct.plant_details?.sunlight || "",
        watering: fullProduct.plant_details?.watering || "",
        growth_rate: fullProduct.plant_details?.growth_rate || "",
        maintenance_level: fullProduct.plant_details?.maintenance_level || "",
        toxicity: fullProduct.plant_details?.toxicity || "",
        pet_friendly: fullProduct.plant_details?.pet_friendly || false,
        // Soil details
        ph: fullProduct.soil_details?.ph || "",
        composition: fullProduct.soil_details?.composition || "",
        texture: fullProduct.soil_details?.texture || "",
        drainage: fullProduct.soil_details?.drainage || "",
        nutrients: fullProduct.soil_details?.nutrients || "",
        // Grass details
        grass_type: fullProduct.grass_details?.grass_type || "",
        blade_height: fullProduct.grass_details?.blade_height || "",
        density: fullProduct.grass_details?.density || "",
        climate_suitability: fullProduct.grass_details?.climate_suitability || "",
        maintenance_frequency: fullProduct.grass_details?.maintenance_frequency || "",
        // Vase details
        material: fullProduct.vase_details?.material || "",
        style: fullProduct.vase_details?.style || "",
        diameter: fullProduct.vase_details?.diameter || "",
        height: fullProduct.vase_details?.height || "",
        weight: fullProduct.vase_details?.weight || "",
        drainage_hole: fullProduct.vase_details?.drainage_hole || false,
        // Service details
        service_type: fullProduct.service_details?.service_type || "",
        location_type: fullProduct.service_details?.location_type || "",
        duration: fullProduct.service_details?.duration || "",
        includes: fullProduct.service_details?.includes || "",
        requirements: fullProduct.service_details?.requirements || "",
        // Variants
        variants: fullProduct.variants || [],
      });
      setImagePreview(fullProduct.image || "");
      setDialogOpen(true);
    } catch (error) {
      console.error("Failed to load product details:", error);
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyForm());
    setImagePreview("");
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!form.category_id) {
      toast.error("Category is required");
      return;
    }

    try {
      const data = {
        name: form.name,
        description: form.description,
        price: form.price,
        promo_price: form.promo_price,
        currency: form.currency,
        image: form.image,
        category: form.category,
        category_id: form.category_id,
        stock: form.stock,
        status: form.status,
        is_featured: form.is_featured,
        is_indoor: form.is_indoor,
        color: form.color,
        origin: form.origin,
        is_active: true,
      };

      // Add category-specific details based on category_id
      if ([1, 6, 7, 8].includes(form.category_id)) {
        // Plant details (Plants, Cactus, Palm, Tree)
        data.sunlight = form.sunlight || null;
        data.watering = form.watering || null;
        data.growth_rate = form.growth_rate || null;
        data.maintenance_level = form.maintenance_level || null;
        data.toxicity = form.toxicity || null;
        data.pet_friendly = form.pet_friendly;
      } else if (form.category_id === 2) {
        // Soil details
        data.ph = form.ph ? parseFloat(form.ph) : null;
        data.composition = form.composition || null;
        data.texture = form.texture || null;
        data.drainage = form.drainage || null;
        data.nutrients = form.nutrients || null;
      } else if (form.category_id === 3) {
        // Vase details
        data.material = form.material || null;
        data.style = form.style || null;
        data.diameter = form.diameter ? parseFloat(form.diameter) : null;
        data.height = form.height ? parseFloat(form.height) : null;
        data.weight = form.weight ? parseFloat(form.weight) : null;
        data.drainage_hole = form.drainage_hole;
      } else if (form.category_id === 4) {
        // Service details
        data.service_type = form.service_type || null;
        data.location_type = form.location_type || null;
        data.duration = form.duration ? parseInt(form.duration) : null;
        data.includes = form.includes || null;
        data.requirements = form.requirements || null;
      } else if (form.category_id === 5) {
        // Grass details
        data.grass_type = form.grass_type || null;
        data.blade_height = form.blade_height ? parseFloat(form.blade_height) : null;
        data.density = form.density || null;
        data.climate_suitability = form.climate_suitability || null;
        data.maintenance_frequency = form.maintenance_frequency || null;
      }

      // Add variants if any
      if (form.variants && form.variants.length > 0) {
        data.variants = form.variants;
      }

      if (editingId) {
        await productsApi.update(editingId, data);
        toast.success("Product updated");
      } else {
        await productsApi.create(data);
        toast.success("Product added");
      }
      fetchData();
      closeDialog();
    } catch (error) {
      console.error("Failed to save product:", error);
      toast.error(error.response?.data?.message || "Failed to save product");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await productsApi.delete(deleteId);
      toast.success("Product deleted");
      fetchData();
      setDeleteId(null);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // Variant management
  const addVariant = () => {
    setForm({
      ...form,
      variants: [
        ...form.variants,
        {
          price: 0,
          stock: 0,
          diameter: "",
          height: "",
          weight: "",
          size: "",
          duration: "",
        },
      ],
    });
  };

  const removeVariant = (index) => {
    const newVariants = form.variants.filter((_, i) => i !== index);
    setForm({ ...form, variants: newVariants });
  };

  const updateVariant = (index, field, value) => {
    const newVariants = [...form.variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setForm({ ...form, variants: newVariants });
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Products</h1>
          <p className="mt-1 text-muted-foreground">{products.length} products</p>
        </div>
        <Button onClick={openAdd} className="rounded-full gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border p-16 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="font-display text-xl">No products found</p>
        </div>
      ) : (
        <div className="rounded-2xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="text-left px-5 py-3.5 font-medium">Product</th>
                <th className="text-left px-5 py-3.5 font-medium">Category</th>
                <th className="text-left px-5 py-3.5 font-medium">Price</th>
                <th className="text-left px-5 py-3.5 font-medium">Stock</th>
                <th className="text-left px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl overflow-hidden bg-muted">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <ImagePlus className="h-5 w-5 text-muted-foreground/40" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{p.name}</span>
                        {p.is_featured && (
                          <span className="text-xs text-amber-600 font-medium">⭐ Featured</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {categories.find(c => c.id === p.category_id)?.name || p.category || 'N/A'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-primary">${p.price}</span>
                      {p.promo_price && (
                        <span className="text-xs text-muted-foreground line-through">${p.promo_price}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`font-medium ${p.stock < 10 ? 'text-destructive' : p.stock < 50 ? 'text-amber-600' : 'text-green-600'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      p.status === 'available' ? 'bg-green-100 text-green-800' :
                      p.status === 'out_of_stock' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {p.status === 'available' ? '✓ Available' :
                       p.status === 'out_of_stock' ? '✗ Out of Stock' :
                       '⏳ Coming Soon'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100">
                      <button onClick={() => openView(p)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => openEdit(p)} className="p-2 hover:bg-muted rounded-lg" title="Edit">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(p.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={(v) => !v && closeDialog()}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
              <div>
                <label className="text-sm font-medium">Name *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Price *</label>
                  <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="text-sm font-medium">Promo Price</label>
                  <Input type="number" step="0.01" value={form.promo_price || ""} onChange={(e) => setForm({ ...form, promo_price: parseFloat(e.target.value) || null })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Stock *</label>
                  <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="text-sm font-medium">Currency</label>
                  <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="w-full px-3 py-2 border rounded-md">
                    <option value="USD">USD</option>
                    <option value="MAD">MAD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category *</label>
                  <select value={form.category_id || ""} onChange={(e) => setForm({ ...form, category_id: parseInt(e.target.value) || null })} className="w-full px-3 py-2 border rounded-md">
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 border rounded-md">
                    <option value="available">Available</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="coming_soon">Coming Soon</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Color</label>
                  <Input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium">Origin</label>
                  <Input value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <Input value={form.image} onChange={(e) => { setForm({ ...form, image: e.target.value }); setImagePreview(e.target.value); }} />
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 w-32 object-cover rounded-lg" />}
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
                  <span className="text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.is_indoor} onChange={(e) => setForm({ ...form, is_indoor: e.target.checked })} />
                  <span className="text-sm">Indoor</span>
                </label>
              </div>
            </div>

            {/* Category-specific details */}
            {[1, 6, 7, 8].includes(form.category_id) && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 text-green-700">
                  {form.category_id === 1 ? '🌱 Plant Details' : 
                   form.category_id === 6 ? '🌵 Cactus Details' :
                   form.category_id === 7 ? '🌴 Palm Details' :
                   '🌳 Tree Details'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Sunlight</label>
                    <select value={form.sunlight} onChange={(e) => setForm({ ...form, sunlight: e.target.value })} className="w-full px-3 py-2 border rounded-md">
                      <option value="">Select</option>
                      <option value="full_sun">Full Sun</option>
                      <option value="partial_shade">Partial Shade</option>
                      <option value="shade">Shade</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Watering</label>
                    <select value={form.watering} onChange={(e) => setForm({ ...form, watering: e.target.value })} className="w-full px-3 py-2 border rounded-md">
                      <option value="">Select</option>
                      <option value="low">Low</option>
                      <option value="moderate">Moderate</option>
                      <option value="frequent">Frequent</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Growth Rate</label>
                    <select value={form.growth_rate} onChange={(e) => setForm({ ...form, growth_rate: e.target.value })} className="w-full px-3 py-2 border rounded-md">
                      <option value="">Select</option>
                      <option value="slow">Slow</option>
                      <option value="medium">Medium</option>
                      <option value="fast">Fast</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Maintenance Level</label>
                    <select value={form.maintenance_level} onChange={(e) => setForm({ ...form, maintenance_level: e.target.value })} className="w-full px-3 py-2 border rounded-md">
                      <option value="">Select</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Toxicity Info</label>
                  <Input value={form.toxicity} onChange={(e) => setForm({ ...form, toxicity: e.target.value })} placeholder="e.g., Non-toxic, Toxic to pets" />
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={form.pet_friendly} onChange={(e) => setForm({ ...form, pet_friendly: e.target.checked })} />
                    <span className="text-sm">Pet Friendly</span>
                  </label>
                </div>
              </div>
            )}

            {form.category_id === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 text-amber-700">🌍 Soil Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">pH Level</label>
                    <Input type="number" step="0.1" value={form.ph} onChange={(e) => setForm({ ...form, ph: e.target.value })} placeholder="e.g., 6.5" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Texture</label>
                    <Input value={form.texture} onChange={(e) => setForm({ ...form, texture: e.target.value })} placeholder="e.g., Sandy, Clay" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Composition</label>
                  <Textarea value={form.composition} onChange={(e) => setForm({ ...form, composition: e.target.value })} rows={2} placeholder="e.g., Peat moss, perlite, compost" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Drainage</label>
                    <Input value={form.drainage} onChange={(e) => setForm({ ...form, drainage: e.target.value })} placeholder="e.g., Well-draining" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Nutrients</label>
                    <Input value={form.nutrients} onChange={(e) => setForm({ ...form, nutrients: e.target.value })} placeholder="e.g., High nitrogen" />
                  </div>
                </div>
              </div>
            )}

            {form.category_id === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 text-purple-700">🏺 Vase Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Material</label>
                    <Input value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} placeholder="e.g., Ceramic, Plastic" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Style</label>
                    <select value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value })} className="w-full px-3 py-2 border rounded-md">
                      <option value="">Select</option>
                      <option value="modern">Modern</option>
                      <option value="classic">Classic</option>
                      <option value="minimalist">Minimalist</option>
                      <option value="decorative">Decorative</option>
                      <option value="vintage">Vintage</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Diameter (cm)</label>
                    <Input type="number" step="0.1" value={form.diameter} onChange={(e) => setForm({ ...form, diameter: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Height (cm)</label>
                    <Input type="number" step="0.1" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Weight (kg)</label>
                    <Input type="number" step="0.1" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={form.drainage_hole} onChange={(e) => setForm({ ...form, drainage_hole: e.target.checked })} />
                    <span className="text-sm">Has Drainage Hole</span>
                  </label>
                </div>
              </div>
            )}

            {form.category_id === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 text-blue-700">🛠️ Service Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Service Type</label>
                    <select value={form.service_type} onChange={(e) => setForm({ ...form, service_type: e.target.value })} className="w-full px-3 py-2 border rounded-md">
                      <option value="">Select</option>
                      <option value="planting">Planting</option>
                      <option value="watering">Watering</option>
                      <option value="garden_cleaning">Garden Cleaning</option>
                      <option value="outdoor_decoration">Outdoor Decoration</option>
                      <option value="garden_treatment">Garden Treatment</option>
                      <option value="other_services">Other Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location Type</label>
                    <select value={form.location_type} onChange={(e) => setForm({ ...form, location_type: e.target.value })} className="w-full px-3 py-2 border rounded-md">
                      <option value="">Select</option>
                      <option value="indoor">Indoor</option>
                      <option value="outdoor">Outdoor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Duration (minutes)</label>
                  <Input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g., 60" />
                </div>
                <div>
                  <label className="text-sm font-medium">What's Included</label>
                  <Textarea value={form.includes} onChange={(e) => setForm({ ...form, includes: e.target.value })} rows={2} placeholder="List what's included in the service" />
                </div>
                <div>
                  <label className="text-sm font-medium">Requirements</label>
                  <Textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows={2} placeholder="Any requirements or prerequisites" />
                </div>
              </div>
            )}

            {form.category_id === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 text-emerald-700">🌾 Grass Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Grass Type</label>
                    <select value={form.grass_type} onChange={(e) => setForm({ ...form, grass_type: e.target.value })} className="w-full px-3 py-2 border rounded-md">
                      <option value="">Select</option>
                      <option value="natural">Natural</option>
                      <option value="artificial">Artificial</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Blade Height (cm)</label>
                    <Input type="number" step="0.1" value={form.blade_height} onChange={(e) => setForm({ ...form, blade_height: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Density</label>
                    <Input value={form.density} onChange={(e) => setForm({ ...form, density: e.target.value })} placeholder="e.g., High, Medium, Low" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Maintenance Frequency</label>
                    <Input value={form.maintenance_frequency} onChange={(e) => setForm({ ...form, maintenance_frequency: e.target.value })} placeholder="e.g., Weekly, Monthly" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Climate Suitability</label>
                  <Input value={form.climate_suitability} onChange={(e) => setForm({ ...form, climate_suitability: e.target.value })} placeholder="e.g., Hot, Temperate, Cold" />
                </div>
              </div>
            )}

            {/* Variants Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-lg font-semibold">Product Variants</h3>
                <Button type="button" onClick={addVariant} size="sm" variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" /> Add Variant
                </Button>
              </div>
              {form.variants.length === 0 ? (
                <p className="text-sm text-muted-foreground">No variants added. Click "Add Variant" to create size/type variations.</p>
              ) : (
                <div className="space-y-4">
                  {form.variants.map((variant, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3 bg-muted/30">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Variant {index + 1}</h4>
                        <Button type="button" onClick={() => removeVariant(index)} size="sm" variant="ghost" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium">Price *</label>
                          <Input type="number" step="0.01" value={variant.price || ""} onChange={(e) => updateVariant(index, "price", parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Stock *</label>
                          <Input type="number" value={variant.stock || ""} onChange={(e) => updateVariant(index, "stock", parseInt(e.target.value) || 0)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-sm font-medium">Size</label>
                          <Input value={variant.size || ""} onChange={(e) => updateVariant(index, "size", e.target.value)} placeholder="e.g., 10cm" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Diameter (cm)</label>
                          <Input type="number" step="0.1" value={variant.diameter || ""} onChange={(e) => updateVariant(index, "diameter", parseFloat(e.target.value) || null)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Height (cm)</label>
                          <Input type="number" step="0.1" value={variant.height || ""} onChange={(e) => updateVariant(index, "height", parseFloat(e.target.value) || null)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-sm font-medium">Weight (kg)</label>
                          <Input type="number" step="0.1" value={variant.weight || ""} onChange={(e) => updateVariant(index, "weight", parseFloat(e.target.value) || null)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Duration (min)</label>
                          <Input type="number" value={variant.duration || ""} onChange={(e) => updateVariant(index, "duration", parseInt(e.target.value) || null)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button onClick={handleSubmit}>{editingId ? "Save Changes" : "Add Product"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};
