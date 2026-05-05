import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/api";
import { useAuth } from "../context/authContext";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../styles/orders.css";

const STATUS_COLORS = {
  pending:    { bg: "#fff8e1", color: "#f59e0b" },
  paid:       { bg: "#e8f5e9", color: "#22c55e" },
  processing: { bg: "#e3f2fd", color: "#3b82f6" },
  shipped:    { bg: "#ede7f6", color: "#8b5cf6" },
  delivery:   { bg: "#e0f7fa", color: "#06b6d4" },
  cancelled:  { bg: "#fce4ec", color: "#ef4444" },
};

const PAYMENT_COLORS = {
  unpaid:   { bg: "#fff3e0", color: "#f97316" },
  paid:     { bg: "#e8f5e9", color: "#22c55e" },
  refunded: { bg: "#f3e5f5", color: "#a855f7" },
};

function Badge({ value, map }) {
  const s = map[value] || { bg: "#f5f5f5", color: "#888" };
  return (
    <span className="order_badge" style={{ background: s.bg, color: s.color }}>
      {value}
    </span>
  );
}

function OrderDetailPanel({ order, onClose }) {
  if (!order) return null;

  const formatDate = (str) =>
    new Date(str).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });

  return (
    <>
      {/* Overlay */}
      <div className="order_panel_overlay" onClick={onClose} />

      {/* Panel */}
      <div className="order_panel">
        {/* Header */}
        <div className="order_panel_header">
          <div>
            <h3>Order <span className="order_panel_id">#{order.id}</span></h3>
            <p className="order_panel_date">{formatDate(order.created_at)}</p>
          </div>
          <button className="order_panel_close" onClick={onClose}>✕</button>
        </div>

        {/* Badges */}
        <div className="order_panel_badges">
          <Badge value={order.status} map={STATUS_COLORS} />
          <Badge value={order.payment_status} map={PAYMENT_COLORS} />
        </div>

        {/* Items */}
        <div className="order_panel_section">
          <p className="order_panel_label">Items</p>
          <table className="order_panel_table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.product_name}</td>
                  <td>{item.quantity}</td>
                  <td>{Number(item.unit_price).toFixed(2)} {order.currency}</td>
                  <td>{Number(item.subtotal).toFixed(2)} {order.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="order_panel_section">
          <p className="order_panel_label">Summary</p>
          <div className="order_panel_row">
            <span>Subtotal</span>
            <span>{Number(order.subtotal).toFixed(2)} {order.currency}</span>
          </div>
          <div className="order_panel_row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="order_panel_row order_panel_total">
            <span>Total</span>
            <span>{Number(order.total).toFixed(2)} {order.currency}</span>
          </div>
        </div>

        {/* Shipping info */}
        <div className="order_panel_section">
          <p className="order_panel_label">Shipping address</p>
          <p className="order_panel_address">
            {order.shipping_name}<br />
            {order.shipping_address}<br />
            {order.shipping_city}, {order.shipping_country}
            {order.shipping_phone && <><br />{order.shipping_phone}</>}
          </p>
        </div>

        {/* Payment */}
        <div className="order_panel_section">
          <p className="order_panel_label">Payment method</p>
          <p className="order_panel_address">Cash on delivery</p>
        </div>
      </div>
    </>
  );
}

function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!user) { navigate("/login?redirect=/orders"); return; }
    axios.get("/api/orders")
      .then((res) => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const formatDate = (str) =>
    new Date(str).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });

  return (
    <>
      <Navbar />
      <main className="page_content">
        <div className="orders_page">
        {/* Header */}
        <div className="orders_header">
          <div>
            <h1 className="orders_title">My Orders</h1>
            <p className="orders_subtitle">
              {orders.length} order{orders.length !== 1 ? "s" : ""} placed
            </p>
          </div>
          <button className="orders_shop_btn" onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>

        {loading ? (
          <p className="orders_empty">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div className="orders_empty_box">
            <p className="orders_empty">You haven't placed any orders yet.</p>
            <button className="orders_shop_btn" onClick={() => navigate("/products")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders_table_wrapper">
            <table className="orders_table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="orders_row">
                    <td className="orders_id">#{order.id}</td>
                    <td className="orders_date">{formatDate(order.created_at)}</td>
                    <td className="orders_items_count">
                      {order.items.reduce((s, i) => s + i.quantity, 0)} item
                      {order.items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
                    </td>
                    <td className="orders_total">
                      {Number(order.total).toFixed(2)} {order.currency}
                    </td>
                    <td><Badge value={order.status} map={STATUS_COLORS} /></td>
                    <td><Badge value={order.payment_status} map={PAYMENT_COLORS} /></td>
                    <td>
                      <button
                        className="orders_detail_btn"
                        onClick={() => setSelected(order)}
                      >
                        Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail panel */}
      <OrderDetailPanel order={selected} onClose={() => setSelected(null)} />
      </main>
      <Footer />
    </>
  );
}

export default Orders;
