// let's goo with the all product page !

import { useState, useEffect } from "react";
import axios from "../lib/axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigate = useNavigate(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products");
        const response = res.data.products; 
        setProducts(response);
        console.log(products);
      } catch (error) {
        console.log("err: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleShow = (id) => {
    navigate(`/products/detail/${id}`);
  };

  return (
    <>
      <Navbar />
      <h1>Products</h1>
      {loading && <p>Loading products...</p>}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div key={product.id} style={{width: "270px"}} >
            <img
              src={`http://localhost:8000/storage/${product.image}`}
              alt={product.name}
              style={{ width: "250px", height: "300px", borderRadius: "15px", display: "block", margin: '0 auto' }}
            />
            <p>name: {product.name}</p>
            <p>description: {product.description}</p>
            <p>price: {product.price}</p>
            <div>
              <button
                onClick={() => handleShow(product.id)}
                style={{
                  width: "30%",
                  padding: "5px",
                  borderRadius: "5px",
                  backgroundColor: "lightblue",
                  color: "black",
                }}
              >
                Show
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/Accueil">back to Accueil</Link>
      <Footer />
    </>
  );
}

export default Products;
