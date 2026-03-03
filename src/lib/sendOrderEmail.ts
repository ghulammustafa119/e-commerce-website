import { resend } from "./resend";
import { writeClient } from "@/sanity/lib/writeClient";
import { OrderConfirmationEmail } from "./emails/order-confirmation";

export async function sendOrderConfirmationEmail(orderId: string) {
  const order = await writeClient.fetch(
    `*[_type == "orders" && _id == $id][0]{
      _id,
      total,
      products,
      shippingForm->{fullName, email}
    }`,
    { id: orderId }
  );

  if (!order?.shippingForm?.email) {
    console.error("No email found for order:", orderId);
    return;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const trackingUrl = `${baseUrl}/track-order?id=${orderId}`;

  await resend.emails.send({
    from: "Shop.co <onboarding@resend.dev>",
    to: order.shippingForm.email,
    subject: `Order Confirmation - ${orderId}`,
    react: OrderConfirmationEmail({
      orderId,
      customerName: order.shippingForm.fullName,
      products: order.products || [],
      total: order.total || 0,
      trackingUrl,
    }),
  });
}
