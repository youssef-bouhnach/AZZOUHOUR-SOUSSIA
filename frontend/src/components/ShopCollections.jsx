import { useNavigate } from "react-router-dom";
import "../styles/shopCollections.css";

const collections = [
  {
    slug: "plant",
    title: "Trees & Fruit Trees",
    label: "SHOP PLANTS",
    image: "/assets/categories/categorie_plant.jfif",
  },
  {
    slug: "grass",
    title: "Natural & Artificial Grass",
    label: "SHOP GRASS",
    image: "/assets/categories/categorie_grass.jfif",
  },
  {
    slug: "vase",
    title: "Vases & Pots",
    label: "SHOP VASES",
    image: "/assets/categories/categorie_vase.jfif",
  },
];

function ShopCollections() {
  const navigate = useNavigate();

  return (
    <section className="sc_section">
      <div className="sc_container">

        {/* Heading */}
        <h2 className="sc_title">
          Shop Your <em className="sc_title_em">Favorite Collections</em>
        </h2>

        {/* 3-column card grid */}
        <div className="sc_grid">
          {collections.map((col) => (
            <div
              key={col.slug}
              className="sc_card"
              onClick={() => navigate(`/categories/${col.slug}/products`)}
            >
              {/* Background image */}
              <img
                src={col.image}
                alt={col.title}
                className="sc_card_img"
                loading="lazy"
              />

              {/* Dark overlay */}
              <div className="sc_card_overlay" />

              {/* Text content */}
              <div className="sc_card_content">
                <h3 className="sc_card_title">{col.title}</h3>
                <button className="sc_card_btn">{col.label}</button>
              </div>
            </div>
          ))}
        </div>

        {/* All categories CTA */}
        <div className="sc_footer">
          <button
            className="sc_all_btn"
            onClick={() => navigate("/categories")}
          >
            View All Categories →
          </button>
        </div>

      </div>
    </section>
  );
}

export default ShopCollections;
