import axios, { getImageUrl } from "../config/api";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useFavorite } from "../context/favoriteContext";
import "../styles/productsDetail.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/GreenFooter.jsx";

/* ── Heart SVG ── */
function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="pd_heart_svg">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        fill={filled ? "#ef4444" : "none"}
        stroke={filled ? "#ef4444" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Cart icon ── */
function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="pd_btn_icon">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

/* ── Arrow back ── */
function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

const STATUS_MAP = {
  available: { label: "En stock", cls: "pd_badge_available" },
  out_of_stock: { label: "Rupture de stock", cls: "pd_badge_out" },
  coming_soon: { label: "Bientôt disponible", cls: "pd_badge_soon" },
};

function ProductsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorite();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartStatus, setCartStatus] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => {
        const p = res.data.product;
        setProduct(p);
        // auto-select first variant if any
        if (p.variants && p.variants.length > 0) {
          setSelectedVariant(p.variants[0]);
        }
      })
      .catch(console.error);
  }, [id]);

  const handleAddToCart = async () => {
    if (cartStatus === "loading") return;
    setCartStatus("loading");
    setCartMessage("");
    try {
      await addToCart(product, quantity, selectedVariant?.id ?? null);
      setCartStatus("success");
      setCartMessage(t('productDetail.added'));
    } catch (err) {
      setCartStatus("error");
      setCartMessage(err.response?.data?.message || t('productDetail.addError'));
    }
  };

  const liked = product ? isFavorite(product.id) : false;

  /* ── Loading skeleton ── */
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="pd_skeleton_page">
          <div className="pd_skeleton_img" />
          <div className="pd_skeleton_body">
            <div className="pd_skeleton_line pd_skeleton_title" />
            <div className="pd_skeleton_line" />
            <div className="pd_skeleton_line pd_skeleton_short" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const status = STATUS_MAP[product.status] || { label: product.status, cls: "" };

  // If a variant is selected, its price and stock take priority
  const hasVariants = product.variants && product.variants.length > 0;
  const activeStock = selectedVariant ? selectedVariant.stock : product.stock;
  const hasPromo = !selectedVariant && !!product.promo_price;
  const price = selectedVariant
    ? selectedVariant.price
    : (product.promo_price ?? product.price);

  /* Build a human-readable label for each variant */
  const variantLabel = (v) => {
    const parts = [];
    if (v.size)     parts.push(v.size);
    if (v.diameter) parts.push(`Ø ${v.diameter} cm`);
    if (v.height)   parts.push(`H ${v.height} m`);
    if (v.weight)   parts.push(`${v.weight} kg`);
    if (v.duration) parts.push(v.duration);
    return parts.length ? parts.join(" · ") : `Variante #${v.id}`;
  };

  return (
    <>
      <Navbar />

      <div className="pd_page">

        {/* Back button */}
        <div className="pd_back_wrap">
          <button className="pd_back_btn" onClick={() => navigate(-1)}>
            <ArrowIcon /> Retour
          </button>
        </div>

        <div className="pd_layout">

          {/* ── LEFT — image ── */}
          <div className="pd_img_col">
            <div className="pd_img_wrap">
              {!imgLoaded && <div className="pd_img_placeholder" />}
              <img
                src={product.image ? getImageUrl(product.image) : "/placeholder.svg"}
                alt={product.name}
                className={`pd_img ${imgLoaded ? "pd_img_loaded" : ""}`}
                onLoad={() => setImgLoaded(true)}
              />
              {/* Favorite pill on image */}
            </div>
          </div>

          {/* ── RIGHT — info ── */}
          <div className="pd_info_col">

            {/* Status badge */}
            <span className={`pd_badge ${status.cls}`}>{status.label}</span>

            {/* Name */}
            <h1 className="pd_name">{product.name}</h1>

            {/* Price */}
            <div className="pd_price_row">
              <span className={`pd_price ${hasPromo ? "pd_price_promo" : ""}`}>
                {price} {product.currency || "MAD"}
              </span>
              {hasPromo && (
                <span className="pd_price_original">{product.price} MAD</span>
              )}
              {hasPromo && <span className="pd_discount_badge">Promo</span>}
              {selectedVariant && (
                <span className="pd_variant_price_note">prix de la variante</span>
              )}
            </div>

            {/* Variants dropdown */}
            {hasVariants && (
              <div className="pd_variant_wrap">
                <label className="pd_variant_label">Variante</label>
                <select
                  className="pd_variant_select"
                  value={selectedVariant?.id ?? ""}
                  onChange={(e) => {
                    const v = product.variants.find((v) => v.id === Number(e.target.value));
                    setSelectedVariant(v || null);
                    setQuantity(1);
                  }}
                >
                  {product.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {variantLabel(v)} — {v.price} {product.currency || "MAD"}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="pd_desc">{product.description}</p>
            )}

            {/* Meta grid */}
            <div className="pd_meta_grid">
              {product.color && <div className="pd_meta_item"><span className="pd_meta_label">Couleur</span><span className="pd_meta_val">{product.color}</span></div>}
              {product.origin && <div className="pd_meta_item"><span className="pd_meta_label">Origine</span><span className="pd_meta_val">{product.origin}</span></div>}
              <div className="pd_meta_item">
                <span className="pd_meta_label">Emplacement</span>
                <span className="pd_meta_val">{product.is_indoor ? "Intérieur " : "Extérieur "}</span>
              </div>
              <div className="pd_meta_item">
                <span className="pd_meta_label">Stock</span>
                <span className="pd_meta_val">{activeStock > 0 ? "disponibles" : "Épuisé"}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="pd_divider" />

            {/* Quantity + actions */}
            <div className="pd_actions">
              {/* Quantity selector */}
              <div className="pd_qty">
                <button
                  className="pd_qty_btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Diminuer"
                >−</button>
                <span className="pd_qty_val">{quantity}</span>
                <button
                  className="pd_qty_btn"
                  onClick={() => setQuantity((q) => Math.min(activeStock, q + 1))}
                  disabled={quantity >= activeStock}
                  aria-label="Augmenter"
                >+</button>
              </div>

              {/* Add to cart */}
              <button
                className="pd_cart_btn"
                onClick={handleAddToCart}
                disabled={cartStatus === "loading" || activeStock === 0}
              >
                <CartIcon />
                {activeStock === 0
                  ? "Rupture de stock"
                  : cartStatus === "loading"
                    ? "Ajout en cours..."
                    : "Ajouter au panier"}
              </button>

              {/* Favorite standalone button */}
              <button
                className={`pd_fav_btn ${liked ? "pd_fav_btn_active" : ""}`}
                onClick={() => toggleFavorite(product.id)}
                aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
                title={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <HeartIcon filled={liked} />
              </button>
            </div>

            {/* Cart feedback */}
            {cartMessage && (
              <p className={`pd_feedback pd_feedback_${cartStatus}`}>{cartMessage}</p>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductsDetail;
