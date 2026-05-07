import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "../config/api";
import { useAuth } from "./authContext";

const FavoriteContext = createContext();

const LS_KEY = "favorites";

// ── localStorage helpers (guest) ──
const loadGuestIds = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
  catch { return []; }
};
const saveGuestIds = (ids) => localStorage.setItem(LS_KEY, JSON.stringify(ids));
const clearGuestIds = () => localStorage.removeItem(LS_KEY);

export const FavoriteProvider = ({ children }) => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // ── Fetch server favorites (logged-in) ──
  const fetchFavorites = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await axios.get("/api/favorites/ids");
      setFavoriteIds(res.data.ids || []);
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // ── On login: merge guest favorites into server, then clear localStorage ──
  const mergeGuestFavorites = useCallback(async () => {
    const guestIds = loadGuestIds();
    if (guestIds.length === 0) return;
    try {
      await Promise.all(
        guestIds.map((id) => axios.post("/api/favorites", { product_id: id }).catch(() => {}))
      );
    } finally {
      clearGuestIds();
    }
  }, []);

  // ── React to auth changes ──
  useEffect(() => {
    if (user) {
      mergeGuestFavorites().then(() => fetchFavorites());
    } else {
      setFavoriteIds(loadGuestIds());
    }
  }, [user, fetchFavorites, mergeGuestFavorites]);

  const isFavorite = (productId) => favoriteIds.includes(productId);

  const toggleFavorite = async (productId) => {
    const already = isFavorite(productId);

    if (user) {
      // Optimistic update
      setFavoriteIds((prev) =>
        already ? prev.filter((id) => id !== productId) : [...prev, productId]
      );
      try {
        if (already) {
          await axios.delete(`/api/favorites/${productId}`);
        } else {
          await axios.post("/api/favorites", { product_id: productId });
        }
      } catch (err) {
        // Revert on error
        setFavoriteIds((prev) =>
          already ? [...prev, productId] : prev.filter((id) => id !== productId)
        );
        console.error("Failed to toggle favorite", err);
      }
    } else {
      // Guest: use localStorage
      const next = already
        ? favoriteIds.filter((id) => id !== productId)
        : [...favoriteIds, productId];
      setFavoriteIds(next);
      saveGuestIds(next);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite, loading }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
