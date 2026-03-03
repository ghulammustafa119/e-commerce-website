import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function PATCH(req: Request) {
  try {
    const { orderId, status } = await req.json();

    const validStatuses = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await writeClient.patch(orderId).set({ status }).commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
