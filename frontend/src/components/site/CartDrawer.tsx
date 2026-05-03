import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/authContext";
import { Minus, Plus, Trash2, ShoppingBag, Leaf, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ordersApi } from "@/services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CartDrawer = () => {
  const { open, setOpen, items, setQty, remove, subtotal, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 12) : 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter a delivery address");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
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
      clear();
      setAddress("");
      setNotes("");
      setOpen(false);
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md p-0">
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-leaf text-primary-foreground shadow-soft">
              <Leaf className="h-4 w-4" />
            </div>
            <SheetTitle className="font-display text-2xl">Your basket</SheetTitle>
            {items.length > 0 && (
              <span className="ml-auto text-xs text-muted-foreground">
                {items.reduce((n, i) => n + i.qty, 0)} item{items.reduce((n, i) => n + i.qty, 0) !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </SheetHeader>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center px-6 py-12 text-muted-foreground">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-muted mb-5">
              <ShoppingBag className="h-9 w-9 opacity-40" />
            </div>
            <p className="font-display text-xl text-foreground">Your basket is empty</p>
            <p className="mt-2 text-sm leading-relaxed max-w-[220px]">
              Pick a tree, a flower, a handful of soil…
            </p>
            <Button
              variant="outline"
              className="mt-6 rounded-full gap-2"
              onClick={() => setOpen(false)}
            >
              Browse the nursery
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <ul className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Product Card */}
                  <div className="flex gap-3 p-3">
                    {/* Image */}
                    <div className="relative shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-xl object-cover ring-2 ring-white shadow-md"
                      />
                      {/* Delete button overlay */}
                      <button
                        onClick={() => remove(item.id)}
                        className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 hover:scale-110 transition-all duration-200"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      {/* Name & Category */}
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                          {item.name}
                        </h4>
                        <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                          {item.category}
                        </span>
                      </div>

                      {/* Price & Quantity */}
                      <div className="flex items-end justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-1 bg-white rounded-full shadow-sm border border-gray-200 p-0.5">
                          <button
                            onClick={() => setQty(item.id, item.qty - 1)}
                            className="grid h-7 w-7 place-items-center rounded-full hover:bg-green-600 hover:text-white transition-all duration-200"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-gray-900">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => setQty(item.id, item.qty + 1)}
                            className="grid h-7 w-7 place-items-center rounded-full hover:bg-green-600 hover:text-white transition-all duration-200"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Total Price */}
                        <div className="text-right">
                          <p className="text-xs text-gray-500 leading-none mb-0.5">
                            ${item.price} × {item.qty}
                          </p>
                          <p className="text-lg font-black text-green-600 leading-none">
                            ${(item.price * item.qty).toFixed(0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t border-border px-6 pt-4 pb-6 space-y-4 bg-background">
              {/* Shipping notice */}
              <div
                className={cn(
                  "rounded-xl px-4 py-2.5 text-xs text-center transition-colors",
                  shipping === 0
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {shipping === 0
                  ? "🎉 Free shipping on your order!"
                  : `Add $${(100 - subtotal).toFixed(0)} more for free shipping`}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                  <span className="font-display">Total</span>
                  <span className="font-display text-primary">${total.toFixed(0)}</span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Delivery Address *</label>
                <Textarea
                  placeholder="Enter your delivery address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  className="rounded-xl resize-none text-sm"
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Order Notes (optional)</label>
                <Textarea
                  placeholder="Any special instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="rounded-xl resize-none text-sm"
                />
              </div>

              {/* Actions */}
              <Button
                size="lg"
                className="w-full rounded-full gap-2 group"
                onClick={handleCheckout}
                disabled={loading || items.length === 0}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
              <button
                onClick={() => {
                  clear();
                  toast("Cart cleared");
                }}
                className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors text-center"
              >
                Clear basket
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
