import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import {
  Leaf,
  User,
  Heart,
  ShoppingBag,
  Search,
  X,
  Menu,
  LogOut,
  Package,
  Settings,
} from "lucide-react";
import axios from "../config/api";
import "../styles/navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const { count, openCart } = useCart();
  const navigate = useNavigate();

  const [shopOpen, setShopOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [favCount, setFavCount] = useState(0);

  const shopRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // Fetch categories for the shop dropdown
  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data.categories || []))
      .catch(() => {});
  }, []);

  // Track favorites count from localStorage
  useEffect(() => {
    const readFavs = () => {
      try {
        const stored = localStorage.getItem("favorites");
        setFavCount(stored ? JSON.parse(stored).length : 0);
      } catch {
        setFavCount(0);
      }
    };
    readFavs();
    window.addEventListener("storage", readFavs);
    const interval = setInterval(readFavs, 1000);
    return () => {
      window.removeEventListener("storage", readFavs);
      clearInterval(interval);
    };
  }, []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setShopOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target))
        setShopOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  return (
    <>
      {/* Main navbar */}
      <header className={`navbar ${scrolled ? "navbar_scrolled" : ""}`}>
        <div className="navbar_inner">
          {/* Logo */}
          <Link to="/" className="navbar_logo">
            <span className="navbar_logo_icon">
              <Leaf size={16} />
            </span>
            AZZOUHOUR-SOUSSIA
          </Link>

          {/* Desktop nav links — hidden when search open */}
          <nav
            className={`navbar_links ${searchOpen ? "navbar_links_hidden" : ""}`}
          >
            {/* Shop dropdown */}
            <div className="nav_dropdown_wrapper" ref={shopRef}>
              <button
                className="navbar_link_btn"
                onClick={() => {
                  setShopOpen((o) => !o);
                  setProfileOpen(false);
                }}
              >
                Shop
              </button>
              {shopOpen && (
                <div className="nav_dropdown">
                  <div className="nav_dropdown_top">
                    <button
                      className="nav_all_products"
                      onClick={() => {
                        navigate("/products");
                        setShopOpen(false);
                      }}
                    >
                      All Products →
                    </button>
                  </div>
                  <div className="nav_category_grid">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        className="nav_category_item"
                        onClick={() => {
                          navigate(`/categories/${cat.slug}/products`);
                          setShopOpen(false);
                        }}
                      >
                        <div
                          className="nav_category_img"
                          style={{
                            backgroundImage: `url(/assets/categories/categorie_${cat.slug}.jfif)`,
                          }}
                        />
                        <span>{cat.name}</span>
                      </button>
                    ))}
                    <button
                      className="nav_category_item nav_category_all"
                      onClick={() => {
                        navigate("/categories");
                        setShopOpen(false);
                      }}
                    >
                      <div className="nav_category_img nav_category_img_all">
                        <span>🌿</span>
                      </div>
                      <span>All Categories</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link to="/categories" className="navbar_link">
              Categories
            </Link>
            <Link to="/about" className="navbar_link">
              Our Story
            </Link>
            <Link to="/contact" className="navbar_link">
              Contact
            </Link>

            {/* Search trigger */}
            <button
              className="navbar_search_trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search size={14} />
              <span>Search</span>
            </button>
          </nav>

          {/* Expanding search bar */}
          <div
            className={`navbar_search_bar ${searchOpen ? "navbar_search_bar_open" : ""}`}
          >
            <form onSubmit={handleSearch} className="navbar_search_form">
              <Search size={16} className="navbar_search_icon" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="navbar_search_input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="navbar_search_clear"
                >
                  <X size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="navbar_search_esc"
              >
                Esc
              </button>
            </form>
          </div>

          {/* Right icons */}
          <div className="navbar_actions">
            {/* User / profile */}
            <div className="nav_dropdown_wrapper" ref={profileRef}>
              <button
                className="navbar_icon_btn"
                onClick={() => {
                  setProfileOpen((o) => !o);
                  setShopOpen(false);
                }}
                title={user ? user.name : "Account"}
              >
                {user ? (
                  <span className="nav_avatar">{initials}</span>
                ) : (
                  <>
                    <User size={18} />
                    <span className="navbar_icon_label">Login</span>
                  </>
                )}
              </button>

              {profileOpen && (
                <div className="nav_dropdown nav_profile_dropdown">
                  {user ? (
                    <>
                      <div className="nav_profile_header">
                        <div className="nav_avatar nav_avatar_lg">
                          {initials}
                        </div>
                        <div className="nav_profile_info">
                          <p className="nav_profile_name">{user.name}</p>
                          <p className="nav_profile_email">{user.email}</p>
                        </div>
                      </div>
                      <div className="nav_profile_divider" />
                      {user.role === "admin" && (
                        <button
                          className="nav_profile_item"
                          onClick={() => {
                            navigate("/admin/dashboard");
                            setProfileOpen(false);
                          }}
                        >
                          <Settings size={15} /> Admin Panel
                        </button>
                      )}
                      <button
                        className="nav_profile_item"
                        onClick={() => {
                          navigate("/profile");
                          setProfileOpen(false);
                        }}
                      >
                        <User size={15} /> My Account
                      </button>
                      <button
                        className="nav_profile_item"
                        onClick={() => {
                          navigate("/orders");
                          setProfileOpen(false);
                        }}
                      >
                        <Package size={15} /> My Orders
                      </button>
                      <div className="nav_profile_divider" />
                      <button
                        className="nav_profile_item nav_profile_logout"
                        onClick={handleLogout}
                      >
                        <LogOut size={15} /> Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="nav_profile_guest">Welcome!</p>
                      <button
                        className="nav_profile_item"
                        onClick={() => {
                          navigate("/login");
                          setProfileOpen(false);
                        }}
                      >
                        🔑 Log in
                      </button>
                      <button
                        className="nav_profile_item"
                        onClick={() => {
                          navigate("/register");
                          setProfileOpen(false);
                        }}
                      >
                        ✏️ Create account
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Favorites */}
            <button
              className="navbar_icon_btn navbar_fav_btn"
              onClick={() => navigate("/favorites")}
              aria-label={`Favorites, ${favCount} items`}
            >
              <Heart
                size={18}
                className={favCount > 0 ? "navbar_fav_active" : ""}
              />
              {favCount > 0 && (
                <span className="navbar_badge navbar_badge_red">
                  {favCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              className="navbar_cart_btn"
              onClick={openCart}
              aria-label={`Cart, ${count} items`}
            >
              <ShoppingBag size={16} />
              <span>Cart</span>
              <span
                className={`navbar_badge ${count > 0 ? "navbar_badge_accent" : "navbar_badge_primary"}`}
              >
                {count}
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="navbar_hamburger"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="navbar_mobile_search">
            <form onSubmit={handleSearch} className="navbar_search_form">
              <Search size={16} className="navbar_search_icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="navbar_search_input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="navbar_search_clear"
                >
                  <X size={14} />
                </button>
              )}
            </form>
          </div>
        )}
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="navbar_mobile_drawer">
          <div
            className="navbar_mobile_backdrop"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="navbar_mobile_panel">
            <ul className="navbar_mobile_list">
              {[
                { to: "/products", label: "Shop" },
                { to: "/categories", label: "Categories" },
                { to: "/about", label: "Our Story" },
                { to: "/contact", label: "Contact" },
                { to: "/favorites", label: "Favorites" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="navbar_mobile_link"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="navbar_mobile_dot" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
