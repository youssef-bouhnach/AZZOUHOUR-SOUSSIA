import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        Free express shipping → On all orders $40 + Easy returns
      </div>

      {/* Main navbar */}
      <nav className="navbar">
        {/* Logo */}
        <div className="logo">
          <span>🌿</span> blooms co.
        </div>

        {/* Links */}
        <ul className="nav_links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/categories">Shop</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Icons */}
        <div className="nav_icons">
          <span>🔍</span>
          <span>👤</span>
          <span className="cart">
            🛒
            <span className="cart_badge">3</span>
          </span>
        </div>
      </nav>
    </>
  );
}

export default Navbar;