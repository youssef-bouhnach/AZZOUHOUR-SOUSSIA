import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, Leaf, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const CartDrawer = () => {
  const { open, setOpen, items, setQty, remove, subtotal, clear } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 12) : 0;
  const total = subtotal + shipping;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md p-0">
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="font-display text-2xl">Shopping Cart</SheetTitle>
        </SheetHeader>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center px-6 py-12 text-muted-foreground">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-muted mb-5">
              <ShoppingBag className="h-9 w-9 opacity-40" />
            </div>
            <p className="font-display text-xl text-foreground">Your cart is empty</p>
            <p className="mt-2 text-sm leading-relaxed max-w-[220px]">
              Pick a tree, a flower, a handful of soil…
            </p>
            <Button
              variant="outline"
              className="mt-6 rounded-full"
              onClick={() => setOpen(false)}
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-gray-100 last:border-0"
                >
                  {/* Image */}
                  <div className="relative shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    {/* Name & Remove */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => {
                          remove(item.id);
                          toast.success("Item removed");
                        }}
                        className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (item.qty === 1) {
                              remove(item.id);
                              toast.success("Item removed");
                            } else {
                              setQty(item.id, item.qty - 1);
                            }
                          }}
                          className="h-6 w-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="h-6 w-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          ${(Number(item.price) * item.qty).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t border-border px-6 pt-4 pb-6 space-y-4 bg-background">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-lg">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>

              {/* Shipping notice */}
              {shipping > 0 && (
                <p className="text-xs text-center text-gray-500">
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* VIEW CART - Orange/Peach */}
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full text-base font-semibold bg-orange-100 hover:bg-orange-200 text-orange-900 border-orange-200"
                  onClick={() => {
                    setOpen(false);
                    navigate("/cart");
                  }}
                >
                  VIEW CART
                </Button>

                {/* CHECKOUT - Dark Green */}
                <Button
                  size="lg"
                  className="w-full rounded-full text-base font-semibold bg-emerald-800 hover:bg-emerald-900 text-white"
                  onClick={() => {
                    setOpen(false);
                    navigate("/cart");
                  }}
                >
                  CHECKOUT
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
