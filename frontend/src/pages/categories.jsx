import { useEffect, useState, useRef } from "react";
import axios from "../config/api";
import { useNavigate } from "react-router-dom";
import "../styles/categories.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/GreenFooter.jsx";

/* ── Per-slug metadata: icon SVG, accent color, bg color, description ── */
const CAT_META = {
  plant: {
    icon: (color) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
        <path d="M12 22V12" /><path d="M12 12C12 12 7 10 5 6c3 0 5.5 1.5 7 6z" /><path d="M12 12c0 0 5-2 7-6-3 0-5.5 1.5-7 6z" /><path d="M12 12C12 8 10 4 6 3c0 4 2.5 7 6 9z" />
      </svg>
    ),
    accent: "#4ade80",
    bg: "#0d2b1a",
    iconBg: "#0a2e14",
    iconColor: "#4ade80",
  },
  flower: {
    icon: (color) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z" />
        <path d="M12 14a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z" />
        <path d="M2 12a4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
        <path d="M14 12a4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
      </svg>
    ),
    accent: "#f472b6",
    bg: "#2b0d1a",
    iconBg: "#2e0a1a",
    iconColor: "#f472b6",
  },
  soil: {
    icon: (color) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    accent: "#fb923c",
    bg: "#2b1a0d",
    iconBg: "#2e1a0a",
    iconColor: "#fb923c",
  },
  vase: {
    icon: (color) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
        <path d="M8 3h8l1 7H7L8 3z" /><path d="M7 10c0 5 2 9 5 9s5-4 5-9" /><line x1="12" y1="19" x2="12" y2="21" /><line x1="9" y1="21" x2="15" y2="21" />
      </svg>
    ),
    accent: "#a78bfa",
    bg: "#1a0d2b",
    iconBg: "#1e0a2e",
    iconColor: "#a78bfa",
  },
  service: {
    icon: (color) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M4.93 4.93a10 10 0 0 0 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M8.46 8.46a5 5 0 0 0 0 7.07" />
      </svg>
    ),
    accent: "#38bdf8",
    bg: "#0d1f2b",
    iconBg: "#0a1e2e",
    iconColor: "#38bdf8",
  },
  grass: {
    icon: (color) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
        <path d="M2 22c1-4 4-7 10-7s9 3 10 7" /><path d="M6 15c0-4 2-7 6-9" /><path d="M18 15c0-4-2-7-6-9" />
      </svg>
    ),
    accent: "#86efac",
    bg: "#0d2b12",
    iconBg: "#0a2e10",
    iconColor: "#86efac",
  },
};

/* Fallback for unknown slugs */
const DEFAULT_META = {
  icon: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  accent: "#facc15",
  bg: "#1a1a0d",
  iconBg: "#1e1e0a",
  iconColor: "#facc15",
};

/* ── Intersection Observer hook for scroll-in animation ── */
function useVisible(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

/* ── Single category card ── */
function CategoryCard({ cat, index, onClick }) {
  const ref = useRef(null);
  const visible = useVisible(ref);
  const meta = CAT_META[cat.slug] || DEFAULT_META;
  const isEven = index % 2 === 0; // even → icon left, odd → icon right

  return (
    <div
      ref={ref}
      className={`ccat_card ${visible ? "ccat_card_visible" : ""}`}
      style={{ background: meta.bg, animationDelay: `${index * 80}ms` }}
      onClick={onClick}
    >
      {/* Icon panel — left on even, right on odd */}
      {isEven && (
        <div className="ccat_icon_panel" style={{ background: meta.iconBg }}>
          {meta.icon(meta.iconColor)}
        </div>
      )}

      {/* Text body */}
      <div className="ccat_body">
        <div className="ccat_accent_line" style={{ background: meta.accent }} />
        <h2 className="ccat_title">{cat.name}</h2>
        {cat.products_count !== undefined && (
          <p className="ccat_count">{cat.products_count} produit{cat.products_count !== 1 ? "s" : ""}</p>
        )}
        {cat.description && (
          <p className="ccat_desc">{cat.description}</p>
        )}
        <button className="ccat_btn" onClick={(e) => { e.stopPropagation(); onClick(); }}>
          Shop now <span className="ccat_arrow">→</span>
        </button>
      </div>

      {/* Icon panel — right on odd */}
      {!isEven && (
        <div className="ccat_icon_panel" style={{ background: meta.iconBg }}>
          {meta.icon(meta.iconColor)}
        </div>
      )}
    </div>
  );
}

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <div className="ccat_card ccat_skeleton">
      <div className="ccat_icon_panel ccat_skel_box" />
      <div className="ccat_body">
        <div className="ccat_skel_line ccat_skel_title" />
        <div className="ccat_skel_line ccat_skel_sub" />
        <div className="ccat_skel_line ccat_skel_short" />
      </div>
    </div>
  );
}

/* ── Page ── */
function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/categories")
      .then((res) => setCategories(res.data.categories || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="ccat_page">
        {/* Page header */}
        <div className="ccat_header">
          <p className="ccat_eyebrow">✦ AZZOUHOUR-SOUSSIA</p>
          <h1 className="ccat_heading">Nos Catégories</h1>
          <p className="ccat_subheading">
            Explorez notre sélection de plantes, sols, vases, services et bien plus.
          </p>
        </div>

        {/* Cards */}
        <div className="ccat_list">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : categories.map((cat, i) => (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  index={i}
                  onClick={() => navigate(`/categories/${cat.slug}/products`)}
                />
              ))
          }
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Categories;
