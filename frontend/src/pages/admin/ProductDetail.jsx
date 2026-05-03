import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, ImagePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { productsApi, categoriesApi } from "@/services/api";
import { toast } from "sonner";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productData, categoriesData] = await Promise.all([
        productsApi.getOne(id),
        categoriesApi.getAll().catch(() => []),
      ]);
      setProduct(productData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to load product:", error);
      toast.error("Failed to load product");
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await productsApi.delete(id);
      toast.success("Product deleted");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">Product not found</p>
        <Button onClick={() => navigate("/admin/products")} className="mt-4">
          Back to Products
        </Button>
      </div>
    );
  }

  const categoryName = categories.find(c => c.id === product.category_id)?.name || product.category || 'N/A';

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/products")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-display text-3xl font-semibold">Product Details</h1>
            <p className="text-muted-foreground">View complete product information</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/admin/products/${id}/edit`)}>
            <Pencil className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl border p-8 space-y-8">
        {/* Product Image & Basic Info */}
        <div className="flex gap-8">
          <div className="w-96 h-96 rounded-xl overflow-hidden bg-muted flex-shrink-0 border">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImagePlus className="h-16 w-16 text-muted-foreground/40" />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <div className="flex gap-2 mt-2">
                {product.is_featured && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                    ⭐ Featured Product
                  </span>
                )}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.status === 'available' ? 'bg-green-100 text-green-800' :
                  product.status === 'out_of_stock' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {product.status === 'available' ? '✓ Available' :
                   product.status === 'out_of_stock' ? '✗ Out of Stock' :
                   '⏳ Coming Soon'}
                </span>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{product.description || 'No description available'}</p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Category</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  {categoryName}
                </span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Price</span>
                <div>
                  <p className="text-2xl font-bold text-primary">${product.price}</p>
                  {product.promo_price && (
                    <p className="text-sm text-muted-foreground line-through">${product.promo_price}</p>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Stock</span>
                <p className={`text-xl font-bold ${
                  product.stock < 10 ? 'text-destructive' : 
                  product.stock < 50 ? 'text-amber-600' : 
                  'text-green-600'
                }`}>
                  {product.stock} units
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Currency</span>
                <p className="text-xl font-semibold">{product.currency}</p>
              </div>
              {product.color && (
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">Color</span>
                  <p className="text-lg font-medium">{product.color}</p>
                </div>
              )}
              {product.origin && (
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">Origin</span>
                  <p className="text-lg font-medium">{product.origin}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Indoor/Outdoor</span>
                <p className="text-lg font-medium">{product.is_indoor ? '🏠 Indoor' : '🌳 Outdoor'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Plant Details */}
        {product.plant_details && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4 text-green-700">
              {product.category_id === 1 ? '🌱 Plant Details' : 
               product.category_id === 6 ? '🌵 Cactus Details' :
               product.category_id === 7 ? '🌴 Palm Details' :
               product.category_id === 8 ? '🌳 Tree Details' :
               '🌱 Plant Details'}
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {product.plant_details.sunlight && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <span className="text-sm text-green-700 font-medium block mb-1">Sunlight</span>
                  <p className="text-lg font-semibold capitalize">{product.plant_details.sunlight.replace('_', ' ')}</p>
                </div>
              )}
              {product.plant_details.watering && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <span className="text-sm text-green-700 font-medium block mb-1">Watering</span>
                  <p className="text-lg font-semibold capitalize">{product.plant_details.watering}</p>
                </div>
              )}
              {product.plant_details.growth_rate && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <span className="text-sm text-green-700 font-medium block mb-1">Growth Rate</span>
                  <p className="text-lg font-semibold capitalize">{product.plant_details.growth_rate}</p>
                </div>
              )}
              {product.plant_details.maintenance_level && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <span className="text-sm text-green-700 font-medium block mb-1">Maintenance</span>
                  <p className="text-lg font-semibold capitalize">{product.plant_details.maintenance_level}</p>
                </div>
              )}
              {product.plant_details.toxicity && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <span className="text-sm text-green-700 font-medium block mb-1">Toxicity</span>
                  <p className="text-lg font-semibold">{product.plant_details.toxicity}</p>
                </div>
              )}
              <div className="bg-green-50 p-4 rounded-lg">
                <span className="text-sm text-green-700 font-medium block mb-1">Pet Friendly</span>
                <p className="text-lg font-semibold">{product.plant_details.pet_friendly ? '✓ Yes' : '✗ No'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Soil Details */}
        {product.soil_details && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4 text-amber-700">🌍 Soil Details</h3>
            <div className="grid grid-cols-3 gap-6">
              {product.soil_details.ph && (
                <div className="bg-amber-50 p-4 rounded-lg">
                  <span className="text-sm text-amber-700 font-medium block mb-1">pH Level</span>
                  <p className="text-lg font-semibold">{product.soil_details.ph}</p>
                </div>
              )}
              {product.soil_details.texture && (
                <div className="bg-amber-50 p-4 rounded-lg">
                  <span className="text-sm text-amber-700 font-medium block mb-1">Texture</span>
                  <p className="text-lg font-semibold">{product.soil_details.texture}</p>
                </div>
              )}
              {product.soil_details.drainage && (
                <div className="bg-amber-50 p-4 rounded-lg">
                  <span className="text-sm text-amber-700 font-medium block mb-1">Drainage</span>
                  <p className="text-lg font-semibold">{product.soil_details.drainage}</p>
                </div>
              )}
              {product.soil_details.composition && (
                <div className="bg-amber-50 p-4 rounded-lg col-span-3">
                  <span className="text-sm text-amber-700 font-medium block mb-1">Composition</span>
                  <p className="text-lg font-semibold">{product.soil_details.composition}</p>
                </div>
              )}
              {product.soil_details.nutrients && (
                <div className="bg-amber-50 p-4 rounded-lg col-span-3">
                  <span className="text-sm text-amber-700 font-medium block mb-1">Nutrients</span>
                  <p className="text-lg font-semibold">{product.soil_details.nutrients}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Vase Details */}
        {product.vase_details && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4 text-purple-700">🏺 Vase Details</h3>
            <div className="grid grid-cols-3 gap-6">
              {product.vase_details.material && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <span className="text-sm text-purple-700 font-medium block mb-1">Material</span>
                  <p className="text-lg font-semibold">{product.vase_details.material}</p>
                </div>
              )}
              {product.vase_details.style && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <span className="text-sm text-purple-700 font-medium block mb-1">Style</span>
                  <p className="text-lg font-semibold capitalize">{product.vase_details.style}</p>
                </div>
              )}
              {product.vase_details.diameter && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <span className="text-sm text-purple-700 font-medium block mb-1">Diameter</span>
                  <p className="text-lg font-semibold">{product.vase_details.diameter} cm</p>
                </div>
              )}
              {product.vase_details.height && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <span className="text-sm text-purple-700 font-medium block mb-1">Height</span>
                  <p className="text-lg font-semibold">{product.vase_details.height} cm</p>
                </div>
              )}
              {product.vase_details.weight && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <span className="text-sm text-purple-700 font-medium block mb-1">Weight</span>
                  <p className="text-lg font-semibold">{product.vase_details.weight} kg</p>
                </div>
              )}
              <div className="bg-purple-50 p-4 rounded-lg">
                <span className="text-sm text-purple-700 font-medium block mb-1">Drainage Hole</span>
                <p className="text-lg font-semibold">{product.vase_details.drainage_hole ? '✓ Yes' : '✗ No'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Service Details */}
        {product.service_details && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4 text-blue-700">🛠️ Service Details</h3>
            <div className="grid grid-cols-3 gap-6">
              {product.service_details.service_type && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <span className="text-sm text-blue-700 font-medium block mb-1">Service Type</span>
                  <p className="text-lg font-semibold capitalize">{product.service_details.service_type.replace('_', ' ')}</p>
                </div>
              )}
              {product.service_details.location_type && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <span className="text-sm text-blue-700 font-medium block mb-1">Location</span>
                  <p className="text-lg font-semibold capitalize">{product.service_details.location_type}</p>
                </div>
              )}
              {product.service_details.duration && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <span className="text-sm text-blue-700 font-medium block mb-1">Duration</span>
                  <p className="text-lg font-semibold">{product.service_details.duration} minutes</p>
                </div>
              )}
              {product.service_details.includes && (
                <div className="bg-blue-50 p-4 rounded-lg col-span-3">
                  <span className="text-sm text-blue-700 font-medium block mb-1">What's Included</span>
                  <p className="text-lg font-semibold">{product.service_details.includes}</p>
                </div>
              )}
              {product.service_details.requirements && (
                <div className="bg-blue-50 p-4 rounded-lg col-span-3">
                  <span className="text-sm text-blue-700 font-medium block mb-1">Requirements</span>
                  <p className="text-lg font-semibold">{product.service_details.requirements}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Grass Details */}
        {product.grass_details && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4 text-emerald-700">🌾 Grass Details</h3>
            <div className="grid grid-cols-3 gap-6">
              {product.grass_details.grass_type && (
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <span className="text-sm text-emerald-700 font-medium block mb-1">Grass Type</span>
                  <p className="text-lg font-semibold capitalize">{product.grass_details.grass_type}</p>
                </div>
              )}
              {product.grass_details.blade_height && (
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <span className="text-sm text-emerald-700 font-medium block mb-1">Blade Height</span>
                  <p className="text-lg font-semibold">{product.grass_details.blade_height} cm</p>
                </div>
              )}
              {product.grass_details.density && (
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <span className="text-sm text-emerald-700 font-medium block mb-1">Density</span>
                  <p className="text-lg font-semibold">{product.grass_details.density}</p>
                </div>
              )}
              {product.grass_details.climate_suitability && (
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <span className="text-sm text-emerald-700 font-medium block mb-1">Climate</span>
                  <p className="text-lg font-semibold">{product.grass_details.climate_suitability}</p>
                </div>
              )}
              {product.grass_details.maintenance_frequency && (
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <span className="text-sm text-emerald-700 font-medium block mb-1">Maintenance</span>
                  <p className="text-lg font-semibold">{product.grass_details.maintenance_frequency}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4">Product Variants</h3>
            <div className="grid gap-4">
              {product.variants.map((variant, index) => (
                <div key={variant.id || index} className="p-6 border rounded-xl bg-gradient-to-r from-muted/30 to-muted/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold">Variant {index + 1}</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">Price</span>
                      <p className="text-lg font-bold text-primary">${variant.price}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">Stock</span>
                      <p className="text-lg font-bold">{variant.stock} units</p>
                    </div>
                    {variant.size && (
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">Size</span>
                        <p className="text-lg font-semibold">{variant.size}</p>
                      </div>
                    )}
                    {variant.diameter && (
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">Diameter</span>
                        <p className="text-lg font-semibold">{variant.diameter} cm</p>
                      </div>
                    )}
                    {variant.height && (
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">Height</span>
                        <p className="text-lg font-semibold">{variant.height} cm</p>
                      </div>
                    )}
                    {variant.weight && (
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">Weight</span>
                        <p className="text-lg font-semibold">{variant.weight} kg</p>
                      </div>
                    )}
                    {variant.duration && (
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">Duration</span>
                        <p className="text-lg font-semibold">{variant.duration} min</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
