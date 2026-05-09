import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import CartDrawer from "./components/cartDrawer";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Accueil from "./pages/accueil";
import AdminDashboard from "./pages/adminDashboard";
import VerifyEmail from "./pages/verifyEmail";
import Products from "./pages/products";
import ProductsDetail from "./pages/productsDetail";
import Categories from "./pages/Categories";
import CategoriesProducts from "./pages/categoriesProducts";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import OrderSuccess from "./pages/orderSuccess";
import Profile from "./pages/profile";
import Orders from "./pages/orders";
import Blog from "./pages/blog";
import Contact from "./pages/contact";
import About from "./pages/about";
import Favorites from "./pages/favorites";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import DeliveryOrders from "./pages/DeliveryOrders";
import DeliveryOrderDetail from "./pages/DeliveryOrderDetail";
import UnauthorizedPage from "./pages/aunothorized";
import { DeliveryProvider } from "./context/deliveryContext";

function App() {
  return (
    <>
      <Router>
        {/* Cart drawer lives outside Routes so it's always rendered */}
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/detail/:id" element={<ProductsDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/categories/:slug/products"
            element={<CategoriesProducts />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/delivery/dashboard"
            element={
              <ProtectedRoute allowedRoles={["deliveryman"]}>
                <DeliveryProvider>
                  <DeliveryDashboard />
                </DeliveryProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/delivery/orders"
            element={
              <ProtectedRoute allowedRoles={["deliveryman"]}>
                <DeliveryProvider>
                  <DeliveryOrders />
                </DeliveryProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/delivery/orders/:orderId/status"
            element={
              <ProtectedRoute allowedRoles={["deliveryman"]}>
                <DeliveryProvider>
                  <DeliveryOrderDetail />
                </DeliveryProvider>
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorizedPage" element={<UnauthorizedPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
