import { useEffect, useState } from "react";
import axios from "../config/api";
import { useNavigate } from "react-router-dom";
import "../styles/categories1.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/GreenFooter.jsx";

function Categories1() {
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
      <main className="c1_page">

        <div className="c1_header">
          <h1 className="c1_heading">Nos Catégories</h1>
          <p className="c1_subheading">
            Explorez notre sélection de plantes, sols, vases, services et bien plus.
          </p>
        </div>

        <ul className="c1_list">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="c1_card c1_skeleton" />
            ))
          ) : (
            categories.map((cat, index) => (
              <li
                key={cat.id}
                className={`c1_card${index % 2 !== 0 ? " c1_reverse" : ""}`}
                onClick={() => navigate(`/categories/${cat.slug}/products`)}
              >
                <div className="c1_img">
                  {cat.image
                    ? <img src={cat.image} alt={cat.name} />
                    : <div className="c1_img_placeholder" />
                  }
                </div>
                <div className="c1_body">
                  <h2 className="c1_title">{cat.name}</h2>
                  {cat.products_count !== undefined && (
                    <p className="c1_count">
                      {cat.products_count} produit{cat.products_count !== 1 ? "s" : ""}
                    </p>
                  )}
                  {cat.description && (
                    <p className="c1_desc">{cat.description}</p>
                  )}
                  <span className="c1_arrow">Voir les produits →</span>
                </div>
              </li>
            ))
          )}
        </ul>

      </main>
      <Footer />
    </>
  );
}

export default Categories1;