import { useEffect } from "react";
import { useDelivery } from "../context/deliveryContext";
import DeliveryLayout from "../components/DeliveryLayout";
import "../styles/delivery.css";

export default function DeliveryDashboard() {
  const { stats, statsLoading, fetchStats } = useDelivery();

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <DeliveryLayout>
      <div className="delivery-page-header">
        <h1 className="delivery-page-title">Dashboard</h1>
        <p className="delivery-page-subtitle">Overview of your delivery activity</p>
      </div>

      {statsLoading && <div className="delivery-loading">Loading…</div>}
      {!statsLoading && stats && (
        <>
          {/* Stats */}
          <div className="delivery-stats-grid">
            <StatCard
              label="Delivered"
              value={stats.delivered}
              iconClass="stat-icon-green"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              }
            />
            <StatCard
              label="Assigned"
              value={stats.assigned}
              iconClass="stat-icon-blue"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
            />
            <StatCard
              label="Total Payment Today"
              value={stats.total_payment_day}
              currency="MAD"
              iconClass="stat-icon-orange"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              }
            />
          </div>

          {/* Last 5 delivered */}
          <p className="delivery-section-title">Last 5 Delivered Orders</p>
          <div className="delivery-table-wrapper">
            {stats.last_delivered.length === 0 ? (
              <div className="delivery-empty">No delivered orders yet.</div>
            ) : (
              <table className="delivery-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Client</th>
                    <th>City</th>
                    <th>Total</th>
                    <th>Delivered at</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.last_delivered.map((order) => (
                    <tr key={order.id}>
                      <td className="col-id">#{order.id}</td>
                      <td>{order.shipping_name}</td>
                      <td>{order.shipping_city}</td>
                      <td>{order.total} {order.currency}</td>
                      <td style={{ color: "#9ca3af" }}>{formatDate(order.delivered_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </DeliveryLayout>
  );
}

function StatCard({ label, value, currency, icon, iconClass }) {
  return (
    <div className="delivery-stat-card">
      <div className="delivery-stat-card-top">
        <p className="delivery-stat-label">{label}</p>
        <div className={`delivery-stat-icon ${iconClass}`}>{icon}</div>
      </div>
      <div className="delivery-stat-value">
        {value ?? 0}
        {currency && <span className="currency">{currency}</span>}
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
