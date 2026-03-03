"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useCart } from "@/components/cart-context";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-2">Thank you for your purchase. Your payment has been processed.</p>
      {orderId && (
        <p className="text-sm text-gray-500 mb-4">Order ID: {orderId}</p>
      )}
      <div className="flex gap-4 flex-wrap justify-center">
        {orderId && (
          <Link
            href={`/track-order?id=${orderId}`}
            className="bg-gray-200 text-black px-8 py-3 rounded-full font-medium"
          >
            Track Order
          </Link>
        )}
        <Link
          href="/"
          className="bg-black text-white px-8 py-3 rounded-full font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><p>Loading...</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}
