import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios.js";
import { useAuth } from "../context/authContext";
import "../styles/accueilCategories.css";

import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

function Accueil({ children, role }) {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const logOut = async () => {
    await logout();
    navigate("/login");
  };

  const to_products_plants = () => {
    navigate('/products');
  }

  return (
    <>
      <Navbar />
      <h1>Accueil</h1>
      <button
        style={{
          padding: "15px",
          backgroundColor: "lightgreen",
          color: "white",
          borderRadius: "5%",
          maxWidth: "100px",
          marginBottom: "50px",
        }}
        onClick={() => navigate("/products")}
      >
        Shop
      </button>
      <br />
      <div className="categories_container">
        <div className="categories categories_plant">
          <p>Arbres et arbres fruitiers</p>
          <button className="categorie_btn" onClick={() => navigate('/categories/plant/products')} >Shop</button>
        </div>

        <div className="categories categories_flower">
          <p>Fleurs</p>
          <button className="categorie_btn" onClick={() => navigate('/categories/flower/products')} >Shop</button>
        </div>

        <div className="categories categories_vase">
          <p>Vase</p>
          <button className="categorie_btn" onClick={() => navigate('/categories/vase/products')} >Shop</button>
        </div>

        <div className="categories categories_grass">
          <p>Gazon Naturel / Artificiel</p>
          <button className="categorie_btn" onClick={() => navigate('/categories/grass/products')} >Shop</button>
        </div>

        <div className="categories categories_service">
          <p>Notre service</p>
          <button className="categorie_btn" onClick={() => navigate('/categories/service/products')} >Shop</button>
        </div>

        <div className="categories categories_soil">
          <p>Soil</p>
          <button className="categorie_btn" onClick={() => navigate('/categories/soil/products')} >Shop</button>
        </div>
      </div>
      <br />
      <button
        style={{
          padding: "15px",
          backgroundColor: "red",
          color: "white",
          borderRadius: "5%",
          maxWidth: "100px",
          marginBottom: "50px",
        }}
        type="submit"
        onClick={logOut}
        disabled={loading}
      >
        {loading ? "logging out..." : "Log Out"}
      </button>
      <Footer />
    </>
  );
}

export default Accueil;
