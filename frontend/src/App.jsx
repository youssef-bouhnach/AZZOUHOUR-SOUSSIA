import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";

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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/accueil"
            element={
              <ProtectedRoute>
                <Accueil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/products" element={<Products />}></Route>
          <Route
            path="/products/detail/:id"
            element={<ProductsDetail />}
          ></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route
            path="/categories/:slug/products"
            element={<CategoriesProducts />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
