import axios, { STORAGE_URL } from "../config/api";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import "../styles/productsDetail.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

function ProductsDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartStatus, setCartStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setCartStatus("loading");
    setCartMessage("");

    try {
      // Pass full product so guest cart can store name/image/price
      await addToCart(product, quantity);
      setCartStatus("success");
      setCartMessage("Added to cart!");
    } catch (err) {
      setCartStatus("error");
      setCartMessage(err.response?.data?.message || "Failed to add to cart.");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <main className="page_content">
        <h1>detail product</h1>
        <div className="product">
          <div className="left_side">
            <img src={`${STORAGE_URL}/${product.image}`} alt={product.name} style={{ borderRadius: "15px", width: "600px", height: "700px" }} />
          </div>
          <div className="right_side">
            <h2>Name: {product.name}</h2>
            <p>Description: {product.description}</p>
            <p>
              Price:{" "}
              {product.promo_price ? (
                <>
                  <span style={{ textDecoration: "line-through", color: "#999" }}>{product.price}</span>{" "}
                  <span style={{ color: "#e44" }}>{product.promo_price}</span>
                </>
              ) : (product.price)}{" "}{product.currency}
            </p>
            <p>Status: {product.status}</p>
            <p>Color: {product.color}</p>
            <p>Origin: {product.origin}</p>
            <p>Is-indoor: {product.is_indoor ? "Yes" : "No"}</p>
            <div className="cart_actions">
              <div className="quantity_selector">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} disabled={quantity >= product.stock}>+</button>
              </div>
              <button className="add_to_cart_btn" onClick={handleAddToCart} disabled={cartStatus === "loading" || product.stock === 0}>
                {product.stock === 0 ? "Out of Stock" : cartStatus === "loading" ? "Adding..." : "Add to Cart 🛒"}
              </button>
            </div>
            {cartMessage && <p className={`cart_feedback ${cartStatus}`}>{cartMessage}</p>}
          </div>
        </div>
        <Link to="/products">Return to products page</Link>
      </main>
      <Footer />
    </>
  );
}

export default ProductsDetail;
