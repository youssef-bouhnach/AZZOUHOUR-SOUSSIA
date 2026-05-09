import { createContext, useContext, useState, useCallback } from "react";
import { getMyOrders, getDeliveryDashboard, updateOrder as apiUpdateOrder } from "../config/api";

const DeliveryContext = createContext();

export function DeliveryProvider({ children }) {
  const [orders, setOrders]           = useState([]);
  const [stats, setStats]             = useState(null);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [statsLoading, setStatsLoading]   = useState(false);

  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const res = await getMyOrders();
      setOrders(res.data.orders ?? []);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await getDeliveryDashboard();
      setStats(res.data);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Perform delivered / canceled action and refresh both orders + stats
  const doAction = useCallback(async (orderId, action) => {
    await apiUpdateOrder(orderId, action);

    const updatedStatus  = action === "delivered" ? "delivery" : "cancelled";
    const updatedPayment = action === "delivered" ? "paid" : "unpaid";

    // Optimistic update on orders list
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: updatedStatus,
              payment_status: updatedPayment,
              delivery_assignment: o.delivery_assignment
                ? { ...o.delivery_assignment, status: updatedStatus }
                : undefined,
            }
          : o,
      ),
    );

    // Re-fetch stats so dashboard numbers are accurate
    fetchStats();
  }, [fetchStats]);

  return (
    <DeliveryContext.Provider
      value={{
        orders, setOrders, ordersLoading, fetchOrders,
        stats,  setStats,  statsLoading,  fetchStats,
        doAction,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  return useContext(DeliveryContext);
}
