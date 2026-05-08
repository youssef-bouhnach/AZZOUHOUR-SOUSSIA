import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { STORAGE_URL } from "../config/api";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/GreenFooter.jsx";
import "../styles/productCard.css";

function CategoriesProducts() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/categories/${slug}/products`);
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  return (
    <>
      <Navbar />
      <main className="page_content">
        <div className="category_page_header">
          <h1>{slug}</h1>
          <button className="all_products_btn" onClick={() => navigate("/products")}>All Products</button>
        </div>
        {loading ? (
          <p className="no_products">Loading {slug} products...</p>
        ) : products.length === 0 ? (
          <p className="no_products">No products found in this category.</p>
        ) : (
          <div className="products_grid">
            {products.map((product) => (
              <div key={product.id} className="product_card" onClick={() => navigate(`/products/detail/${product.id}`)}>
                <img src={`${STORAGE_URL}/${product.image}`} alt={product.name} className="product_card_img" />
                <div className="product_card_body">
                  <p className="product_card_name">{product.name}</p>
                  <p className="product_card_desc">{product.description}</p>
                  <p className="product_card_price">
                    {product.promo_price ? (
                      <><span className="original">{product.price}</span><span className="promo">{product.promo_price} {product.currency}</span></>
                    ) : (<>{product.price} {product.currency}</>)}
                  </p>
                  <button className="product_card_btn" onClick={(e) => { e.stopPropagation(); navigate(`/products/detail/${product.id}`); }}>View Product</button>
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

export default CategoriesProducts;
