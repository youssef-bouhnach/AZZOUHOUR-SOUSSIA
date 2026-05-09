import { useEffect, useState } from "react";
import { getMyOrders, updateOrder } from "../config/api";

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await getMyOrders();
      setOrders(res.data.orders);
    } catch (err) {
      setError("Failed to load orders.");
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(orderId, action) {
    if (!confirm(`Mark this order as ${action}?`)) return;
    try {
      await updateOrder(orderId, action);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? {
                ...o,
                status: action === "delivered" ? "delivered" : "canceled",
                payment_status:
                  action === "delivered"
                    ? "collected_by_deliveryman"
                    : "unpaid",
              }
            : o,
        ),
      );
    } catch (e) {
      alert(e.response?.data?.message || "Something went wrong.");
    }
  }

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Assigned Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders assigned yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">#</th>
                <th className="p-3">Client</th>
                <th className="p-3">Ville</th>
                <th className="p-3">Total</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Paiement</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.user?.name}</td>
                  <td className="p-3">{order.shipping_city}</td>
                  <td className="p-3">{order.total} MAD</td>
                  <td className="p-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="p-3">
                    <PaymentBadge status={order.payment_status} />
                  </td>
                  <td className="p-3 space-x-2">
                    {order.status === "assigned" ||
                    order.status === "in_progress" ? (
                      <>
                        <button
                          onClick={() => handleAction(order.id, "delivered")}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Livré ✓
                        </button>
                        <button
                          onClick={() => handleAction(order.id, "canceled")}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Annuler ✗
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400 italic">Clôturé</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    assigned: "bg-blue-100 text-blue-700",
    in_progress: "bg-yellow-100 text-yellow-700",
    delivered: "bg-green-100 text-green-700",
    canceled: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] ?? "bg-gray-100"}`}
    >
      {status}
    </span>
  );
}

function PaymentBadge({ status }) {
  const styles = {
    unpaid: "bg-red-100 text-red-700",
    collected_by_deliveryman: "bg-orange-100 text-orange-700",
    paid: "bg-green-100 text-green-700",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] ?? "bg-gray-100"}`}
    >
      {status}
    </span>
  );
}
