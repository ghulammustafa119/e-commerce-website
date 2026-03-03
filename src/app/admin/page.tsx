"use client";

import { useState, useEffect } from "react";

interface Order {
  _id: string;
  status: string;
  total: number;
  createdAt: string;
  products: Array<{ name: string; price: number; qty: number }>;
  shippingForm: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
}

const STATUSES = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    try {
      const res = await fetch("/api/admin/update-order", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch {
      alert("Failed to update order status");
    } finally {
      setUpdating(null);
    }
  };

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    paid: orders.filter((o) => o.status === "paid").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    revenue: orders
      .filter((o) => o.status !== "cancelled" && o.status !== "pending")
      .reduce((sum, o) => sum + (o.total || 0), 0),
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg font-medium">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border rounded-[16px] p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-[16px] p-4">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-bold text-green-700">${stats.revenue.toFixed(2)}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-[16px] p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-[16px] p-4">
          <p className="text-sm text-gray-500">Delivered</p>
          <p className="text-2xl font-bold text-blue-700">{stats.delivered}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="border rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Order ID</th>
                <th className="text-left px-4 py-3 font-medium">Customer</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Products</th>
                <th className="text-left px-4 py-3 font-medium">Total</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    No orders yet
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs max-w-[120px] truncate">
                      {order._id}
                    </td>
                    <td className="px-4 py-3">
                      {order.shippingForm?.fullName || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {order.shippingForm?.email || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-xs max-w-[150px] truncate">
                      {order.products?.map((p) => `${p.name} x${p.qty}`).join(", ")}
                    </td>
                    <td className="px-4 py-3 font-bold">
                      ${order.total?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        disabled={updating === order._id}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${STATUS_COLORS[order.status] || "bg-gray-100"}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
