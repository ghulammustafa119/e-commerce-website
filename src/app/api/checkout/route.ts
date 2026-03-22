import { NextResponse } from "next/server";
import Stripe from "stripe";
import { writeClient } from "@/sanity/lib/writeClient";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { shipping, products, paymentMethod, paypalOrderId, discount } = body;
    const subtotal = products.reduce(
      (sum: number, p: { price: number; quantity: number }) =>
        sum + Number(p.price) * Number(p.quantity),
      0
    );

    // Server-side discount re-validation (never trust client)
    let validatedCouponId: string | null = null;
    let discountPercent = 0;
    let discountType = "none";

    if (discount) {
      const stripe = getStripe();

      if (discount.type === "welcome") {
        // Re-check welcome eligibility
        const orderCount = await writeClient.fetch(
          `count(*[_type == "orders" && status != "cancelled" && shippingForm->email == $email])`,
          { email: shipping.email },
          { next: { revalidate: 0 } }
        );
        if (orderCount === 0) {
          validatedCouponId = "WELCOME20";
          discountPercent = 20;
          discountType = "welcome";
        }
      } else if (discount.type === "promo" && discount.couponId) {
        // Verify coupon exists and is active in Stripe
        try {
          const coupon = await stripe.coupons.retrieve(discount.couponId);
          if (coupon.valid) {
            validatedCouponId = discount.couponId;
            discountPercent = coupon.percent_off || 0;
            discountType = "promo";
          }
        } catch {
          // Invalid coupon, ignore
        }
      }
    }

    const discountAmount = subtotal * (discountPercent / 100);
    const total = subtotal - discountAmount;

    // Create shipping form document in Sanity
    const shippingDoc = await writeClient.create({
      _type: "shippingForm",
      fullName: shipping.fullName,
      email: shipping.email,
      shippingAddress: shipping.shippingAddress,
      phoneNumber: shipping.phoneNumber,
    });

    const orderProducts = products.map(
      (p: { name: string; price: number; quantity: number; id?: string }) => ({
        _key: crypto.randomUUID(),
        name: p.name,
        price: p.price,
        qty: p.quantity,
      })
    );

    // Deduct stock for each product
    for (const p of products) {
      if (p.id) {
        try {
          await writeClient
            .patch(p.id)
            .dec({ stock: Number(p.quantity) || 1 })
            .commit();
        } catch (stockErr) {
          console.error("Stock deduction error for", p.id, stockErr);
        }
      }
    }

    // Common order fields
    const orderBase = {
      _type: "orders",
      shippingForm: { _type: "reference", _ref: shippingDoc._id },
      products: orderProducts,
      total,
      discountType,
      discountPercent,
      discountAmount,
      createdAt: new Date().toISOString(),
    };

    // Cash on Delivery
    if (paymentMethod === "cod") {
      const orderDoc = await writeClient.create({
        ...orderBase,
        status: "pending",
      });

      try {
        const { sendOrderConfirmationEmail } = await import(
          "@/lib/sendOrderEmail"
        );
        await sendOrderConfirmationEmail(orderDoc._id);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }

      return NextResponse.json({ success: true, orderId: orderDoc._id });
    }

    // PayPal
    if (paymentMethod === "paypal") {
      const orderDoc = await writeClient.create({
        ...orderBase,
        status: "paid",
        stripeSessionId: `paypal_${paypalOrderId}`,
      });

      try {
        const { sendOrderConfirmationEmail } = await import(
          "@/lib/sendOrderEmail"
        );
        await sendOrderConfirmationEmail(orderDoc._id);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }

      return NextResponse.json({ success: true, orderId: orderDoc._id });
    }

    // Stripe (card) - default
    const orderDoc = await writeClient.create({
      ...orderBase,
      status: "pending",
    });

    const stripe = getStripe();
    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      "http://localhost:3000";

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: products.map(
        (p: { name: string; price: number; quantity: number }) => ({
          price_data: {
            currency: "usd",
            product_data: { name: p.name },
            unit_amount: Math.round(Number(p.price) * 100),
          },
          quantity: Number(p.quantity) || 1,
        })
      ),
      mode: "payment",
      success_url: `${origin}/checkout/success?orderId=${orderDoc._id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?cancelled=true`,
      customer_email: shipping.email,
      metadata: { orderId: orderDoc._id },
    };

    // Apply Stripe coupon if validated
    if (validatedCouponId) {
      sessionConfig.discounts = [{ coupon: validatedCouponId }];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({
      success: true,
      orderId: orderDoc._id,
      url: session.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
