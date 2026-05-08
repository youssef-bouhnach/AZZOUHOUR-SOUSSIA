import { createContext, useContext, useState, useEffect, useCallback } from "react";
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
  const { user } = useAuth();
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
      // Push each guest item to the server cart
      await Promise.all(
        guestItems.map((item) =>
          axios.post("/api/cart", {
            product_id: item.product_id,
            quantity: item.quantity,
          })
        )
      );
    } catch (err) {
      console.error("Failed to merge guest cart", err);
    } finally {
      clearGuestCart();
    }
  }, []);

  // ── When user changes (login/logout) ──
  useEffect(() => {
    if (user) {
      // Merge any guest items then fetch the full server cart
      mergeGuestCart().then(() => fetchCart());
    } else {
      // Load guest cart from localStorage
      const guestItems = loadGuestCart();
      setItems(guestItems);
      setTotal(calcGuestTotal(guestItems));
    }
  }, [user, fetchCart, mergeGuestCart]);

  // ── Add to cart ──
  const addToCart = async (product, quantity = 1) => {
    // product can be an object { id, name, image, unit_price, stock } or just an id
    // productsDetail passes the full product object so we can store it for guests
    if (user) {
      const productId = typeof product === "object" ? product.id : product;
      await axios.post("/api/cart", { product_id: productId, quantity });
      await fetchCart();
    } else {
      // Guest: update localStorage
      const guestItems = loadGuestCart();
      const existing = guestItems.find((i) => i.product_id === product.id);

      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + quantity,
          product.stock ?? 999
        );
      } else {
        guestItems.push({
          product_id: product.id,
          name: product.name,
          image: product.image,
          unit_price: parseFloat(product.promo_price ?? product.price),
          quantity,
          stock: product.stock,
          subtotal: parseFloat(product.promo_price ?? product.price) * quantity,
        });
      }

      saveGuestCart(guestItems);
      setItems([...guestItems]);
      setTotal(calcGuestTotal(guestItems));
    }

    setIsOpen(true);
  };

  // ── Remove from cart ──
  const removeFromCart = async (productId) => {
    if (user) {
      await axios.delete(`/api/cart/${productId}`);
      await fetchCart();
    } else {
      const updated = loadGuestCart().filter((i) => i.product_id !== productId);
      saveGuestCart(updated);
      setItems(updated);
      setTotal(calcGuestTotal(updated));
    }
  };

  // ── Update quantity ──
  const updateQuantity = async (productId, quantity) => {
    if (user) {
      await axios.patch(`/api/cart/${productId}`, { quantity });
      await fetchCart();
    } else {
      const updated = loadGuestCart().map((i) =>
        i.product_id === productId
          ? { ...i, quantity, subtotal: i.unit_price * quantity }
          : i
      );
      saveGuestCart(updated);
      setItems(updated);
      setTotal(calcGuestTotal(updated));
    }
  };

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
