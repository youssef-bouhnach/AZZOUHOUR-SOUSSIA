import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import axios from "../lib/axios";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../styles/checkout.css";

function Checkout() {
  const { items, total, fetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    company: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    country: "Morocco",
    phone: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auth gate — show login/register prompt instead of silent redirect
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="checkout_auth_gate">
          <div className="checkout_auth_box">
            <div className="checkout_auth_icon">🛒</div>
            <h2>Sign in to complete your order</h2>
            <p>You need an account to place an order. It only takes a minute.</p>
            <div className="checkout_auth_actions">
              <button
                className="checkout_auth_login"
                onClick={() => navigate("/login?redirect=/checkout")}
              >
                Log in
              </button>
              <button
                className="checkout_auth_register"
                onClick={() => navigate("/register?redirect=/checkout")}
              >
                Create an account
              </button>
            </div>
            <span
              className="checkout_auth_back"
              onClick={() => navigate("/cart")}
            >
              ← Back to cart
            </span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Empty cart guard
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="checkout_empty">
          <p>Your cart is empty.</p>
          <button onClick={() => navigate("/products")}>Browse Products</button>
        </div>
        <Footer />
      </>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        cart: items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
        shipping: {
          name: `${form.first_name} ${form.last_name}`.trim(),
          phone: form.phone,
          address: `${form.address}${form.address2 ? ", " + form.address2 : ""}`,
          city: form.city,
          country: form.country,
          notes: form.notes,
        },
      };

      const res = await axios.post("/api/orders", payload);
      await fetchCart(); // clear cart count
      navigate(`/order-success?id=${res.data.order_id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="page_content">
        <div className="checkout_page">
        <form className="checkout_form" onSubmit={handleSubmit}>
          <div className="checkout_layout">

            {/* ── LEFT: Billing details ── */}
            <div className="checkout_left">
              <h2 className="checkout_section_title">Billing details</h2>

              <div className="checkout_row">
                <div className="checkout_field">
                  <label>First name <span className="req">*</span></label>
                  <input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                    placeholder="First name"
                  />
                </div>
                <div className="checkout_field">
                  <label>Last name <span className="req">*</span></label>
                  <input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="checkout_field">
                <label>Company name (optional)</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company"
                />
              </div>

              <div className="checkout_field">
                <label>Country / Region <span className="req">*</span></label>
                <select name="country" value={form.country} onChange={handleChange} required>
                  <option value="Morocco">Morocco</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="United States">United States</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="checkout_field">
                <label>Street address <span className="req">*</span></label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="House number and street name"
                />
                <input
                  name="address2"
                  value={form.address2}
                  onChange={handleChange}
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  style={{ marginTop: "8px" }}
                />
              </div>

              <div className="checkout_field">
                <label>Town / City <span className="req">*</span></label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  placeholder="City"
                />
              </div>

              <div className="checkout_field">
                <label>State / County <span className="req">*</span></label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  placeholder="State"
                />
              </div>

              <div className="checkout_field">
                <label>Postcode / ZIP</label>
                <input
                  name="postcode"
                  value={form.postcode}
                  onChange={handleChange}
                  placeholder="Postcode"
                />
              </div>

              <div className="checkout_field">
                <label>Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+212 6xx xxx xxx"
                />
              </div>

              <div className="checkout_field">
                <label>Order notes (optional)</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Notes about your order, e.g. special delivery instructions."
                />
              </div>
            </div>

            {/* ── RIGHT: Your order ── */}
            <div className="checkout_right">
              <h2 className="checkout_section_title">Your order</h2>

              <div className="checkout_order_box">
                {/* Header row */}
                <div className="checkout_order_header">
                  <span>PRODUCT</span>
                  <span>SUBTOTAL</span>
                </div>

                {/* Items */}
                {items.map((item) => (
                  <div key={item.product_id} className="checkout_order_item">
                    <span className="checkout_item_name">
                      {item.name} <span className="checkout_item_qty">× {item.quantity}</span>
                    </span>
                    <span className="checkout_item_subtotal">
                      {Number(item.subtotal).toFixed(2)} MAD
                    </span>
                  </div>
                ))}

                <div className="checkout_order_divider" />

                {/* Subtotal */}
                <div className="checkout_order_row">
                  <span>Subtotal</span>
                  <span>{Number(total).toFixed(2)} MAD</span>
                </div>

                {/* Shipping */}
                <div className="checkout_order_row">
                  <span>Shipping</span>
                  <span className="checkout_shipping_note">Cash on delivery</span>
                </div>

                <div className="checkout_order_divider" />

                {/* Total */}
                <div className="checkout_order_row checkout_order_total">
                  <span>Total</span>
                  <span>{Number(total).toFixed(2)} MAD</span>
                </div>

                {/* Payment method */}
                <div className="checkout_payment">
                  <div className="checkout_payment_label">
                    <span className="checkout_radio_dot" /> Cash on delivery
                  </div>
                  <p className="checkout_payment_desc">Pay with cash upon delivery.</p>
                </div>

                <p className="checkout_privacy_note">
                  Your personal data will be used to process your order, support your experience
                  throughout this website, and for other purposes described in our privacy policy.
                </p>

                {error && <p className="checkout_error">{error}</p>}

                <button
                  type="submit"
                  className="checkout_place_btn"
                  disabled={loading}
                >
                  {loading ? "Placing order..." : "PLACE ORDER"}
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
      </main>
      <Footer />
    </>
  );
}

export default Checkout;
