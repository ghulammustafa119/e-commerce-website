"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BreadcrumbDemo } from "@/components/breadcrumb";
import { toast } from "sonner";

type PaymentMethod = "card" | "paypal" | "cod";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    shippingAddress: "",
    phoneNumber: "",
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return form.fullName && form.email && form.shippingAddress && form.phoneNumber && cartItems.length > 0;
  };

  const getOrderPayload = () => ({
    shipping: form,
    products: cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    total: subtotal,
  });

  const handleStripePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...getOrderPayload(), paymentMethod: "card" }),
      });
      const data = await res.json();

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to process checkout. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCOD = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...getOrderPayload(), paymentMethod: "cod" }),
      });
      const data = await res.json();

      if (data.success) {
        clearCart();
        router.push(`/checkout/success?orderId=${data.orderId}`);
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (paymentMethod === "card") {
      handleStripePayment(e);
    } else if (paymentMethod === "cod") {
      handleCOD(e);
    } else {
      e.preventDefault();
      toast.error("PayPal is not configured yet. Please use Card or Cash on Delivery.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button
          onClick={() => router.push("/onsale")}
          className="bg-black text-white px-8 py-3 rounded-full font-medium"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
      <BreadcrumbDemo />
      <h1 className="font-integralcf text-2xl md:text-[40px] font-bold mt-4 mb-6">
        CHECKOUT
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Form + Payment */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-5">
          <div className="border border-black/10 rounded-[20px] p-5 md:p-6 space-y-4">
            <h2 className="text-xl font-bold">Shipping Details</h2>

            <div>
              <label htmlFor="fullName" className="block text-sm text-black/60 mb-1.5">Full Name</label>
              <input id="fullName" name="fullName" type="text" required value={form.fullName} onChange={handleChange}
                className="w-full border border-black/10 rounded-full px-4 py-3 outline-none focus:border-black transition-colors" placeholder="John Doe" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-black/60 mb-1.5">Email</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                className="w-full border border-black/10 rounded-full px-4 py-3 outline-none focus:border-black transition-colors" placeholder="john@example.com" />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm text-black/60 mb-1.5">Phone Number</label>
              <input id="phoneNumber" name="phoneNumber" type="tel" required value={form.phoneNumber} onChange={handleChange}
                className="w-full border border-black/10 rounded-full px-4 py-3 outline-none focus:border-black transition-colors" placeholder="+92 300 1234567" />
            </div>

            <div>
              <label htmlFor="shippingAddress" className="block text-sm text-black/60 mb-1.5">Shipping Address</label>
              <textarea id="shippingAddress" name="shippingAddress" required value={form.shippingAddress} onChange={handleChange}
                rows={3} className="w-full border border-black/10 rounded-[16px] px-4 py-3 outline-none focus:border-black transition-colors" placeholder="House #, Street, City, Country" />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="border border-black/10 rounded-[20px] p-5 md:p-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-3">
              {[
                { value: "card" as const, label: "Credit / Debit Card", desc: "Pay securely with Stripe" },
                { value: "paypal" as const, label: "PayPal", desc: "Pay with your PayPal account" },
                { value: "cod" as const, label: "Cash on Delivery", desc: "Pay when your order arrives" },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`flex items-center gap-3 border rounded-[16px] p-4 cursor-pointer transition-colors ${
                    paymentMethod === method.value ? "border-black bg-[#F0F0F0]" : "border-black/10"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={() => setPaymentMethod(method.value)}
                    className="accent-black w-4 h-4"
                  />
                  <div>
                    <p className="font-medium">{method.label}</p>
                    <p className="text-xs text-black/60">{method.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-full font-medium disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : paymentMethod === "cod"
              ? "Place Order (Cash on Delivery)"
              : paymentMethod === "paypal"
              ? "Pay with PayPal"
              : "Pay with Stripe"}
          </button>
        </form>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-[400px] border border-black/10 rounded-[20px] p-5 md:p-6 h-fit">
          <h2 className="text-xl md:text-2xl font-bold mb-5">Order Summary</h2>

          <div className="space-y-4 mb-5">
            {cartItems.map((item) => (
              <div key={item.id + item.size + item.color} className="flex gap-3">
                {item.imageUrl && (
                  <div className="w-[64px] h-[64px] bg-[#F0EEED] rounded-[12px] overflow-hidden shrink-0">
                    <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-black/60">{item.size} | Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-black/10 pt-4 space-y-3">
            <div className="flex justify-between text-base">
              <span className="text-black/60">Subtotal</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="text-black/60">Delivery</span>
              <span className="font-bold">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="w-full h-px bg-black/10" />
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
