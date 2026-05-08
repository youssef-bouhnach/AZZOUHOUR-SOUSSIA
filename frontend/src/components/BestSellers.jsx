import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { STORAGE_URL } from "../config/api";
import "../styles/bestSellers.css";

function BestSellers() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        const all = res.data.products || res.data || [];
        // Show up to 4 products as "best sellers"
        setProducts(all.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bs_section">
        <div className="bs_container">
          <div className="bs_header">
            <h2 className="bs_title">Best Sellers</h2>
          </div>
          <div className="bs_grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bs_skeleton" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="bs_section">
      <div className="bs_container">

        {/* Header row */}
        <div className="bs_header">
          <h2 className="bs_title">Best Sellers</h2>
          <button
            className="bs_view_all"
            onClick={() => navigate("/products")}
          >
            SHOP ALL BEST-SELLERS →
          </button>
        </div>

        {/* Product grid */}
        <div className="bs_grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="bs_card"
              onClick={() => navigate(`/products/detail/${product.id}`)}
            >
              {/* Image */}
              <div className="bs_card_img_wrap">
                <img
                  src={
                    product.image
                      ? `${STORAGE_URL}/${product.image}`
                      : "/placeholder.svg"
                  }
                  alt={product.name}
                  className="bs_card_img"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="bs_card_body">
                <p className="bs_card_name">{product.name}</p>
                <p className="bs_card_price">{product.price} MAD</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BestSellers;
