import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { STORAGE_URL } from "../config/api";
import "../styles/delivery.css";

const NAV_ITEMS = [
  {
    to: "/delivery/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    to: "/delivery/orders",
    label: "My Orders",
    icon: (
      <svg className="nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    to: "/delivery/payment",
    label: "Payment",
    icon: (
      <svg className="nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
];

const BREADCRUMB_MAP = {
  "/delivery/dashboard": "Dashboard",
  "/delivery/orders":    "My Orders",
  "/delivery/payment":   "Payment",
};

export default function DeliveryLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  // resolve breadcrumb label (handles /delivery/orders/:id/status too)
  const baseKey = Object.keys(BREADCRUMB_MAP).find((k) => pathname.startsWith(k));
  const pageLabel = BREADCRUMB_MAP[baseKey] ?? "Delivery";

  return (
    <div className="delivery-layout">

      {/* ── Sidebar ── */}
      <aside className="delivery-sidebar">

        {/* Brand */}
        <div className="delivery-sidebar-brand">
          <div className="delivery-brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
              <rect x="9" y="11" width="14" height="10" rx="1" />
              <circle cx="12" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
            </svg>
          </div>
          <span className="delivery-brand-name">Delivery Panel</span>
        </div>

        {/* Nav */}
        <nav className="delivery-sidebar-nav">
          {NAV_ITEMS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                "delivery-nav-link" + (isActive ? " active" : "")
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer — profile + logout */}
        <div className="delivery-sidebar-footer">
          <div className="delivery-profile-card">
            {user?.avatar ? (
              <img
                src={`${STORAGE_URL}/${user.avatar}`}
                alt={user.name}
                className="delivery-profile-avatar"
              />
            ) : (
              <div className="delivery-profile-avatar delivery-profile-avatar--placeholder">
                {user?.name?.[0]?.toUpperCase() ?? "?"}
              </div>
            )}
            <div className="delivery-profile-info">
              <span className="delivery-profile-name">{user?.name ?? "Delivery Man"}</span>
              <span className="delivery-profile-role">Delivery Man</span>
            </div>
          </div>

          <button className="delivery-logout-btn" onClick={handleLogout}>
            <svg className="nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="delivery-main">

        {/* Top bar */}
        <header className="delivery-topbar">
          <div className="delivery-topbar-breadcrumb">
            <span>Delivery</span>
            <span className="delivery-topbar-sep">/</span>
            <span>{pageLabel}</span>
          </div>
        </header>

        {/* Page content */}
        <div className="delivery-content">
          {children}
        </div>
      </div>

    </div>
  );
}
