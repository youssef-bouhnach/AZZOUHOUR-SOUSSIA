import { useState, useEffect } from "react";
import axios, { getImageUrl } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "../context/favoriteContext";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/GreenFooter.jsx";
import "../styles/products.css";

/* ── Heart SVG icon ── */
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fav_heart">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/* ── Single product card ── */
function ProductCard({ product, onView }) {
  const { isFavorite, toggleFavorite } = useFavorite();
  const liked = isFavorite(product.id);

  const displayPrice = product.promo_price ?? product.price;

  return (
    <div className="prod_card" onClick={() => onView(product.id)}>
      {/* Image */}
      <div className="prod_card_img_wrap">
        <img
          src={product.image ? getImageUrl(product.image) : "/placeholder.svg"}
          alt={product.name}
          className="prod_card_img"
          loading="lazy"
        />

        {/* Status badge */}
        <span className={`prod_card_status ${product.status}`}>
          {product.status === "available"   && "En stock"}
          {product.status === "out_of_stock" && "Rupture"}
          {product.status === "coming_soon"  && "Bientôt"}
        </span>

        {/* Favorite button */}
        <button
          className={`prod_fav_btn ${liked ? "prod_fav_active" : ""}`}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
          aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
          title={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <HeartIcon />
        </button>
      </div>

      {/* Body */}
      <div className="prod_card_body">
        <h3 className="prod_card_name">{product.name}</h3>
        <p className="prod_card_desc">{product.description || "Aucune description disponible."}</p>

        <div className="prod_card_footer">
          <div className="prod_card_price">
            <span className={`prod_card_price_main ${product.promo_price ? "promo" : ""}`}>
              {displayPrice} {product.currency || "MAD"}
            </span>
            {product.promo_price && (
              <span className="prod_card_price_original">{product.price} MAD</span>
            )}
          </div>
          <button
            className="prod_card_view_btn"
            onClick={(e) => { e.stopPropagation(); onView(product.id); }}
          >
            Voir →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ── */
function Products() {
  const [products, setProducts]   = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        const list = res.data.products || [];
        setProducts(list);
        setFiltered(list);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* Live search */
  useEffect(() => {
    const q = search.toLowerCase().trim();
    setFiltered(
      q
        ? products.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              (p.description || "").toLowerCase().includes(q) ||
              p.color.toLowerCase().includes(q)
          )
        : products
    );
  }, [search, products]);

  return (
    <>
      <Navbar />

      <div className="prod_page">
        {/* Header */}
        <div className="prod_header">
          <p className="prod_header_eyebrow">✦ AZZOUHOUR-SOUSSIA</p>
          <h1 className="prod_header_title">Tous nos produits</h1>
          <p className="prod_header_sub">
            Plantes, fleurs, gazon, vases et bien plus — cultivés avec soin depuis la Vallée du Souss.
          </p>
        </div>

        {/* Toolbar */}
        <div className="prod_toolbar" >
          <div className="prod_search_wrap">
            <span className="prod_search_icon"></span>
            <input
              type="text"
              className="prod_search"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* ///////////////////////////////////////_______________________________ */}
            {
              filtered.length > 0 ? 
              <button onClick={() => setSearch("")}>Réinitialiser</button>
              : ""
            }
          </div>
          {!loading && (
            <p className="prod_count">
              <strong>{filtered.length}</strong> produit{filtered.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="prod_loading">
            <div className="prod_spinner" />
            Chargement des produits...
          </div>
        ) : filtered.length === 0 ? (
          <div className="prod_empty" style={{height: '100vh'}}>
            <h3>Aucun produit trouvé</h3>
            <p>Essayez un autre terme de recherche.</p>
            <button onClick={() => setSearch("")}>Réinitialiser</button>
          </div>
        ) : (
          <div className="prod_grid">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={(id) => navigate(`/products/detail/${id}`)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Products;