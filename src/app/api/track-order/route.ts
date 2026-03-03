import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("id");

  if (!orderId) {
    return NextResponse.json({ error: "Order ID required" }, { status: 400 });
  }

  const order = await writeClient.fetch(
    `*[_type == "orders" && _id == $id][0]{
      _id,
      status,
      total,
      createdAt,
      products,
      shippingForm->{fullName, email, shippingAddress, phoneNumber}
    }`,
    { id: orderId }
  );

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}
