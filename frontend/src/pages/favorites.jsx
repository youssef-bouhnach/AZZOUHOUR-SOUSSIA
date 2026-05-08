import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, Loader2, Plus } from "lucide-react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/GreenFooter.jsx";
import axios from "../config/api";
import { useCart } from "../context/cartContext";
import { useFavorite } from "../context/favoriteContext";
import { useAuth } from "../context/authContext";
import "../styles/favorites.css";

function Favorites() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { favoriteIds, toggleFavorite } = useFavorite();

  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  // Fetch full product details whenever favoriteIds changes
  useEffect(() => {
    if (favoriteIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    if (user) {
      // Logged in: fetch from server (returns full product objects)
      setLoading(true);
      axios
        .get("/api/favorites")
        .then((res) => setProducts(res.data.favorites || []))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      // Guest: fetch all products and filter by saved ids
      setLoading(true);
      axios
        .get("/api/products")
        .then((res) => {
          const all = res.data.products || [];
          setProducts(all.filter((p) => favoriteIds.includes(p.id)));
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [favoriteIds, user]);

  const handleRemove = (productId) => {
    toggleFavorite(productId);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <>
      <Navbar />

      <div className="fav_page">
        <div className="fav_container">

          {/* Header */}
          <div className="fav_header">
            <div>
              <h1 className="fav_title">
                <Heart className="fav_title_icon" />
                Mes Favoris
              </h1>
              <p className="fav_subtitle">
                {products.length} produit{products.length !== 1 ? "s" : ""} sauvegardé{products.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="fav_loading">
              <Loader2 className="fav_spinner" size={40} />
            </div>
          ) : products.length === 0 ? (
            <div className="fav_empty">
              <div className="fav_empty_icon_wrap">
                <Heart className="fav_empty_icon" size={56} />
              </div>
              <h2 className="fav_empty_title">Aucun favori pour l'instant</h2>
              <p className="fav_empty_sub">
                Sauvegardez les produits que vous aimez en cliquant sur{" "}
                <Heart size={14} className="fav_inline_heart" /> sur n'importe quelle fiche produit
              </p>
              <button
                className="fav_browse_btn"
                onClick={() => navigate("/products")}
              >
                Parcourir la boutique
              </button>
            </div>
          ) : (
            <div className="fav_grid">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="fav_card"
                  onClick={() => navigate(`/products/detail/${product.id}`)}
                >
                  {/* Image */}
                  <div className="fav_card_img_wrap">
                    <img
                      src={
                        product.image
                          ? `${import.meta.env.VITE_APP_URL ?? "http://localhost:8000"}/storage/${product.image}`
                          : "/placeholder.svg"
                      }
                      alt={product.name}
                      className="fav_card_img"
                    />
                    {/* Remove button */}
                    <button
                      className="fav_remove_btn"
                      onClick={(e) => { e.stopPropagation(); handleRemove(product.id); }}
                      aria-label="Retirer des favoris"
                    >
                      <Heart size={14} fill="currentColor" />
                    </button>
                    {product.category && (
                      <span className="fav_card_badge">{product.category}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="fav_card_body">
                    <h3 className="fav_card_name">{product.name}</h3>
                    <p className="fav_card_desc">
                      {product.description || "Aucune description disponible"}
                    </p>
                    <div className="fav_card_footer">
                      <span className="fav_card_price">{product.price} MAD</span>
                      <button
                        className="fav_add_btn"
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={product.stock === 0}
                      >
                        <Plus size={13} />
                        {product.stock === 0 ? "Rupture" : "Ajouter"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Favorites;
