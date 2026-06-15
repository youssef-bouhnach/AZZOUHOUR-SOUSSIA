import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "../config/api";
import { useAuth } from "./authContext";

const CartContext = createContext();

const GUEST_CART_KEY = "guest_cart";

// ── localStorage helpers ──
const loadGuestCart = () => {
  try {
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || [];
  } catch {
    return [];
  }
};

const saveGuestCart = (items) => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
};

const clearGuestCart = () => {
  localStorage.removeItem(GUEST_CART_KEY);
};

// Compute total from guest items
const calcGuestTotal = (items) =>
  items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

export const CartProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Fetch server cart (logged-in users) ──
  const fetchCart = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await axios.get("/api/cart");
      setItems(res.data.items);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // ── On login: merge guest cart into server cart, then clear guest cart ──
  const mergeGuestCart = useCallback(async () => {
    const guestItems = loadGuestCart();
    if (guestItems.length === 0) return;

    try {
      await Promise.all(
        guestItems.map((item) =>
          axios.post("/api/cart", {
            product_id: item.product_id,
            variant_id: item.variant_id ?? null,
            quantity: item.quantity,
          }),
        ),
      );
    } catch (err) {
      console.error("Failed to merge guest cart", err);
    } finally {
      clearGuestCart();
    }
  }, []);

  // ── When user changes (login/logout) ──
  useEffect(() => {
    // Wait for auth to finish resolving before deciding guest vs logged-in
    if (authLoading) return;

    if (user) {
      // Merge any guest items then fetch the full server cart
      mergeGuestCart().then(() => fetchCart());
    } else {
      // Load guest cart from localStorage
      const guestItems = loadGuestCart();
      setItems(guestItems);
      setTotal(calcGuestTotal(guestItems));
    }
  }, [user, authLoading, fetchCart, mergeGuestCart]);

  // ── Add to cart ──
  const addToCart = async (product, quantity = 1, variantId = null) => {
    if (user) {
      const productId = typeof product === "object" ? product.id : product;
      await axios.post("/api/cart", {
        product_id: productId,
        variant_id: variantId,
        quantity,
      });
      await fetchCart();
    } else {
      // Guest: use product_id + variant_id as the unique key
      const guestItems = loadGuestCart();
      const key = variantId ? `${product.id}_v${variantId}` : `${product.id}`;
      const existing = guestItems.find((i) => i._key === key);

      const unitPrice =
        variantId && product.variants
          ? parseFloat(
            product.variants.find((v) => v.id === variantId)?.price ??
            product.promo_price ??
            product.price,
          )
          : parseFloat(product.promo_price ?? product.price);

      const stock =
        variantId && product.variants
          ? (product.variants.find((v) => v.id === variantId)?.stock ??
            product.stock)
          : product.stock;

      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + quantity,
          stock ?? 999,
        );
        existing.subtotal = unitPrice * existing.quantity;
      } else {
        guestItems.push({
          _key: key,
          product_id: product.id,
          variant_id: variantId,
          variant_label: null, // guests don't need label display for now
          name: product.name,
          image: product.image,
          unit_price: unitPrice,
          currency: product.currency || "MAD",
          quantity,
          stock,
          subtotal: unitPrice * quantity,
        });
      }

      saveGuestCart(guestItems);
      setItems([...guestItems]);
      setTotal(calcGuestTotal(guestItems));
    }

    setIsOpen(true);
  };

  // ── Remove from cart ── (uses cart item id for logged-in, _key for guest)
  const removeFromCart = async (itemId) => {
    if (user) {
      await axios.delete(`/api/cart/${itemId}`);
      await fetchCart();
    } else {
      const updated = loadGuestCart().filter(
        (i) => i._key !== itemId && i.product_id !== itemId,
      );
      saveGuestCart(updated);
      setItems(updated);
      setTotal(calcGuestTotal(updated));
    }
  };

  // ── Update quantity ── (uses cart item id for logged-in, _key for guest)
  const updateQuantity = async (itemId, quantity) => {
    if (user) {
      await axios.patch(`/api/cart/${itemId}`, { quantity });
      await fetchCart();
    } else {
      const updated = loadGuestCart().map((i) =>
        i._key === itemId || i.product_id === itemId
          ? { ...i, quantity, subtotal: i.unit_price * quantity }
          : i,
      );
      saveGuestCart(updated);
      setItems(updated);
      setTotal(calcGuestTotal(updated));
    }
  };
  // clear cart from all items
  const clearCart = async () => {
    if (user) {
      try {
        await Promise.all(items.map((item) => axios.delete(`/api/cart/${item.id}`)));
      } catch {
        console.error("items can't be deleted from the cart !");
      }
      setItems([]);
      setTotal(0);
    }
  }

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        count,
        loading,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 
