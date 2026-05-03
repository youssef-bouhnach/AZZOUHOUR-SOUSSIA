import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Loader2, ShoppingCart, ArrowLeft, Plus, Minus, Heart, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartProvider, useCart } from "@/context/CartContext";
import { productsApi, type Product } from "@/services/api";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";

const categoryColors: Record<string, string> = {
  flowers: "bg-pink-100 text-pink-800 border-pink-200",
  grass: "bg-lime-100 text-lime-800 border-lime-200",
  soil: "bg-amber-100 text-amber-800 border-amber-200",
  services: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const categoryLabels: Record<string, string> = {
  flowers: "Flowers",
  grass: "Grass",
  soil: "Soil",
  services: "Services",
};

function ProductDetailContent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { add } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await productsApi.getOne(parseInt(id));
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Failed to load product");
        navigate("/shop");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      add({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image || "/placeholder.svg",
        category: categoryLabels[product.category],
        blurb: product.description || "",
      });
    }
    
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description || "",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white">
        {/* Back Button */}
        <div className="container py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/shop")}
            className="gap-2 hover:gap-3 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Button>
        </div>

        {/* Product Detail */}
        <div className="container pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted shadow-2xl border-4 border-white">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md border-2 ${
                      categoryColors[product.category] || "bg-white/90 text-gray-800 border-gray-200"
                    }`}
                  >
                    {categoryLabels[product.category]}
                  </span>
                </div>
                
                {/* Stock Badge */}
                {product.stock === 0 && (
                  <div className="absolute top-6 right-6">
                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-800 border-2 border-red-200 backdrop-blur-md">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex-1 gap-2 rounded-2xl border-2 transition-all ${
                    isFavorite
                      ? "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
                      : "hover:border-gray-400"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Saved" : "Save"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                  className="flex-1 gap-2 rounded-2xl border-2 hover:border-gray-400"
                >
                  <Share2 className="h-5 w-5" />
                  Share
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Title & Rating */}
              <div>
                <h1 className="font-display text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.0 rating)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-6xl font-bold text-green-600">
                  ${product.price}
                </span>
                <span className="text-lg text-gray-500">per unit</span>
              </div>

              {/* Description */}
              <div className="prose prose-lg">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">
                  About this product
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description || "No description available for this product."}
                </p>
              </div>

              {/* Stock Info */}
              <div className="p-6 bg-green-50 border-2 border-green-200 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-green-900 mb-1">Availability</p>
                    <p className="text-2xl font-bold text-green-600">
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </p>
                  </div>
                  {product.stock > 0 && product.stock < 10 && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-semibold rounded-full">
                      Low Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-900">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-300 rounded-2xl overflow-hidden">
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="rounded-none px-6 hover:bg-gray-100"
                      >
                        <Minus className="h-5 w-5" />
                      </Button>
                      <span className="px-8 py-3 text-2xl font-bold text-gray-900 min-w-[80px] text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        disabled={quantity >= product.stock}
                        className="rounded-none px-6 hover:bg-gray-100"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                    <span className="text-sm text-gray-600">
                      Max: {product.stock} available
                    </span>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full py-8 text-xl font-bold rounded-2xl gap-3 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <ShoppingCart className="h-6 w-6" />
                {product.stock === 0 ? "Out of Stock" : `Add ${quantity} to Cart`}
              </Button>

              {/* Product Details */}
              <div className="pt-6 border-t-2 border-gray-200 space-y-3">
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">
                  Product Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <span className="ml-2 font-semibold text-gray-900">
                      {categoryLabels[product.category]}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">SKU:</span>
                    <span className="ml-2 font-semibold text-gray-900">
                      #{product.id.toString().padStart(5, "0")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="ml-2 font-semibold text-gray-900">
                      {product.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Added:</span>
                    <span className="ml-2 font-semibold text-gray-900">
                      {new Date(product.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CartDrawer />
      <Footer />
    </>
  );
}

export default function ProductDetailPage() {
  return (
    <CartProvider>
      <ProductDetailContent />
    </CartProvider>
  );
}
