import React from 'react';
import { ArrowRight, Globe, Send, Mail, Phone, MapPin } from 'lucide-react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-grid">

          {/* Column 1 */}
          <div className="footer-col">
            <h3 className="footer-heading">Visit Us in Store</h3>
            <p className="footer-text">
              We would love to chat to you in person about making a lasting difference for children in need.
              Find your closest store location below.
            </p>

            <button className="footer-btn">
              <span>FIND STORE</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-list">
              <li><a href="#">About</a></li>
              <li><a href="#">Environmental Initiatives</a></li>
              <li><a href="#">Factories</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <h4 className="footer-title">Account</h4>
            <ul className="footer-list">
              <li><a href="#">My account</a></li>
              <li><a href="#">Manage Account</a></li>
              <li><a href="#">Saved Items</a></li>
              <li><a href="#">Orders & Returns</a></li>
              <li><a href="#">Redeem a Gift Card</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-col">
            <h4 className="footer-title">Get in Touch</h4>
            <ul className="footer-list contact">
              <li><Globe size={16} /><a href="#">Website</a></li>
              <li><Send size={16} /><a href="#">Telegram</a></li>
              <li><Mail size={16} /><a href="#">Email Us</a></li>
              <li><Phone size={16} /><a href="#">Call Us</a></li>
              <li><MapPin size={16} /><a href="#">Our Location</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>Copyright © 2024 Fuel Themes</p>
          <p>Made with 💛 by Fuelthemes</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;