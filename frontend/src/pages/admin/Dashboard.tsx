import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Wrench, DollarSign, TrendingUp, ArrowRight, Package, Leaf, Loader2 } from "lucide-react";
import { productsApi, ordersApi } from "@/services/api";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, ordersData] = await Promise.all([
          productsApi.getAll(),
          ordersApi.getAllOrders().catch(() => []),
        ]);
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalValue = products.reduce((sum, p) => sum + parseFloat(p.price.toString()), 0);
  const avgPrice = products.length ? (totalValue / products.length).toFixed(0) : "0";

  const categoryCounts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  const categoryLabels: Record<string, string> = {
    flowers: "Flowers",
    grass: "Grass",
    soil: "Soil",
    services: "Services",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: ShoppingBag,
      color: "bg-emerald-50 text-emerald-700",
      iconBg: "bg-emerald-100",
      href: "/admin/products",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: Wrench,
      color: "bg-blue-50 text-blue-700",
      iconBg: "bg-blue-100",
      href: "/admin/orders",
    },
    {
      label: "Avg. Product Price",
      value: "$" + avgPrice,
      icon: DollarSign,
      color: "bg-amber-50 text-amber-700",
      iconBg: "bg-amber-100",
      href: "/admin/products",
    },
    {
      label: "Catalog Value",
      value: "$" + totalValue.toFixed(0),
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-700",
      iconBg: "bg-purple-100",
      href: "/admin/products",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page header */}
      <div>
        <h1 className="font-display text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back — here's what's happening at AZZOUHOUR-SOUSSIA.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color, iconBg, href }) => (
          <Link
            key={label}
            to={href}
            className="group rounded-2xl border border-border bg-background p-5 shadow-card hover:shadow-soft transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <div className={"grid h-10 w-10 place-items-center rounded-xl " + iconBg}>
                <Icon className={"h-5 w-5 " + color.split(" ")[1]} />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="mt-4 font-display text-3xl font-semibold text-foreground">{value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Products by category */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-semibold">Products by Category</h2>
            <Link
              to="/admin/products"
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              Manage <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / products.length) * 100);
              const colors: Record<string, string> = {
                flowers: "bg-pink-500",
                grass: "bg-lime-500",
                soil: "bg-amber-500",
                services: "bg-emerald-500",
              };
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{categoryLabels[cat] || cat}</span>
                    <span className="text-muted-foreground">{count} product{count !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={"h-full rounded-full transition-all duration-700 " + (colors[cat] ?? "bg-primary")}
                      style={{ width: pct + "%" }}
                    />
                  </div>
                </div>
              );
            })}
            {products.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No products yet</p>
            )}
          </div>
        </div>

        {/* Recent products */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-semibold">Recent Products</h2>
            <Link
              to="/admin/products"
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {products.slice(-5).reverse().map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg overflow-hidden bg-muted shrink-0">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                </div>
                <span className="font-display font-semibold text-primary text-sm shrink-0">${p.price}</span>
              </div>
            ))}
            {products.length === 0 && (
              <div className="flex flex-col items-center py-6 text-center text-muted-foreground">
                <Package className="h-8 w-8 mb-2 opacity-30" />
                <p className="text-sm">No products yet</p>
                <Link to="/admin/products" className="mt-2 text-xs text-primary hover:underline">
                  Add your first product
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors shadow-soft"
          >
            <ShoppingBag className="h-4 w-4" /> Add Product
          </Link>
          <Link
            to="/admin/services"
            className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors border border-border"
          >
            <Wrench className="h-4 w-4" /> Add Service
          </Link>
          <Link
            to="/admin/settings"
            className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors border border-border"
          >
            <Leaf className="h-4 w-4" /> Store Settings
          </Link>
        </div>
      </div>
    </div>
  );
};
