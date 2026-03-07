import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const validStatuses = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const result = await writeClient.patch(orderId).set({ status }).commit();

    return NextResponse.json({ success: true, updatedStatus: result.status });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { error: "Failed to update order", details: String(error) },
      { status: 500 }
    );
  }
}
