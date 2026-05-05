import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import axios from "../config/api";
import "../styles/navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const { count, openCart } = useCart();
  const navigate = useNavigate();

  const [shopOpen, setShopOpen]       = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [categories, setCategories]   = useState([]);

  const shopRef    = useRef(null);
  const profileRef = useRef(null);

  // Fetch categories for the shop dropdown grid
  useEffect(() => {
    axios.get("/api/categories")
      .then((res) => setCategories(res.data.categories || []))
      .catch(() => {});
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target))       setShopOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate("/");
  };

  // Avatar initials from user name
  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        Free express shipping → On all orders $40 + Easy returns
      </div>

      {/* Main navbar */}
      <nav className="navbar">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <span>🌿</span> blooms co.
        </div>

        {/* Links */}
        <ul className="nav_links">
          <li><Link to="/">Home</Link></li>

          {/* ── Shop dropdown ── */}
          <li className="nav_dropdown_wrapper" ref={shopRef}>
            <button
              className="nav_dropdown_trigger"
              onClick={() => { setShopOpen((o) => !o); setProfileOpen(false); }}
            >
              Shop <span className={`nav_chevron ${shopOpen ? "open" : ""}`}>▾</span>
            </button>

            {shopOpen && (
              <div className="nav_dropdown">
                <div className="nav_dropdown_top">
                  <button
                    className="nav_all_products"
                    onClick={() => { navigate("/products"); setShopOpen(false); }}
                  >
                    All Products →
                  </button>
                </div>
                <div className="nav_category_grid">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className="nav_category_item"
                      onClick={() => { navigate(`/categories/${cat.slug}/products`); setShopOpen(false); }}
                    >
                      <div
                        className="nav_category_img"
                        style={{ backgroundImage: `url(/assets/categories/categorie_${cat.slug}.jfif)` }}
                      />
                      <span>{cat.name}</span>
                    </button>
                  ))}
                  <button
                    className="nav_category_item nav_category_all"
                    onClick={() => { navigate("/categories"); setShopOpen(false); }}
                  >
                    <div className="nav_category_img nav_category_img_all"><span>🌿</span></div>
                    <span>All Categories</span>
                  </button>
                </div>
              </div>
            )}
          </li>

          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Icons */}
        <div className="nav_icons">
          <span>🔍</span>

          {/* ── Profile dropdown ── */}
          <div className="nav_dropdown_wrapper" ref={profileRef}>
            <button
              className="nav_profile_btn"
              onClick={() => { setProfileOpen((o) => !o); setShopOpen(false); }}
              title={user ? user.name : "Account"}
            >
              {user ? (
                <div className="nav_avatar">{initials}</div>
              ) : (
                <span>👤</span>
              )}
            </button>

            {profileOpen && (
              <div className="nav_dropdown nav_profile_dropdown">
                {user ? (
                  <>
                    {/* User info header */}
                    <div className="nav_profile_header">
                      <div className="nav_avatar nav_avatar_lg">{initials}</div>
                      <div className="nav_profile_info">
                        <p className="nav_profile_name">{user.name}</p>
                        <p className="nav_profile_email">{user.email}</p>
                      </div>
                    </div>

                    <div className="nav_profile_divider" />

                    {/* Menu items */}
                    <button className="nav_profile_item" onClick={() => { navigate("/profile"); setProfileOpen(false); }}>
                      👤 My Account
                    </button>
                    <button className="nav_profile_item" onClick={() => { navigate("/orders"); setProfileOpen(false); }}>
                      📦 My Orders
                    </button>
                    <button className="nav_profile_item" onClick={() => { navigate("/cart"); setProfileOpen(false); }}>
                      🛒 My Cart
                    </button>

                    <div className="nav_profile_divider" />

                    <button className="nav_profile_item nav_profile_logout" onClick={handleLogout}>
                      � Log out
                    </button>
                  </>
                ) : (
                  <>
                    {/* Guest */}
                    <p className="nav_profile_guest">Welcome!</p>
                    <button className="nav_profile_item" onClick={() => { navigate("/login"); setProfileOpen(false); }}>
                      🔑 Log in
                    </button>
                    <button className="nav_profile_item" onClick={() => { navigate("/register"); setProfileOpen(false); }}>
                      ✏️ Create account
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart icon */}
          <span className="cart" onClick={openCart} style={{ cursor: "pointer" }}>
            🛒
            {count > 0 && <span className="cart_badge">{count}</span>}
          </span>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
