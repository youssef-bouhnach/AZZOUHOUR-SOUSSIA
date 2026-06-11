import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDelivery } from "../context/deliveryContext";
import { getMyOrders } from "../config/api";
import DeliveryLayout from "../components/DeliveryLayout";
import "../styles/delivery.css";

export default function DeliveryOrderDetail() {
  const { orderId } = useParams();
  const navigate    = useNavigate();
  const { orders, fetchOrders, doAction } = useDelivery();

  const [order, setOrder]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing]   = useState(false);

  // Load orders from context if not yet fetched, then find this one
  useEffect(() => {
    async function load() {
      let list = orders;
      if (list.length === 0) {
        await fetchOrders();
        // fetchOrders updates context; re-read after
        const res = await getMyOrders();
        list = res.data.orders ?? [];
      }
      const found = list.find((o) => String(o.id) === String(orderId));
      setOrder(found ?? null);
      setLoading(false);
    }
    load();
  }, [orderId]);

  // Keep local order in sync when context orders change (after action)
  useEffect(() => {
    if (orders.length > 0) {
      const found = orders.find((o) => String(o.id) === String(orderId));
      if (found) setOrder(found);
    }
  }, [orders, orderId]);

  async function handleAction(action) {
    if (!confirm(`Mark this order as ${action}?`)) return;
    setActing(true);
    try {
      await doAction(Number(orderId), action);
      // navigate back to orders list after action
      navigate("/delivery/orders");
    } catch (e) {
      alert(e.response?.data?.message || "Something went wrong.");
    } finally {
      setActing(false);
    }
  }

  const isActive =
    order?.delivery_assignment?.status === "assigned" ||
    order?.delivery_assignment?.status === "in_progress";

  if (loading) {
    return (
      <DeliveryLayout>
        <div className="delivery-loading">Loading order…</div>
      </DeliveryLayout>
    );
  }

  if (!order) {
    return (
      <DeliveryLayout>
        <div className="delivery-loading" style={{ color: "#dc2626" }}>
          Order not found.
        </div>
      </DeliveryLayout>
    );
  }

  const currency = order.currency ?? "MAD";

  return (
    <DeliveryLayout>
      {/* Page header */}
      <div className="od-header">
        <div>
          <h1 className="delivery-page-title">Detail</h1>
          <p className="delivery-page-subtitle">More details</p>
        </div>
        <button
          className="od-close-btn"
          onClick={() => navigate("/delivery/orders")}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Content card */}
      <div className="od-card">

        {/* Top badges row */}
        <div className="od-badges-row">
          <StatusBadge status={order.delivery_assignment?.status ?? order.status} />
          <PaymentBadge status={order.payment_status} />
          <span className="od-order-id">Order #{order.id}</span>
        </div>

        {/* Two-column grid */}
        <div className="od-grid">

          {/* Left — shipping */}
          <section className="od-section">
            <p className="od-section-label">Shipping Info</p>
            <div className="od-info-rows">
              <InfoRow label="Name"    value={order.shipping_name} />
              <InfoRow label="Phone"   value={order.shipping_phone ?? "—"} />
              <InfoRow label="Address" value={order.shipping_address} />
              <InfoRow label="City"    value={order.shipping_city} />
              <InfoRow label="Country" value={order.shipping_country ?? "MA"} />
            </div>
          </section>

          {/* Right — order summary */}
          <section className="od-section">
            <p className="od-section-label">Order Summary</p>
            <div className="od-info-rows">
              <InfoRow label="Subtotal"       value={`${order.subtotal} ${currency}`} />
              <InfoRow label="Total"          value={`${order.total} ${currency}`} bold />
              <InfoRow label="Payment method" value={order.payment_method ?? "—"} />
              <InfoRow label="Payment status" value={<PaymentBadge status={order.payment_status} />} />
            </div>
          </section>
        </div>

        {/* Items table */}
        {order.items && order.items.length > 0 && (
          <section className="od-section od-section--full">
            <p className="od-section-label">Items</p>
            <div className="od-items-table-wrapper">
              <table className="delivery-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Color</th>
                    <th style={{ textAlign: "center" }}>Qty</th>
                    <th style={{ textAlign: "right" }}>Unit price</th>
                    <th style={{ textAlign: "right" }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="od-item-name-cell">
                          {item.product_image && (
                            <img
                              src={item.product_image}
                              alt={item.product_name}
                              className="od-item-img"
                            />
                          )}
                          <span>{item.product_name}</span>
                        </div>
                      </td>
                      <td>{item.product_color ?? "—"}</td>
                      <td style={{ textAlign: "center" }}>{item.quantity}</td>
                      <td style={{ textAlign: "right" }}>{item.unit_price} {currency}</td>
                      <td style={{ textAlign: "right", fontWeight: 600 }}>{item.subtotal} {currency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Note */}
        {order.note && (
          <section className="od-section od-section--full">
            <p className="od-section-label">Note</p>
            <p className="od-note">{order.note}</p>
          </section>
        )}

        {/* Action buttons */}
        <div className="od-actions">
          {isActive ? (
            <>
              <button
                className="delivery-action-btn btn-cancel od-action-large"
                onClick={() => handleAction("canceled")}
                disabled={acting}
              >
                Order Canceled
              </button>
              <button
                className="delivery-action-btn btn-deliver od-action-large"
                onClick={() => handleAction("delivered")}
                disabled={acting}
              >
                Order Delivered
              </button>
            </>
          ) : (
            <span className="delivery-closed-label">
              This order is already {order.delivery_assignment?.status ?? order.status}.
            </span>
          )}
        </div>

      </div>
    </DeliveryLayout>
  );
}

/* ── Small helpers ── */
function InfoRow({ label, value, bold }) {
  return (
    <div className="od-info-row">
      <span className="od-info-label">{label}</span>
      <span className={`od-info-value${bold ? " od-info-value--bold" : ""}`}>
        {value}
      </span>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    assigned:    "badge-assigned",
    in_progress: "badge-in_progress",
    delivered:   "badge-delivered",
    canceled:    "badge-canceled",
    pending:     "badge-pending",
    shipped:     "badge-shipped",
    delivery:    "badge-delivered",
    cancelled:   "badge-canceled",
  };
  return (
    <span className={`delivery-badge ${map[status] ?? "badge-pending"}`}>
      {status?.replace(/_/g, " ")}
    </span>
  );
}

function PaymentBadge({ status }) {
  const map = {
    unpaid:                   "badge-unpaid",
    paid:                     "badge-paid",
    refunded:                 "badge-shipped",
    collected_by_deliveryman: "badge-collected",
  };
  const labels = {
    unpaid:                   "Unpaid",
    paid:                     "Paid",
    refunded:                 "Refunded",
    collected_by_deliveryman: "Collected",
  };
  return (
    <span className={`delivery-badge ${map[status] ?? "badge-unpaid"}`}>
      {labels[status] ?? status?.replace(/_/g, " ")}
    </span>
  );
}
