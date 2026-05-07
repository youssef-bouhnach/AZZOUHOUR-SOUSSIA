import { useEffect, useState, useRef } from "react";
import axios from "../config/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/GreenFooter.jsx";
import "../styles/categories.css";

/* ── Static descriptions ── */
const META = {
  flower: {
    label: "Fleurs",
    icon: "🌸",
    desc: "Roses, tulipes, pivoines et fleurs sauvages — fraîches et séchées, soigneusement sélectionnées.",
  },
  grass: {
    label: "Gazon",
    icon: "🌿",
    desc: "Graines et rouleaux résistants à la chaleur marocaine pour un tapis vert dense et durable.",
  },
  service: {
    label: "Services",
    icon: "🛠️",
    desc: "Entretien, livraison, consultation et aménagement paysager par des experts passionnés.",
  },
  vase: {
    label: "Vases",
    icon: "🏺",
    desc: "Céramique, verre soufflé et poterie artisanale — du contemporain à l'authentique marocain.",
  },
  plant: {
    label: "Plantes",
    icon: "🌱",
    desc: "Succulentes, tropicales et arbustes florissants cultivés dans des conditions optimales.",
  },
  soil: {
    label: "Turbe & Sol",
    icon: "🪨",
    desc: "Substrats enrichis et terreaux spécialisés pour une croissance saine et vigoureuse.",
  },
};

const WHY_US = [
  { icon: "🌱", title: "Cultivé avec soin",    desc: "Chaque plante est élevée dans des conditions optimales avant de vous être livrée." },
  { icon: "🚚", title: "Livraison rapide",      desc: "Livraison à domicile partout au Maroc, soigneusement emballée pour protéger vos plantes." },
  { icon: "💬", title: "Conseil expert",        desc: "Notre équipe de jardiniers passionnés vous accompagne à chaque étape de votre projet." },
  { icon: "♻️", title: "Éco-responsable",       desc: "Pratiques durables, sans pesticides, pour un jardin sain et respectueux de l'environnement." },
];

const TESTIMONIALS = [
  { name: "Fatima Z.",   city: "Casablanca", stars: 5, text: "Des plantes magnifiques, livrées en parfait état. Le service client est exceptionnel !" },
  { name: "Karim M.",    city: "Marrakech",  stars: 5, text: "J'ai commandé du gazon et le résultat est bluffant. Mon jardin est méconnaissable." },
  { name: "Nadia B.",    city: "Rabat",      stars: 5, text: "Les vases artisanaux sont de toute beauté. Je recommande vivement à tous mes amis." },
  { name: "Youssef A.",  city: "Agadir",     stars: 5, text: "Équipe professionnelle, conseils personnalisés et livraison dans les délais. Parfait !" },
];

/* ── Intersection observer hook for scroll reveal ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Category Card ── */
function CategoryCard({ cat, index }) {
  const navigate = useNavigate();
  const info = META[cat.slug] || { label: cat.name, icon: "🌿", desc: cat.description || "" };
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`ccat_card ${visible ? "ccat_card_visible" : ""}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
      onClick={() => navigate(`/categories/${cat.slug}/products`)}
    >
      {/* Image */}
      <div className="ccat_card_img_wrap">
        <img
          src={`/assets/categories/categorie_${cat.slug}.jfif`}
          alt={info.label}
          className="ccat_card_img"
          loading="lazy"
        />
        <div className="ccat_card_img_overlay" />
        {/* Icon badge */}
        <span className="ccat_card_icon">{info.icon}</span>
      </div>

      {/* Body */}
      <div className="ccat_card_body">
        <h3 className="ccat_card_title">{info.label}</h3>
        <p className="ccat_card_desc">{info.desc}</p>
        <span className="ccat_card_btn">
          Explorer <span className="ccat_card_arrow">→</span>
        </span>
      </div>
    </div>
  );
}

/* ── Main page ── */
function Categories() {
  const [categories, setCategories] = useState([]);
  const [filtered,   setFiltered]   = useState([]);
  const [loading,    setLoading]     = useState(true);
  const [search,     setSearch]      = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => {
        const cats = res.data.categories || [];
        setCategories(cats);
        setFiltered(cats);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* Live search filter */
  useEffect(() => {
    const q = search.toLowerCase().trim();
    setFiltered(
      q
        ? categories.filter((c) => {
            const info = META[c.slug] || {};
            return (
              c.name.toLowerCase().includes(q) ||
              (info.label || "").toLowerCase().includes(q) ||
              (info.desc  || "").toLowerCase().includes(q)
            );
          })
        : categories
    );
  }, [search, categories]);

  const [whyRef, whyVisible]       = useReveal();
  const [testiRef, testiVisible]   = useReveal();
  const [ctaRef, ctaVisible]       = useReveal();

  return (
    <>
      <Navbar />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="ccat_hero">
        <div className="ccat_hero_bg" />
        <div className="ccat_hero_overlay" />

        {/* Floating orbs */}
        <div className="ccat_hero_orb ccat_hero_orb1" />
        <div className="ccat_hero_orb ccat_hero_orb2" />

        <div className="ccat_hero_content">
          <span className="ccat_hero_badge">✦ AZZOUHOUR-SOUSSIA</span>
          <h1 className="ccat_hero_title">
            Nos <em>Collections</em><br />Botaniques
          </h1>
          <p className="ccat_hero_sub">
            Des fleurs sauvages aux sols enrichis — tout ce dont votre jardin a besoin,
            cultivé avec soin depuis la Vallée du Souss.
          </p>
          <div className="ccat_hero_ctas">
            <button className="ccat_hero_btn_primary" onClick={() => navigate("/products")}>
              Voir tous les produits
            </button>
            <button className="ccat_hero_btn_outline" onClick={() => navigate("/contact")}>
              Nous contacter
            </button>
          </div>

          {/* Stats */}
          <div className="ccat_hero_stats">
            {[["12k+","Jardins créés"],["98%","Plantes saines"],["6","Catégories"],["7j","Garantie"]].map(([v,l]) => (
              <div key={l} className="ccat_hero_stat">
                <span className="ccat_hero_stat_val">{v}</span>
                <span className="ccat_hero_stat_lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="ccat_hero_wave" aria-hidden>
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
            <path d="M0 80 C480 0 960 0 1440 80 L1440 80 L0 80 Z" fill="#f4f6f4"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════
          SEARCH + CATEGORIES GRID
      ══════════════════════════════ */}
      <section className="ccat_section">
        <div className="ccat_container">

          {/* Section heading */}
          <div className="ccat_section_head">
            <p className="ccat_section_eyebrow">Nos catégories</p>
            <h2 className="ccat_section_title">Explorez notre univers végétal</h2>
            <p className="ccat_section_sub">
              Chaque catégorie est une invitation à transformer votre espace de vie.
            </p>
          </div>

          {/* Search bar */}
          <div className="ccat_search_wrap">
            <span className="ccat_search_icon">🔍</span>
            <input
              type="text"
              className="ccat_search"
              placeholder="Rechercher une catégorie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="ccat_search_clear" onClick={() => setSearch("")}>✕</button>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="ccat_loading">
              <div className="ccat_spinner" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="ccat_empty">
              <p>Aucune catégorie trouvée pour « {search} »</p>
              <button onClick={() => setSearch("")}>Réinitialiser</button>
            </div>
          ) : (
            <div className="ccat_grid">
              {filtered.map((cat, i) => (
                <CategoryCard key={cat.id} cat={cat} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════ */}
      <section className="ccat_why" ref={whyRef}>
        <div className="ccat_container">
          <div className="ccat_section_head">
            <p className="ccat_section_eyebrow">Pourquoi nous choisir</p>
            <h2 className="ccat_section_title">L'excellence à chaque étape</h2>
          </div>
          <div className={`ccat_why_grid ${whyVisible ? "ccat_reveal" : ""}`}>
            {WHY_US.map((w, i) => (
              <div key={w.title} className="ccat_why_card" style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="ccat_why_icon">{w.icon}</span>
                <h3 className="ccat_why_title">{w.title}</h3>
                <p className="ccat_why_desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          TESTIMONIALS
      ══════════════════════════════ */}
      <section className="ccat_testi" ref={testiRef}>
        <div className="ccat_container">
          <div className="ccat_section_head">
            <p className="ccat_section_eyebrow">Témoignages</p>
            <h2 className="ccat_section_title">Ce que disent nos clients</h2>
          </div>
          <div className={`ccat_testi_grid ${testiVisible ? "ccat_reveal" : ""}`}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="ccat_testi_card" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="ccat_testi_stars">{"★".repeat(t.stars)}</div>
                <p className="ccat_testi_text">"{t.text}"</p>
                <div className="ccat_testi_author">
                  <div className="ccat_testi_avatar">{t.name[0]}</div>
                  <div>
                    <p className="ccat_testi_name">{t.name}</p>
                    <p className="ccat_testi_city">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA BANNER
      ══════════════════════════════ */}
      <section className="ccat_cta" ref={ctaRef}>
        <div className={`ccat_cta_inner ${ctaVisible ? "ccat_reveal" : ""}`}>
          <div className="ccat_cta_orb1" />
          <div className="ccat_cta_orb2" />
          <div className="ccat_cta_content">
            <span className="ccat_cta_badge">🌿 Prêt à transformer votre jardin ?</span>
            <h2 className="ccat_cta_title">Parlons de votre projet</h2>
            <p className="ccat_cta_sub">
              Notre équipe d'experts est disponible pour vous conseiller et créer le jardin de vos rêves.
            </p>
            <div className="ccat_cta_btns">
              <button className="ccat_cta_btn_primary" onClick={() => navigate("/contact")}>
                Contacter notre équipe →
              </button>
              <button className="ccat_cta_btn_outline" onClick={() => navigate("/products")}>
                Parcourir les produits
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Categories;
