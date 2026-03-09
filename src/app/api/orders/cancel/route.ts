import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const order = await writeClient.fetch(
      `*[_type == "orders" && _id == $id][0]{ status }`,
      { id: orderId }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "pending" && order.status !== "paid") {
      return NextResponse.json(
        { error: "Only pending or paid orders can be cancelled" },
        { status: 400 }
      );
    }

    await writeClient.patch(orderId).set({ status: "cancelled" }).commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cancel order error:", error);
    return NextResponse.json({ error: "Failed to cancel order" }, { status: 500 });
  }
}
