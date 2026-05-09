import axios from "axios";

// All API calls go through the Vite proxy (relative URLs)
// so cookies stay same-origin and CSRF works correctly.
// The VITE_API_URL is only used for image src attributes (direct asset URLs).

const instance = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Base URL for storage/image assets (direct, not proxied)
export const STORAGE_URL = import.meta.env.VITE_STORAGE_URL ?? "http://localhost:8000/storage";

// Prime the CSRF cookie — call once on app startup
export const initCsrf = () => instance.get("/sanctum/csrf-cookie");

// Delivery Man
export const getMyOrders = () => instance.get('/api/delivery/orders');
export const updateOrder = (id, action) => instance.patch(`/api/delivery/orders/${id}/status`, { action });

export default instance;
