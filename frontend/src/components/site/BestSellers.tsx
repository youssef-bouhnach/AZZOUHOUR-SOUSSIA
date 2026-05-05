import { useState, useEffect } from "react";
import { ArrowRight, Star, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { productsApi, type Product } from "@/services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const categoryLabels: Record<string, string> = {
  flowers: "Flowers",
  grass: "Grass",
  soil: "Soil",
  services: "Services",
};

export const BestSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();
  const navigate = useNavigate();

  // Favorites state — shared with Shop via localStorage
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleFavorite = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        toast("Removed from favorites");
      } else {
        next.add(productId);
        toast("Added to favorites ❤️");
      }
      localStorage.setItem("favorites", JSON.stringify([...next]));
      return next;
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        // Get first 4 products as best sellers
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-semibold text-sm mb-4">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            Best Sellers
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Customer Favorites
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Our most loved plants and garden essentials, handpicked by our community
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow-lg">
                <Star className="h-3 w-3 fill-white" />
                #{index + 1}
              </div>

              {/* Favorite button */}
              <button
                onClick={(e) => toggleFavorite(e, product.id)}
                className={`absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-all duration-200 hover:scale-110 ${
                  favorites.has(product.id)
                    ? "bg-red-500 text-white"
                    : "bg-white/90 text-gray-400 hover:text-red-500"
                }`}
                aria-label="Save to favorites"
              >
                <Heart className={`h-4 w-4 ${favorites.has(product.id) ? "fill-current" : ""}`} />
              </button>

              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <Eye className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600 text-sm">View Details</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 mb-2">
                  {categoryLabels[product.category] || product.category}
                </span>
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-green-600">
                    ${product.price}
                  </span>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      add({
                        id: product.id.toString(),
                        name: product.name,
                        price: product.price,
                        image: product.image || "/placeholder.svg",
                        category: categoryLabels[product.category],
                        blurb: product.description || "",
                      });
                    }}
                    className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all"
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? "Out of stock" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shop All Button */}
        <div className="text-center">
          <Link to="/shop">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-bold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105 group"
            >
              Shop All Products
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
