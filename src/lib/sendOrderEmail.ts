import { resend } from "./resend";
import { writeClient } from "@/sanity/lib/writeClient";

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
  const total = Number(order.total) || 0;
  const products = order.products || [];

  const productRows = products
    .map(
      (p: { name: string; price: number; qty: number }) =>
        `<tr style="border-bottom:1px solid #eee">
          <td style="padding:10px 0;color:#666">${p.name}</td>
          <td style="text-align:center;padding:10px 0;color:#666">${p.qty}</td>
          <td style="text-align:right;padding:10px 0;color:#666">$${(Number(p.price) * Number(p.qty)).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background-color:#000;padding:20px;text-align:center">
        <h1 style="color:#fff;margin:0">SHOP.CO</h1>
      </div>
      <div style="padding:30px 20px">
        <h2 style="color:#333">Order Confirmed!</h2>
        <p style="color:#666">Hi ${order.shippingForm.fullName}, thank you for your order. Your payment has been received.</p>
        <div style="background-color:#f5f5f5;padding:15px;border-radius:8px;margin-top:20px">
          <p style="margin:0 0 5px;font-weight:bold;color:#333">Order ID</p>
          <p style="margin:0;color:#666;font-size:14px">${orderId}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-top:20px">
          <thead>
            <tr style="border-bottom:2px solid #eee">
              <th style="text-align:left;padding:10px 0;color:#333">Product</th>
              <th style="text-align:center;padding:10px 0;color:#333">Qty</th>
              <th style="text-align:right;padding:10px 0;color:#333">Price</th>
            </tr>
          </thead>
          <tbody>${productRows}</tbody>
        </table>
        <div style="border-top:2px solid #000;margin-top:10px;padding-top:10px">
          <p style="text-align:right;font-weight:bold;font-size:18px;color:#333">Total: $${total.toFixed(2)}</p>
        </div>
        <div style="text-align:center;margin-top:30px">
          <a href="${trackingUrl}" style="background-color:#000;color:#fff;padding:12px 30px;border-radius:25px;text-decoration:none;display:inline-block">Track Your Order</a>
        </div>
      </div>
      <div style="background-color:#f5f5f5;padding:20px;text-align:center">
        <p style="color:#999;font-size:12px;margin:0">Shop.co - Find Clothes That Match Your Style</p>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: "Shop.co <onboarding@resend.dev>",
    to: order.shippingForm.email,
    subject: `Order Confirmation - ${orderId}`,
    html,
  });
}
