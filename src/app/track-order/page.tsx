"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { BreadcrumbDemo } from "@/components/breadcrumb";

interface Order {
  _id: string;
  status: string;
  total: number;
  createdAt: string;
  products: Array<{ name: string; price: number; qty: number }>;
  shippingForm: {
    fullName: string;
    email: string;
    shippingAddress: string;
    phoneNumber: string;
  };
}

const STATUSES = ["pending", "paid", "processing", "shipped", "delivered"];
const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  paid: "Paid",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = (searchParams.get("id") || "").replace(/\/+$/, "").trim();

  const [orderId, setOrderId] = useState(initialId);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrder = async (rawId: string) => {
    const id = rawId.replace(/\/+$/, "").trim();
    if (!id) return;
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/track-order?id=${id}&t=${Date.now()}`);
      const data = await res.json();

      if (res.ok) {
        setOrder(data.order);
      } else {
        setError(data.error || "Order not found");
      }
    } catch {
      setError("Failed to fetch order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      fetchOrder(initialId);
    }
  }, [initialId]);

  const currentStep = order ? STATUSES.indexOf(order.status) : -1;

  return (
    <>
      <div className="pl-5">
        <BreadcrumbDemo />
      </div>
      <div className="max-w-screen-md mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Track Your Order</h1>

        {/* Search */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your Order ID"
            className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={() => fetchOrder(orderId)}
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Searching..." : "Track"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {order && (
          <div className="space-y-6">
            {/* Status Stepper */}
            {order.status === "cancelled" ? (
              <div className="bg-red-50 border border-red-200 rounded-[20px] p-6 text-center">
                <p className="text-red-600 font-bold text-lg">Order Cancelled</p>
              </div>
            ) : (
              <div className="bg-white border rounded-[20px] p-6">
                <h2 className="font-bold mb-6">Order Status</h2>
                <div className="flex justify-between items-center relative">
                  {/* Progress Line */}
                  <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200">
                    <div
                      className="h-full bg-black transition-all duration-500"
                      style={{ width: `${(currentStep / (STATUSES.length - 1)) * 100}%` }}
                    />
                  </div>

                  {STATUSES.map((status, i) => (
                    <div key={status} className="flex flex-col items-center relative z-10">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          i <= currentStep
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {i <= currentStep ? "✓" : i + 1}
                      </div>
                      <p className={`text-xs mt-2 ${i <= currentStep ? "font-bold" : "text-gray-400"}`}>
                        {STATUS_LABELS[status]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Details */}
            <div className="bg-white border rounded-[20px] p-6">
              <h2 className="font-bold mb-4">Order Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500">Order ID</p>
                  <p className="font-medium break-all">{order._id}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-bold">${order.total?.toFixed(2) || "0.00"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium capitalize">{STATUS_LABELS[order.status] || order.status}</p>
                </div>
              </div>

              {/* Products */}
              <h3 className="font-bold mt-4 mb-2">Products</h3>
              {order.products?.map((product, i) => (
                <div key={i} className="flex justify-between py-2 border-b last:border-0">
                  <span>{product.name} x{product.qty}</span>
                  <span className="font-bold">${(product.price * product.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Shipping Info */}
            {order.shippingForm && (
              <div className="bg-white border rounded-[20px] p-6">
                <h2 className="font-bold mb-4">Shipping Information</h2>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">Name:</span> {order.shippingForm.fullName}</p>
                  <p><span className="text-gray-500">Email:</span> {order.shippingForm.email}</p>
                  <p><span className="text-gray-500">Phone:</span> {order.shippingForm.phoneNumber}</p>
                  <p><span className="text-gray-500">Address:</span> {order.shippingForm.shippingAddress}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><p>Loading...</p></div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
