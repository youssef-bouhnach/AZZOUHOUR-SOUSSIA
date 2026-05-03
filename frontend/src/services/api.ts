import axios from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  is_active: boolean;
  products_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Variant {
  id: number;
  product_id: number;
  name: string;
  price: number;
  stock: number;
  diameter: number | null;
  height: number | null;
  weight: number | null;
  size: string | null;
  duration: number | null;
  sku: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlantDetails {
  id: number;
  product_id: number;
  sunlight: "full_sun" | "partial_shade" | "shade" | null;
  watering: "low" | "moderate" | "frequent" | null;
  growth_rate: "slow" | "medium" | "fast" | null;
  maintenance_level: "low" | "medium" | "high" | null;
  toxicity: string | null;
  pet_friendly: boolean;
}

export interface SoilDetails {
  id: number;
  product_id: number;
  ph: number | null;
  composition: string | null;
  texture: string | null;
  drainage: string | null;
  nutrients: string | null;
}

export interface GrassDetails {
  id: number;
  product_id: number;
  grass_type: "natural" | "artificial" | null;
  blade_height: number | null;
  density: string | null;
  climate_suitability: string | null;
  maintenance_frequency: string | null;
}

export interface VaseDetails {
  id: number;
  product_id: number;
  material: string | null;
  style: "modern" | "classic" | "minimalist" | "decorative" | "vintage" | null;
  diameter: number | null;
  height: number | null;
  weight: number | null;
  drainage_hole: boolean;
}

export interface ServiceDetails {
  id: number;
  product_id: number;
  service_type: "planting" | "watering" | "garden_cleaning" | "outdoor_decoration" | "garden_treatment" | "other_services" | null;
  location_type: "indoor" | "outdoor" | "other" | null;
  duration: number | null;
  includes: string | null;
  requirements: string | null;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  promo_price: number | null;
  currency: string;
  image: string | null;
  category: "flowers" | "grass" | "soil" | "services";
  category_id: number | null;
  stock: number;
  status: "available" | "out_of_stock" | "coming_soon";
  is_active: boolean;
  is_featured: boolean;
  color: string | null;
  origin: string | null;
  is_indoor: boolean;
  created_at: string;
  updated_at: string;
  // Relations
  category_relation?: Category;
  variants?: Variant[];
  plant_details?: PlantDetails;
  soil_details?: SoilDetails;
  grass_details?: GrassDetails;
  vase_details?: VaseDetails;
  service_details?: ServiceDetails;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: number;
  user_id: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  total: number;
  address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  user?: User;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  async getCsrfCookie() {
    await axios.get("/sanctum/csrf-cookie");
  },

  async login(email: string, password: string) {
    await this.getCsrfCookie();
    const response = await axios.post("/auth/login", { email, password });
    return response.data;
  },

  async register(name: string, email: string, password: string, password_confirmation: string) {
    await this.getCsrfCookie();
    const response = await axios.post("/auth/register", {
      name,
      email,
      password,
      password_confirmation,
    });
    return response.data;
  },

  async logout() {
    await axios.post("/auth/logout");
  },

  async getUser(): Promise<User> {
    const response = await axios.get("/api/user");
    return response.data;
  },
};

// ─── Products ─────────────────────────────────────────────────────────────────

export const productsApi = {
  async getAll(params?: { category?: string; category_id?: number; featured?: boolean }): Promise<Product[]> {
    const response = await axios.get("/api/products", { params });
    return response.data;
  },

  async getOne(id: number): Promise<Product> {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  },

  async create(data: {
    name: string;
    description?: string;
    price: number;
    promo_price?: number;
    currency?: string;
    image?: string;
    category_id: number;
    stock: number;
    status?: string;
    is_active?: boolean;
    is_featured?: boolean;
    color?: string;
    origin?: string;
    is_indoor?: boolean;
  }): Promise<Product> {
    const response = await axios.post("/api/products", data);
    return response.data;
  },

  async update(
    id: number,
    data: Partial<{
      name: string;
      description: string;
      price: number;
      promo_price: number;
      currency: string;
      image: string;
      category_id: number;
      stock: number;
      status: string;
      is_active: boolean;
      is_featured: boolean;
      color: string;
      origin: string;
      is_indoor: boolean;
    }>
  ): Promise<Product> {
    const response = await axios.put(`/api/products/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`/api/products/${id}`);
  },
};

// ─── Categories ───────────────────────────────────────────────────────────────

export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    const response = await axios.get("/api/categories");
    return response.data;
  },

  async getOne(id: number): Promise<Category> {
    const response = await axios.get(`/api/categories/${id}`);
    return response.data;
  },

  async create(data: {
    name: string;
    slug?: string;
    description?: string;
    icon?: string;
    is_active?: boolean;
  }): Promise<Category> {
    const response = await axios.post("/api/categories", data);
    return response.data;
  },

  async update(
    id: number,
    data: Partial<{
      name: string;
      slug: string;
      description: string;
      icon: string;
      is_active: boolean;
    }>
  ): Promise<Category> {
    const response = await axios.put(`/api/categories/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`/api/categories/${id}`);
  },
};

// ─── Orders ───────────────────────────────────────────────────────────────────

export const ordersApi = {
  async getMyOrders(): Promise<Order[]> {
    const response = await axios.get("/api/orders");
    return response.data;
  },

  async getOne(id: number): Promise<Order> {
    const response = await axios.get(`/api/orders/${id}`);
    return response.data;
  },

  async create(data: {
    items: Array<{ product_id: number; quantity: number }>;
    address: string;
    notes?: string;
  }): Promise<Order> {
    const response = await axios.post("/api/orders", data);
    return response.data;
  },

  // Admin only
  async getAllOrders(): Promise<Order[]> {
    const response = await axios.get("/api/admin/orders");
    return response.data;
  },

  async updateStatus(id: number, status: Order["status"]): Promise<Order> {
    const response = await axios.patch(`/api/admin/orders/${id}/status`, { status });
    return response.data;
  },
};
