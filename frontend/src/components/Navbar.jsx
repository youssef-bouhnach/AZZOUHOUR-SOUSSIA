import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#3a2a1a]/60">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-900 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-green-900/40 group-hover:scale-105 transition-transform">
            🌿
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold text-green-400 tracking-tight">Flora</span>
            <span className="text-xs text-[#a07850] font-medium tracking-widest uppercase">Shop</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {[
            { label: "Home", path: "/" },
            { label: "Shop", path: "/shop" },
            { label: "Services", path: "/services" },
          ].map((item) => (
            <span
              key={item.label}
              onClick={() => navigate(item.path)}
              className="text-[#a07850] hover:text-green-400 cursor-pointer transition-colors duration-200 font-medium"
            >
              {item.label}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={() => navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard")}
              className="bg-green-700 hover:bg-green-600 transition-all px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-green-900/30"
            >
              Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hidden sm:block text-sm text-[#a07850] hover:text-white transition px-4 py-2 font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-green-700 hover:bg-green-600 transition-all px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-green-900/30"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
