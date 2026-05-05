import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../config/api";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../styles/orderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const orderId = params.get("id");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Failed to fetch order", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Navbar />
      <main className="page_content">
        <div className="success_page">
        <p className="success_thank_you">Thank you. Your order has been received.</p>

        {loading ? (
          <p className="success_loading">Loading order details...</p>
        ) : !order ? (
          <p className="success_loading">Order not found.</p>
        ) : (
          <>
            {/* Summary box */}
            <div className="success_summary_box">
              <p><span>Order number:</span> <strong>{order.id}</strong></p>
              <p><span>Date:</span> <strong>{formatDate(order.created_at)}</strong></p>
              <p><span>Total:</span> <strong>{Number(order.total).toFixed(2)} MAD</strong></p>
              <p><span>Payment method:</span> <strong>Cash on delivery</strong></p>
            </div>

            {/* Payment note */}
            <p className="success_payment_note">Pay with cash upon delivery.</p>

            {/* Order details table */}
            <h2 className="success_details_title">Order details</h2>

            <table className="success_table">
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.product_name}{" "}
                      <span className="success_item_qty">× {item.quantity}</span>
                    </td>
                    <td>{Number(item.subtotal).toFixed(2)} MAD</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals breakdown */}
            <div className="success_totals">
              <div className="success_totals_row">
                <span>Subtotal:</span>
                <span>{Number(order.subtotal).toFixed(2)} MAD</span>
              </div>
              <div className="success_totals_row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="success_totals_row">
                <span>Payment method:</span>
                <span>Cash on delivery</span>
              </div>
              <div className="success_totals_row success_totals_total">
                <span>Total:</span>
                <span>{Number(order.total).toFixed(2)} MAD</span>
              </div>
            </div>
          </>
        )}

        <button
          className="success_continue_btn"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
      </main>
      <Footer />
    </>
  );
}

export default OrderSuccess;
