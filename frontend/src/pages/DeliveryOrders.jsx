import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDelivery } from "../context/deliveryContext";
import DeliveryLayout from "../components/DeliveryLayout";
import "../styles/delivery.css";

export default function DeliveryOrders() {
  const { orders, ordersLoading, fetchOrders } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <DeliveryLayout>
      <div className="delivery-page-header">
        <h1 className="delivery-page-title">My Orders</h1>
        <p className="delivery-page-subtitle">All orders assigned to you</p>
      </div>

      {ordersLoading && <div className="delivery-loading">Loading…</div>}

      {!ordersLoading && (
        <div className="delivery-table-wrapper">
          {orders.length === 0 ? (
            <div className="delivery-empty">No orders assigned yet.</div>
          ) : (
            <table className="delivery-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Client</th>
                  <th>City</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="col-id">#{order.id}</td>
                    <td>{order.user?.name ?? order.shipping_name}</td>
                    <td>{order.shipping_city}</td>
                    <td>{order.total} {order.currency ?? "MAD"}</td>
                    <td>
                      <StatusBadge
                        status={order.delivery_assignment?.status ?? order.status}
                      />
                    </td>
                    <td>
                      <PaymentBadge status={order.payment_status} />
                    </td>
                    <td>
                      <button
                        className="delivery-action-btn btn-details"
                        onClick={() =>
                          navigate(`/delivery/orders/${order.id}/status`)
                        }
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </DeliveryLayout>
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
    unpaid:                    "badge-unpaid",
    paid:                      "badge-paid",
    refunded:                  "badge-shipped",
    collected_by_deliveryman:  "badge-collected",
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
