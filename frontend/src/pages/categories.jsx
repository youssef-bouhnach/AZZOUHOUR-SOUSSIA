import { useEffect, useState } from "react";
import axios from "../config/api";
import { useNavigate } from "react-router-dom";
import "../styles/categories.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data.categories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Navbar />
      <main className="page_content">
        {loading ? (
          <p className="loading">Loading categories...</p>
        ) : (
          <div className="categories_container">
            {categories.map((cat) => (
              <div key={cat.id} className="category_card" style={{ backgroundImage: `url(/assets/categories/categorie_${cat.slug}.jfif)` }}>
                <div className="overlay"></div>
                <div className="content">
                  <h2>{cat.name}</h2>
                  <button onClick={() => navigate(`/categories/${cat.slug}/products`)}>Shop</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Categories;
