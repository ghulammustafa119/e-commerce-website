"use client";

import { useState } from "react";
import Link from "next/link";
import { BreadcrumbDemo } from "@/components/breadcrumb";

interface Order {
  _id: string;
  status: string;
  total: number;
  createdAt: string;
  products: Array<{ name: string; price: number; qty: number }>;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchOrders = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  return (
    <>
      <div className="pl-5">
        <BreadcrumbDemo />
      </div>
      <div className="max-w-screen-md mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Order History</h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Searching..." : "Look Up"}
          </button>
        </form>

        {searched && orders.length === 0 && !loading && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No orders found for this email</p>
          </div>
        )}

        {orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border rounded-[20px] p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="text-sm font-medium break-all">{order._id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[order.status] || "bg-gray-100"}`}>
                    {order.status}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-gray-500">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                  <p className="font-bold">${order.total?.toFixed(2) || "0.00"}</p>
                </div>

                <div className="text-sm text-gray-600 mb-3">
                  {order.products?.map((p, i) => (
                    <span key={i}>
                      {p.name} x{p.qty}
                      {i < order.products.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/track-order?id=${order._id}`}
                  className="text-sm font-medium underline"
                >
                  Track Order
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
