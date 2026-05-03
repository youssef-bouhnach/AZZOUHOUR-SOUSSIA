import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { categoriesApi } from "@/services/api";
import { toast } from "sonner";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoriesApi.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (index) => {
    const colors = [
      "from-green-500 to-emerald-600",
      "from-amber-500 to-orange-600",
      "from-purple-500 to-pink-600",
      "from-blue-500 to-cyan-600",
      "from-emerald-500 to-teal-600",
    ];
    return colors[index % colors.length];
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-green-900">
                  Our Categories
                </h1>
                <p className="text-xl text-green-700 leading-relaxed">
                  Explore our diverse collection of plants, soils, vases, services, and more. 
                  Each category is carefully curated to bring nature closer to you.
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 blur-xl"></div>
          </section>

          {/* Categories Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground">No categories available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categories.map((category, index) => (
                    <Link
                      key={category.id}
                      to={`/shop?category=${category.id}`}
                      className="group relative overflow-hidden rounded-2xl bg-white border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(index)} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                      
                      {/* Content */}
                      <div className="relative p-8">
                        {/* Icon */}
                        <div className="mb-6">
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getCategoryColor(index)} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform`}>
                            {category.icon || '🌿'}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {category.description || 'Discover our amazing collection'}
                        </p>

                        {/* Products Count */}
                        {category.products_count !== undefined && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <span className="font-semibold">{category.products_count}</span>
                            <span>products available</span>
                          </div>
                        )}

                        {/* Arrow */}
                        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                          <span>Explore</span>
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-4xl font-bold mb-6">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
                Browse all our products or get in touch with us for personalized recommendations.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  to="/shop"
                  className="px-8 py-4 bg-white text-green-700 rounded-full font-semibold hover:bg-green-50 transition-colors shadow-lg"
                >
                  View All Products
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-green-800 text-white rounded-full font-semibold hover:bg-green-900 transition-colors border-2 border-white/20"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default CategoriesPage;
