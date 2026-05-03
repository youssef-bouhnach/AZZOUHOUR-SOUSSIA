import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { products as defaultProducts, services as defaultServices } from "@/data/products";
import type { Product, Service, Category } from "@/data/products";

// ─── Types ────────────────────────────────────────────────────────────────────

export type { Product, Service, Category };

export interface StoreSettings {
  storeName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
  freeShippingThreshold: number;
  shippingCost: number;
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "AZZOUHOUR-SOUSSIA",
  tagline: "Grow a garden that breathes.",
  email: "hello@azzouhour.ma",
  phone: "+212 (528) 555-0192",
  address: "Souss Valley, Morocco",
  hours: "Tue–Sat, 9am – 5pm",
  freeShippingThreshold: 100,
  shippingCost: 12,
};

interface AdminCtx {
  products: Product[];
  services: Service[];
  settings: StoreSettings;
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, p: Partial<Omit<Product, "id">>) => void;
  deleteProduct: (id: string) => void;
  addService: (s: Omit<Service, "id">) => void;
  updateService: (id: string, s: Partial<Omit<Service, "id">>) => void;
  deleteService: (id: string) => void;
  updateSettings: (s: Partial<StoreSettings>) => void;
  resetToDefaults: () => void;
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

const KEYS = {
  products: "azzouhour-admin-products",
  services: "azzouhour-admin-services",
  settings: "azzouhour-admin-settings",
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Context ──────────────────────────────────────────────────────────────────

const Ctx = createContext<AdminCtx | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() =>
    load(KEYS.products, defaultProducts)
  );
  const [services, setServices] = useState<Service[]>(() =>
    load(KEYS.services, defaultServices)
  );
  const [settings, setSettings] = useState<StoreSettings>(() =>
    load(KEYS.settings, DEFAULT_SETTINGS)
  );

  useEffect(() => { save(KEYS.products, products); }, [products]);
  useEffect(() => { save(KEYS.services, services); }, [services]);
  useEffect(() => { save(KEYS.settings, settings); }, [settings]);

  // Products
  const addProduct = useCallback((p: Omit<Product, "id">) => {
    setProducts((prev) => [...prev, { ...p, id: uid() }]);
  }, []);

  const updateProduct = useCallback((id: string, p: Partial<Omit<Product, "id">>) => {
    setProducts((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  // Services
  const addService = useCallback((s: Omit<Service, "id">) => {
    setServices((prev) => [...prev, { ...s, id: uid() }]);
  }, []);

  const updateService = useCallback((id: string, s: Partial<Omit<Service, "id">>) => {
    setServices((prev) => prev.map((x) => (x.id === id ? { ...x, ...s } : x)));
  }, []);

  const deleteService = useCallback((id: string) => {
    setServices((prev) => prev.filter((x) => x.id !== id));
  }, []);

  // Settings
  const updateSettings = useCallback((s: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...s }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setProducts(defaultProducts);
    setServices(defaultServices);
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <Ctx.Provider
      value={{
        products,
        services,
        settings,
        addProduct,
        updateProduct,
        deleteProduct,
        addService,
        updateService,
        deleteService,
        updateSettings,
        resetToDefaults,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
};
