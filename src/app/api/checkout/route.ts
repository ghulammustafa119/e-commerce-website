import { NextResponse } from "next/server";
import Stripe from "stripe";
import { writeClient } from "@/sanity/lib/writeClient";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "");
}

export async function POST(req: Request) {
  try {
    const { shipping, products, total, paymentMethod, paypalOrderId } = await req.json();

    // Create shipping form document in Sanity
    const shippingDoc = await writeClient.create({
      _type: "shippingForm",
      fullName: shipping.fullName,
      email: shipping.email,
      shippingAddress: shipping.shippingAddress,
      phoneNumber: shipping.phoneNumber,
    });

    const orderProducts = products.map((p: { name: string; price: number; quantity: number }) => ({
      _key: crypto.randomUUID(),
      name: p.name,
      price: p.price,
      qty: p.quantity,
    }));

    // Cash on Delivery
    if (paymentMethod === "cod") {
      const orderDoc = await writeClient.create({
        _type: "orders",
        shippingForm: { _type: "reference", _ref: shippingDoc._id },
        products: orderProducts,
        status: "pending",
        total,
        createdAt: new Date().toISOString(),
      });

      // Send confirmation email
      try {
        const { sendOrderConfirmationEmail } = await import("@/lib/sendOrderEmail");
        await sendOrderConfirmationEmail(orderDoc._id);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }

      return NextResponse.json({ success: true, orderId: orderDoc._id });
    }

    // PayPal
    if (paymentMethod === "paypal") {
      const orderDoc = await writeClient.create({
        _type: "orders",
        shippingForm: { _type: "reference", _ref: shippingDoc._id },
        products: orderProducts,
        status: "paid",
        total,
        stripeSessionId: `paypal_${paypalOrderId}`,
        createdAt: new Date().toISOString(),
      });

      // Send confirmation email
      try {
        const { sendOrderConfirmationEmail } = await import("@/lib/sendOrderEmail");
        await sendOrderConfirmationEmail(orderDoc._id);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }

      return NextResponse.json({ success: true, orderId: orderDoc._id });
    }

    // Stripe (card) - default
    const orderDoc = await writeClient.create({
      _type: "orders",
      shippingForm: { _type: "reference", _ref: shippingDoc._id },
      products: orderProducts,
      status: "pending",
      total,
      createdAt: new Date().toISOString(),
    });

    const stripe = getStripe();
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((p: { name: string; price: number; quantity: number }) => ({
        price_data: {
          currency: "usd",
          product_data: { name: p.name },
          unit_amount: Math.round(p.price * 100),
        },
        quantity: p.quantity,
      })),
      mode: "payment",
      success_url: `${origin}/checkout/success?orderId=${orderDoc._id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?cancelled=true`,
      customer_email: shipping.email,
      metadata: { orderId: orderDoc._id },
    });

    return NextResponse.json({
      success: true,
      orderId: orderDoc._id,
      url: session.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process checkout" },
      { status: 500 }
    );
  }
}
