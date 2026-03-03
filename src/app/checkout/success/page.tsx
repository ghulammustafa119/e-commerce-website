"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
      {orderId && (
        <p className="text-sm text-gray-500 mb-6">Order ID: {orderId}</p>
      )}
      <Link
        href="/"
        className="bg-black text-white px-8 py-3 rounded-full font-medium"
      >
        Continue Shopping
      </Link>
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
