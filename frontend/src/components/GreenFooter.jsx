import { Link, useNavigate } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin} from "lucide-react";
//  Instagram, ArrowUpRight 
import "../styles/greenFooter.css";

const navLinks = [
  { to: "/products",   label: "Shop"        },
  { to: "/categories", label: "Categories"  },
  { to: "/about",      label: "Our Story"   },
  { to: "/contact",    label: "Contact"     },
];

const accountLinks = [
  { to: "/profile",    label: "My Account"      },
  { to: "/orders",     label: "Orders & Returns" },
  { to: "/favorites",  label: "Saved Items"      },
  { to: "/cart",       label: "My Cart"          },
];

const contactItems = [
  { icon: <Mail size={15} />,    text: "contact@azzouhour-soussia.ma" },
  { icon: <Phone size={15} />,   text: "+212 600 000 000"             },
  { icon: <MapPin size={15} />,  text: "Souss Valley, Morocco"        },
];

function GreenFooter() {
  const navigate = useNavigate();

  return (
    <footer className="gf_footer">
      <div className="gf_container">

        {/* ── Top grid ── */}
        <div className="gf_grid">

          {/* Brand column */}
          <div className="gf_brand">
            <div className="gf_logo" onClick={() => navigate("/")} role="button" tabIndex={0}>
              <span className="gf_logo_icon"><Leaf size={16} /></span>
              AZZOUHOUR-SOUSSIA
            </div>
            <p className="gf_brand_desc">
              Heirloom plants, expert gardeners, and a love for the slow art
              of growing things. Rooted in the Souss Valley since 2009.
            </p>
            {/* Social */}
            <div className="gf_socials">
              {/* <a href="#" className="gf_social_link" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="gf_social_link" aria-label="Pinterest">
                <ArrowUpRight size={16} />
              </a> */}
            </div>
          </div>

          {/* Navigate */}
          <div className="gf_col">
            <p className="gf_col_heading">Navigate</p>
            <ul className="gf_list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="gf_link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="gf_col">
            <p className="gf_col_heading">Account</p>
            <ul className="gf_list">
              {accountLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="gf_link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="gf_col">
            <p className="gf_col_heading">Get in Touch</p>
            <ul className="gf_list">
              {contactItems.map(({ icon, text }) => (
                <li key={text} className="gf_contact_item">
                  <span className="gf_contact_icon">{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="gf_bottom">
          <p>© {new Date().getFullYear()} AZZOUHOUR-SOUSSIA — Grown with care.</p>
          <div className="gf_bottom_links">
            <a href="#" className="gf_bottom_link">Privacy</a>
            <a href="#" className="gf_bottom_link">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default GreenFooter;
