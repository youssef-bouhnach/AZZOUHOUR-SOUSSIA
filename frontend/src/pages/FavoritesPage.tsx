import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, Loader2, Plus } from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { Button } from "@/components/ui/button";
import { productsApi, type Product } from "@/services/api";
import { toast } from "sonner";

const categoryLabels: Record<string, string> = {
  flowers: "Flowers",
  grass: "Grass",
  soil: "Soil",
  services: "Services",
};

const FavoritesContent = () => {
  const navigate = useNavigate();
  const { add } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const getFavoriteIds = (): number[] => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const [favoriteIds, setFavoriteIds] = useState<number[]>(getFavoriteIds);

  useEffect(() => {
    const fetchFavorites = async () => {
      const ids = getFavoriteIds();
      if (ids.length === 0) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const all = await productsApi.getAll();
        setProducts(all.filter((p) => ids.includes(p.id)));
      } catch {
        toast.error("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const removeFavorite = (productId: number) => {
    const next = favoriteIds.filter((id) => id !== productId);
    localStorage.setItem("favorites", JSON.stringify(next));
    setFavoriteIds(next);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    toast("Removed from favorites");
  };

  const clearAll = () => {
    localStorage.setItem("favorites", JSON.stringify([]));
    setFavoriteIds([]);
    setProducts([]);
    toast("Favorites cleared");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-1 flex items-center gap-3">
                <Heart className="h-9 w-9 fill-red-500 text-red-500" />
                My Favorites
              </h1>
              <p className="text-gray-500">
                {products.length} saved {products.length === 1 ? "product" : "products"}
              </p>
            </div>
            {products.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearAll} className="gap-2 text-red-500 border-red-200 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
                Clear all
              </Button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-red-500" />
            </div>
          ) : products.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-28 h-28 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-14 h-14 text-red-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h2>
              <p className="text-gray-500 mb-8">Save products you love by clicking the ❤️ on any card</p>
              <Button
                onClick={() => navigate("/shop")}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-5 rounded-full text-base font-semibold"
              >
                Browse Shop
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Remove button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFavorite(product.id); }}
                      className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 hover:scale-110 transition-all"
                      aria-label="Remove from favorites"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700">
                      {categoryLabels[product.category] || product.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {product.description || "No description available"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-green-600">${product.price}</span>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          add({
                            id: product.id.toString(),
                            name: product.name,
                            price: product.price,
                            image: product.image || "/placeholder.svg",
                            category: categoryLabels[product.category] || product.category,
                            blurb: product.description || "",
                          });
                          toast.success(`${product.name} added to cart`);
                        }}
                        disabled={product.stock === 0}
                        className="rounded-full gap-1.5 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        {product.stock === 0 ? "Out of stock" : "Add"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <CartDrawer />
      <Footer />
    </>
  );
};

export default function FavoritesPage() {
  return (
    <CartProvider>
      <FavoritesContent />
    </CartProvider>
  );
}
