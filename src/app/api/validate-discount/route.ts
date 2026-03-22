import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "");
}

export async function POST(req: Request) {
  try {
    const { email, promoCode } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // 1. Check welcome discount eligibility (no previous orders)
    let welcomeEligible = false;
    const existingOrders = await writeClient.fetch(
      `count(*[_type == "orders" && status != "cancelled" && shippingForm->email == $email])`,
      { email },
      { next: { revalidate: 0 } }
    );
    welcomeEligible = existingOrders === 0;

    // 2. Check promo code validity via Stripe
    let promoDiscount = 0;
    let stripeCouponId = "";
    let promoLabel = "";

    if (promoCode) {
      try {
        const stripe = getStripe();
        const promoCodes = await stripe.promotionCodes.list({
          code: promoCode.toUpperCase(),
          active: true,
          limit: 1,
        });

        if (promoCodes.data.length > 0) {
          const pc = promoCodes.data[0];
          const couponRef = pc.promotion?.coupon;

          if (couponRef) {
            // couponRef can be a string (coupon ID) or full Coupon object
            if (typeof couponRef === "string") {
              // Fetch the full coupon to get percent_off
              const fullCoupon = await stripe.coupons.retrieve(couponRef);
              if (fullCoupon.valid && fullCoupon.percent_off) {
                promoDiscount = fullCoupon.percent_off;
                stripeCouponId = fullCoupon.id;
                promoLabel = promoCode.toUpperCase();
              }
            } else if (couponRef.percent_off) {
              promoDiscount = couponRef.percent_off;
              stripeCouponId = couponRef.id;
              promoLabel = promoCode.toUpperCase();
            }
          }
        }
      } catch (err) {
        console.error("Stripe promo lookup error:", err);
      }
    }

    // 3. "Higher wins" logic
    const welcomePercent = welcomeEligible ? 20 : 0;
    let appliedType = "none";
    let appliedPercent = 0;
    let appliedCouponId = "";
    let appliedLabel = "";

    if (welcomePercent >= promoDiscount && welcomePercent > 0) {
      appliedType = "welcome";
      appliedPercent = 20;
      appliedCouponId = "WELCOME20";
      appliedLabel = "Welcome 20% Off (First Order)";
    } else if (promoDiscount > 0) {
      appliedType = "promo";
      appliedPercent = promoDiscount;
      appliedCouponId = stripeCouponId;
      appliedLabel = `${promoLabel} (${promoDiscount}% Off)`;
    }

    return NextResponse.json({
      welcomeEligible,
      appliedType,
      appliedPercent,
      appliedCouponId,
      appliedLabel,
      promoValid: promoCode ? promoDiscount > 0 : undefined,
    });
  } catch (error) {
    console.error("Validate discount error:", error);
    return NextResponse.json(
      { error: "Failed to validate discount" },
      { status: 500 }
    );
  }
}
