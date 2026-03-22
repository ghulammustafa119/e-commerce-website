"use client"

import { BreadcrumbDemo } from "@/components/breadcrumb";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdLocalOffer } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, discount, setDiscount } = useCart();
  const { user } = useUser();
  const [promoCode, setPromoCode] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const router = useRouter();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountPercent = discount?.percent || 0;
  const discountAmount = subtotal * (discountPercent / 100);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discountAmount + deliveryFee;

  // Auto-check welcome discount on load
  const checkWelcomeDiscount = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    try {
      const res = await fetch("/api/validate-discount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.primaryEmailAddress.emailAddress }),
      });
      const data = await res.json();
      if (data.appliedType === "welcome") {
        setDiscount({
          type: data.appliedType,
          percent: data.appliedPercent,
          couponId: data.appliedCouponId,
          label: data.appliedLabel,
        });
      }
    } catch (err) {
      console.error("Welcome discount check failed:", err);
    }
  }, [user?.primaryEmailAddress?.emailAddress, setDiscount]);

  useEffect(() => {
    // Only auto-check if no discount is already applied
    if (!discount) {
      checkWelcomeDiscount();
    }
  }, [discount, checkWelcomeDiscount]);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }
    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error("Please sign in to use promo codes");
      return;
    }

    setPromoLoading(true);
    try {
      const res = await fetch("/api/validate-discount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.primaryEmailAddress.emailAddress,
          promoCode: promoCode.trim(),
        }),
      });
      const data = await res.json();

      if (data.promoValid === false) {
        toast.error("Invalid promo code");
        return;
      }

      if (data.appliedType !== "none") {
        setDiscount({
          type: data.appliedType,
          percent: data.appliedPercent,
          couponId: data.appliedCouponId,
          label: data.appliedLabel,
        });
        if (data.appliedType === "welcome") {
          toast.success("Your welcome 20% discount is better! Applied automatically.");
        } else {
          toast.success(`Promo code applied! ${data.appliedPercent}% off`);
        }
      }
    } catch {
      toast.error("Failed to validate promo code");
    } finally {
      setPromoLoading(false);
    }
  };

  const handleRemoveDiscount = () => {
    setDiscount(null);
    setPromoCode("");
    toast.success("Discount removed");
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
      <BreadcrumbDemo />
      <h1 className="font-integralcf text-2xl md:text-[40px] font-extrabold mt-4 mb-6">
        YOUR CART
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-black/60 text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => router.push("/onsale")}
            className="bg-black text-white px-8 py-3 rounded-full font-medium"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left: Cart Items */}
          <div className="flex-1 border border-black/10 rounded-[20px] p-4 md:p-6">
            {cartItems.map((item, index) => (
              <div key={item.id + item.size + item.color}>
                <div className="flex gap-4">
                  {item.imageUrl && (
                    <div className="w-[100px] h-[100px] md:w-[124px] md:h-[124px] bg-[#F0EEED] rounded-[12px] overflow-hidden shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        width={124}
                        height={124}
                      />
                    </div>
                  )}
                  <div className="flex-1 flex justify-between">
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-base md:text-lg">{item.name}</h3>
                        <p className="text-sm text-black/60 mt-0.5">
                          Size: <span className="text-black/40">{item.size}</span>
                        </p>
                        <p className="text-sm text-black/60">
                          Color: <span className="text-black/40">{item.color}</span>
                        </p>
                      </div>
                      <p className="font-bold text-lg md:text-xl">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#FF3333] hover:text-red-600 transition-colors"
                      >
                        <RiDeleteBin6Line className="text-xl" />
                      </button>
                      <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-2 gap-4">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <FiMinus className="cursor-pointer" />
                        </button>
                        <span className="font-medium min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <FaPlus className="cursor-pointer text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {index < cartItems.length - 1 && (
                  <div className="w-full h-px bg-black/10 my-5" />
                )}
              </div>
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-[400px] border border-black/10 rounded-[20px] p-5 md:p-6 h-fit">
            <h2 className="text-xl md:text-2xl font-bold mb-5">Order Summary</h2>

            {/* Welcome discount banner */}
            {discount?.type === "welcome" && (
              <div className="bg-green-50 border border-green-200 rounded-[12px] p-3 text-sm text-green-700 mb-4">
                Welcome! 20% first-order discount applied automatically.
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between text-base">
                <span className="text-black/60">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-black/60">
                  Discount (-{discountPercent}%)
                </span>
                <span className="font-bold text-[#FF3333]">-${discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-black/60">Delivery Fee</span>
                <span className="font-bold">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="w-full h-px bg-black/10" />
              <div className="flex justify-between text-lg md:text-xl">
                <span>Total</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Applied discount info */}
            {discount && (
              <div className="flex items-center justify-between mt-3 bg-green-50 rounded-full px-4 py-2">
                <span className="text-sm text-green-700">{discount.label}</span>
                <button
                  onClick={handleRemoveDiscount}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Promo Code */}
            <div className="flex gap-3 mt-5">
              <div className="flex-1 flex items-center bg-[#F0F0F0] rounded-full px-4 py-3 gap-3">
                <MdLocalOffer className="text-black/40 text-lg shrink-0" />
                <label htmlFor="promo-code" className="sr-only">Promo code</label>
                <input
                  id="promo-code"
                  className="bg-transparent flex-1 outline-none text-sm placeholder:text-black/40"
                  placeholder="Add promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                  disabled={promoLoading}
                />
              </div>
              <button
                className="bg-black text-white px-6 rounded-full text-sm font-medium hover:bg-gray-900 transition-colors disabled:opacity-50"
                onClick={handleApplyPromo}
                disabled={promoLoading}
              >
                {promoLoading ? "..." : "Apply"}
              </button>
            </div>

            {/* Checkout Button */}
            <button
              className="w-full bg-black text-white py-4 rounded-full text-base font-medium mt-5 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
              onClick={() => router.push("/checkout")}
            >
              Go to Checkout
              <IoArrowForward className="text-lg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
