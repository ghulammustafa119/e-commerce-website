"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BreadcrumbDemo } from "@/components/breadcrumb";

export default function Checkout() {
  const { cartItems } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    shippingAddress: "",
    phoneNumber: "",
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipping: form,
          products: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total: subtotal,
        }),
      });

      const data = await res.json();

      if (data.success && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        alert("Failed to process checkout. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button
          onClick={() => router.push("/products")}
          className="bg-black text-white px-6 py-2 rounded-full"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="pl-5">
        <BreadcrumbDemo />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Shipping Form */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-4">
            <h2 className="text-xl font-bold mb-2">Shipping Details</h2>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                placeholder="+92 300 1234567"
              />
            </div>

            <div>
              <label htmlFor="shippingAddress" className="block text-sm font-medium mb-1">
                Shipping Address
              </label>
              <textarea
                id="shippingAddress"
                name="shippingAddress"
                required
                value={form.shippingAddress}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                placeholder="House #, Street, City, Country"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full font-medium disabled:opacity-50"
            >
              {loading ? "Processing..." : "Pay with Stripe"}
            </button>
          </form>

          {/* Order Summary */}
          <div className="w-full md:w-[400px] border rounded-[20px] p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id + item.size + item.color} className="flex gap-3">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-2">
              <p className="flex justify-between font-bold text-lg">
                Total <span>${subtotal.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
