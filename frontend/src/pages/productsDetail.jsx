import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/productsDetail.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

function ProductsDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  if (!product) return <p>Loding ...</p>;

  return (
    <>
      <Navbar />
      <h1>detail product</h1>

      <div className="product">
        <div className="left_side">
          <img
            src={`http://localhost:8000/storage/${product.image}`}
            alt={product.name}
            style={{ borderRadius: "15px", width: "600px", height: "700px" }}
          />
        </div>
        <div className="right_side">
          <h2>Name: {product.name}</h2>
          <p>Description: {product.description}</p>
          <p>
            Price: {product.price}-{product.currency}
          </p>
          <p>Promo_price: {product.promo_price}</p>
          <p>Status: {product.status}</p>
          <p>Is-featured: {product.is_featured}</p>
          <p>Color: {product.color}</p>
          <p>Origin: {product.origin}</p>
          <p>Is-indoor: {product.is_indoor}</p>
        </div>
      </div>

      <Link to="/products">Return to products page </Link>
      <Footer />
    </>
  );
}

export default ProductsDetail;
