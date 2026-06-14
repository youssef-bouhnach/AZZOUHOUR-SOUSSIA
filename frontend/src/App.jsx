import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import CartDrawer from "./components/cartDrawer";

import Login from "./pages/login";
import Register from "./pages/register";
import Accueil from "./pages/accueil";
import AdminDashboard from "./pages/adminDashboard";
import VerifyEmail from "./pages/verifyEmail";
import Products from "./pages/products";
import ProductsDetail from "./pages/productsDetail";
import Categories1 from "./pages/categories1";
import CategoriesProducts from "./pages/categoriesProducts";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import OrderSuccess from "./pages/orderSuccess";
import Profile from "./pages/profile";
import Orders from "./pages/orders";
import Contact from "./pages/contact";
import About from "./pages/about";
import Favorites from "./pages/favorites";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import DeliveryOrders from "./pages/DeliveryOrders";
import DeliveryOrderDetail from "./pages/DeliveryOrderDetail";
import UnauthorizedPage from "./pages/aunothorized";
import { NotFound } from "./pages/notFound";
import { DeliveryProvider } from "./context/deliveryContext";
import FindUs from "./pages/findUs";

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
          <Route path="/categories" element={<Categories1 />} />
          <Route
            path="/categories/:slug/products"
            element={<CategoriesProducts />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
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
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/find-us" element={<FindUs />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
