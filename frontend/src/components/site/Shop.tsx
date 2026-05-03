import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ShoppingBag, Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { productsApi, type Product } from "@/services/api";
import { toast } from "sonner";

type Category = "flowers" | "grass" | "soil" | "services";
const tabs: ("All" | Category)[] = ["All", "flowers", "grass", "soil", "services"];

const categoryColors: Record<string, string> = {
  flowers: "bg-pink-100 text-pink-800",
  grass:   "bg-lime-100 text-lime-800",
  soil:    "bg-amber-100 text-amber-800",
  services: "bg-emerald-100 text-emerald-800",
};

const categoryLabels: Record<Category, string> = {
  flowers: "Flowers",
  grass: "Grass",
  soil: "Soil",
  services: "Services",
};

export const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();
  const navigate = useNavigate();
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  // Fetch products from API
  useEffect(() => {
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
    fetchProducts();
  }, []);

  // Group products by category
  const productsByCategory = {
    flowers: products.filter((p) => p.category === "flowers"),
    grass: products.filter((p) => p.category === "grass"),
    soil: products.filter((p) => p.category === "soil"),
    services: products.filter((p) => p.category === "services"),
  };

  // Apply filters
  let filteredProducts = [...products];

  // Category filter
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
  }

  // Price filter
  if (priceRange !== "all") {
    filteredProducts = filteredProducts.filter((p) => {
      const price = parseFloat(p.price.toString());
      switch (priceRange) {
        case "under20":
          return price < 20;
        case "20-50":
          return price >= 20 && price <= 50;
        case "50-100":
          return price >= 50 && price <= 100;
        case "over100":
          return price > 100;
        default:
          return true;
      }
    });
  }

  // Sorting
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => parseFloat(a.price.toString()) - parseFloat(b.price.toString()));
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => parseFloat(b.price.toString()) - parseFloat(a.price.toString()));
  } else if (sortBy === "newest") {
    filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  // Group filtered products by category
  const filteredByCategory = {
    flowers: filteredProducts.filter((p) => p.category === "flowers"),
    grass: filteredProducts.filter((p) => p.category === "grass"),
    soil: filteredProducts.filter((p) => p.category === "soil"),
    services: filteredProducts.filter((p) => p.category === "services"),
  };

  // Determine which categories to show
  const categoriesToShow = selectedCategory === "all" ? filteredByCategory : productsByCategory;

  // Render product card
  const renderProduct = (p: Product, i: number) => (
    <article
      key={p.id}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-card border border-border/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft hover:border-border cursor-pointer"
      style={{ animationDelay: `${i * 60}ms` }}
      onClick={() => navigate(`/product/${p.id}`)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={p.image || "/placeholder.svg"}
          alt={p.name}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
        />
        {/* Category badge */}
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm",
            categoryColors[p.category] ?? "bg-background/85 text-primary"
          )}
        >
          {categoryLabels[p.category as Category]}
        </span>
        {/* View Details Overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary">View Details</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug">{p.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {p.description || "No description available"}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-display text-2xl font-semibold text-primary">${p.price}</span>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              add({
                id: p.id.toString(),
                name: p.name,
                price: p.price,
                image: p.image || "/placeholder.svg",
                category: categoryLabels[p.category as Category],
                blurb: p.description || "",
              });
            }}
            className="rounded-full gap-1.5 transition-all hover:gap-2"
            aria-label={`Add ${p.name} to cart`}
            disabled={p.stock === 0}
          >
            <Plus className="h-3.5 w-3.5" />
            {p.stock === 0 ? "Out of stock" : "Add"}
          </Button>
        </div>
      </div>
    </article>
  );
  const gridRef = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section className="bg-white">
      {/* Hero Image */}
      <div className="relative h-[300px] bg-cover bg-center" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=1920&h=400&fit=crop')"
      }}>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Shop Header */}
      <div className="container py-8">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-8">Shop</h1>
        
        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-12">
          <div className="flex flex-wrap gap-3">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 transition-colors cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="flowers">Flowers</option>
              <option value="grass">Grass</option>
              <option value="soil">Soil</option>
              <option value="services">Services</option>
            </select>
            <select 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 transition-colors cursor-pointer"
            >
              <option value="all">All Prices</option>
              <option value="under20">Under $20</option>
              <option value="20-50">$20 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="over100">Over $100</option>
            </select>
            <select 
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 transition-colors cursor-pointer"
            >
              <option value="all">All Colors</option>
              <option value="green">Green</option>
              <option value="pink">Pink</option>
              <option value="yellow">Yellow</option>
              <option value="white">White</option>
            </select>
            <select 
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 transition-colors cursor-pointer"
            >
              <option value="all">All Sizes</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 transition-colors cursor-pointer"
          >
            <option value="default">Default sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Products by Category */}
      <div className="container pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        ) : selectedCategory !== "all" ? (
          /* Single category filtered view */
          <div>
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 flex items-center gap-4">
              <span className={`h-1 w-12 ${
                selectedCategory === "flowers" ? "bg-pink-500" :
                selectedCategory === "services" ? "bg-emerald-600" :
                selectedCategory === "grass" ? "bg-lime-600" :
                "bg-amber-600"
              }`}></span>
              {categoryLabels[selectedCategory as Category]}
            </h2>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg">No products found with selected filters</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((p, i) => renderProduct(p, i))}
              </div>
            )}
          </div>
        ) : (
          /* All categories view with filters applied */
          <div className="space-y-16">
            {/* Flowers Section */}
            {filteredByCategory.flowers.length > 0 && (
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 flex items-center gap-4">
                  <span className="h-1 w-12 bg-pink-500"></span>
                  Flowers
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredByCategory.flowers.map((p, i) => renderProduct(p, i))}
                </div>
              </div>
            )}

            {/* Services Section */}
            {filteredByCategory.services.length > 0 && (
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 flex items-center gap-4">
                  <span className="h-1 w-12 bg-emerald-600"></span>
                  Services
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredByCategory.services.map((p, i) => renderProduct(p, i))}
                </div>
              </div>
            )}

            {/* Grass Section */}
            {filteredByCategory.grass.length > 0 && (
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 flex items-center gap-4">
                  <span className="h-1 w-12 bg-lime-600"></span>
                  Grass
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredByCategory.grass.map((p, i) => renderProduct(p, i))}
                </div>
              </div>
            )}

            {/* Soil Section */}
            {filteredByCategory.soil.length > 0 && (
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 flex items-center gap-4">
                  <span className="h-1 w-12 bg-amber-600"></span>
                  Soil
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredByCategory.soil.map((p, i) => renderProduct(p, i))}
                </div>
              </div>
            )}

            {/* No results message */}
            {filteredByCategory.flowers.length === 0 &&
             filteredByCategory.services.length === 0 &&
             filteredByCategory.grass.length === 0 &&
             filteredByCategory.soil.length === 0 && (
              <div className="text-center py-20">
                <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg">No products found with selected filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange("all");
                    setSelectedColor("all");
                    setSelectedSize("all");
                    setSortBy("default");
                  }}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
