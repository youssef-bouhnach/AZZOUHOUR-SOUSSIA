import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import GreenFooter from "../components/GreenFooter.jsx";
import BestSellers from "../components/BestSellers.jsx";
import ShopCollections from "../components/ShopCollections.jsx";
import OurStory from "../components/OurStory.jsx";
import PlantJourney from "../components/PlantJourney.jsx";
import "../styles/accueil.css";

const stats = [
  { value: "12k+", label: "Gardens grown" },
  { value: "98%",  label: "Plants thrive"  },
  { value: "7-day", label: "Healthy guarantee" },
];

function Accueil() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero">
        {/* background image via CSS */}
        <div className="hero_overlay" />

        {/* Decorative floating icons */}
        <div className="hero_decor" aria-hidden="true">
          <div className="hero_orb hero_orb_1" />
          <div className="hero_orb hero_orb_2" />
        </div>

        <div className="hero_content">
          {/* Badge */}
          <span className="hero_badge">
            <span className="hero_badge_dot" />
            Rooted since 2009
          </span>

          {/* Headline */}
          <h1 className="hero_title">
            Grow a garden that{" "}
            <em className="hero_accent">breathes</em>.
          </h1>

          {/* Sub */}
          <p className="hero_sub">
            Heirloom trees, wild flowers, lush turf, and living soil — delivered to
            your door, planted by hands that know.
          </p>

          {/* CTAs */}
          <div className="hero_ctas">
            <button
              className="hero_btn_primary"
              onClick={() => navigate("/products")}
            >
              Shop the nursery →
            </button>
            <button
              className="hero_btn_outline"
              onClick={() => navigate("/categories/service/products")}
            >
              Explore services
            </button>
          </div>

          {/* Stats */}
          <dl className="hero_stats">
            {stats.map(({ value, label }) => (
              <div key={label} className="hero_stat">
                <dt className="hero_stat_value">{value}</dt>
                <dd className="hero_stat_label">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Bottom wave */}
        <div className="hero_wave" aria-hidden="true">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 64 C360 0 1080 0 1440 64 L1440 64 L0 64 Z" fill="#f5f0e8" />
          </svg>
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <BestSellers />

      {/* ── Shop Collections ── */}
      <ShopCollections />

      {/* ── Our Story ── */}
      <OurStory />

      {/* ── Plant Journey ── */}
      <PlantJourney />

      <GreenFooter />
    </>
  );
}

export default Accueil;
