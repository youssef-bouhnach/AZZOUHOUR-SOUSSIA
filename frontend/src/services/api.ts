import axios from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: "flowers" | "grass" | "soil" | "services";
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
  async getAll(category?: string): Promise<Product[]> {
    const params = category ? { category } : {};
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
    image?: string;
    category: string;
    stock: number;
    is_active?: boolean;
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
      image: string;
      category: string;
      stock: number;
      is_active: boolean;
    }>
  ): Promise<Product> {
    const response = await axios.put(`/api/products/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`/api/products/${id}`);
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
