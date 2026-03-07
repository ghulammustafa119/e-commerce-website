import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export const dynamic = "force-dynamic";

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
    { id: orderId },
    { next: { revalidate: 0 } }
  );

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order }, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
