// hooks/useCart.js
import { useState, useEffect, useCallback } from "react";
import axios from "../lib/axios";

export function useCart() {
  const [cart, setCart] = useState({ items: [], total: 0, count: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/cart");
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur panier");
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("/api/cart", { product_id: productId, quantity });
      await fetchCart();
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur ajout");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    setLoading(true);
    setError(null);
    try {
      await axios.patch(`/api/cart/${productId}`, { quantity });
      await fetchCart();
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur mise à jour");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/cart/${productId}`);
      await fetchCart();
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur suppression");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setError(null);
    try {
      await axios.delete("/api/cart");
      setCart({ items: [], total: 0, count: 0 });
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur vidage");
    }
  };

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refresh: fetchCart,
  };
}
