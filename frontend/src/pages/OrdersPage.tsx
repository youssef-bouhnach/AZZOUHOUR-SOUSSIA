import { useState, useEffect } from "react";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { ordersApi, type Order } from "@/services/api";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { Package, Clock, CheckCircle, XCircle, Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "bg-amber-100 text-amber-800 border-amber-200",
    iconColor: "text-amber-600",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    iconColor: "text-blue-600",
  },
  delivered: {
    label: "Delivered",
    icon: Package,
    color: "bg-green-100 text-green-800 border-green-200",
    iconColor: "text-green-600",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "bg-red-100 text-red-800 border-red-200",
    iconColor: "text-red-600",
  },
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await ordersApi.getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section with Background Image */}
        <div 
          className="relative h-[400px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=600&fit=crop')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          
          {/* Content */}
          <div className="relative container h-full flex flex-col justify-center items-start text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
              <Package className="h-5 w-5" />
              <span className="font-semibold">Order History</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              My Orders
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Track your garden essentials and see your order history
            </p>
          </div>
        </div>

        {/* Orders Content */}
        <main className="py-16 bg-gradient-to-b from-white to-green-50/30">
          <div className="container max-w-5xl">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-green-600" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                  <ShoppingBag className="h-10 w-10 text-gray-400" />
                </div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  No orders yet
                </h2>
                <p className="text-gray-600 mb-8">
                  Start shopping and your orders will appear here
                </p>
                <a
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  Browse Products
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => {
                  const status = statusConfig[order.status] || statusConfig.pending;
                  const StatusIcon = status.icon;

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      {/* Order Header */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-200">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Order ID</p>
                            <p className="font-bold text-lg text-gray-900">#{order.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Date</p>
                            <p className="font-semibold text-gray-900">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Status</p>
                            <span
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm border ${status.color}`}
                            >
                              <StatusIcon className={`h-4 w-4 ${status.iconColor}`} />
                              {status.label}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Total</p>
                            <p className="font-black text-2xl text-green-600">
                              ${order.total}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="p-6">
                        {/* Address */}
                        {order.address && (
                          <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm font-semibold text-gray-700 mb-1">
                              Delivery Address
                            </p>
                            <p className="text-gray-900">{order.address}</p>
                          </div>
                        )}

                        {/* Notes */}
                        {order.notes && (
                          <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                            <p className="text-sm font-semibold text-blue-700 mb-1">
                              Order Notes
                            </p>
                            <p className="text-blue-900">{order.notes}</p>
                          </div>
                        )}

                        {/* Items */}
                        {order.items && order.items.length > 0 && (
                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-3">
                              Items ({order.items.length})
                            </p>
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                                >
                                  {item.product?.image && (
                                    <img
                                      src={item.product.image}
                                      alt={item.product.name}
                                      className="h-16 w-16 rounded-lg object-cover border-2 border-white shadow-sm"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900">
                                      {item.product?.name || "Product"}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Quantity: {item.quantity} × ${item.price}
                                    </p>
                                  </div>
                                  <p className="font-bold text-green-600">
                                    ${(item.quantity * item.price).toFixed(0)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>

        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default OrdersPage;
