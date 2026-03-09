import { NextResponse } from "next/server";
import Stripe from "stripe";
import { writeClient } from "@/sanity/lib/writeClient";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "");
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      // Update order status to paid
      await writeClient.patch(orderId).set({
        status: "paid",
        stripeSessionId: session.id,
      }).commit();

      // Send confirmation email
      try {
        const { sendOrderConfirmationEmail } = await import("@/lib/sendOrderEmail");
        await sendOrderConfirmationEmail(orderId);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
