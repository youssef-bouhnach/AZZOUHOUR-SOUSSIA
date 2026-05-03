import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingCart, ArrowRight, Trash2, Package, CreditCard } from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import { useAuth } from "@/context/authContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ordersApi } from "@/services/api";
import { toast } from "sonner";

const CartPageContent = () => {
  const { items, setQty, remove, subtotal, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);

  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 12) : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handleCheckoutClick = () => {
    if (!user) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setCheckoutDialogOpen(true);
  };

  const handleCheckout = async () => {
    if (!address.trim()) {
      toast.error("Please enter a delivery address");
      return;
    }

    try {
      setLoading(true);
      await ordersApi.create({
        items: items.map((item) => ({
          product_id: parseInt(item.id),
          quantity: item.qty,
        })),
        address: address.trim(),
        notes: notes.trim() || undefined,
      });

      toast.success("Order placed successfully!");
      
      // Clear cart and reset form
      clear();
      setAddress("");
      setNotes("");
      setCheckoutDialogOpen(false);
      
      // Small delay to ensure cart is cleared before navigation
      setTimeout(() => {
        navigate("/orders");
      }, 100);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {items.length === 0 ? "Your cart is empty" : `${items.length} item${items.length !== 1 ? 's' : ''} in your cart`}
            </p>
          </div>

          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Start adding some amazing products!</p>
              <Button
                onClick={() => navigate("/shop")}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group"
                    style={{
                      animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative">
                        <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 ring-2 ring-gray-200 group-hover:ring-green-400 transition-all duration-300">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <button
                          onClick={() => {
                            remove(item.id);
                            toast.success("Item removed from cart");
                          }}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">{item.category}</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-green-600">
                              ${Number(item.price).toFixed(2)}
                            </span>
                            {item.promo_price && (
                              <span className="text-sm text-gray-400 line-through">
                                ${Number(item.promo_price).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                            <button
                              onClick={() => {
                                if (item.qty === 1) {
                                  remove(item.id);
                                } else {
                                  setQty(item.id, item.qty - 1);
                                }
                              }}
                              className="w-8 h-8 rounded-full bg-white hover:bg-green-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-gray-900 min-w-[30px] text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => setQty(item.id, item.qty + 1)}
                              className="w-8 h-8 rounded-full bg-white hover:bg-green-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="text-xl font-bold text-gray-900">
                              ${(Number(item.price) * item.qty).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon Section */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 h-12 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                    <Button
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 h-12 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Apply Coupon
                    </Button>
                  </div>
                </div>

                {/* Clear Cart */}
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to clear your cart?")) {
                      clear();
                      toast.success("Cart cleared");
                    }
                  }}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Package className="w-6 h-6 text-green-600" />
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    {/* Subtotal */}
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="font-semibold">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    {/* Tax */}
                    <div className="flex justify-between text-gray-700">
                      <span>Tax (10%)</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">Total</span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Free Shipping Progress */}
                  {shipping > 0 && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <p className="text-sm text-green-800 font-medium mb-2">
                        Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <Button
                    onClick={handleCheckoutClick}
                    disabled={items.length === 0}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  {/* Security Badge */}
                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                      Secure checkout powered by SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Checkout Dialog */}
        <Dialog open={checkoutDialogOpen} onOpenChange={setCheckoutDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Complete Your Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Delivery Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Enter your full delivery address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* Order Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Order Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <Textarea
                  placeholder="Any special instructions for your order..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-green-600 text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setCheckoutDialogOpen(false)}
                disabled={loading}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCheckout}
                disabled={loading || !address.trim()}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl px-8"
              >
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <CartDrawer />
      <Footer />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

const CartPage = () => {
  return (
    <CartProvider>
      <CartPageContent />
    </CartProvider>
  );
};

export default CartPage;
