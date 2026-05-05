import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../lib/axios";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

function CategoriesProducts() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoding ] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/categorie/${slug}/products`,
        );
        const response = res.data.products;
        setProducts(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoding(false);
      }
    };
    fetchProducts();
  }, [slug]);

  if (loading) return <p className="loading">Loading {slug} category ...</p>;

  return (
    <> 
      <Navbar />
      <h1>Category: {slug}</h1>
      {products.map((p) => (
        <div key={p.id}>
          <br />
          <h1>{p.name}</h1>
          <h1> {p.description} </h1>
          <br />
        </div>
      ))}
      <button onClick={() => navigate('/categories')} style={{backgroundColor: 'lightgreen', padding: '15px', borderRadius: '15px', width: '100px'}} >
        All Categories
      </button>
      <Footer />
    </>
  );
}

export default CategoriesProducts;
