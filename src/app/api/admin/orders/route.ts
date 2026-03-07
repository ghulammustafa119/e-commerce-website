import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export const dynamic = "force-dynamic";

export async function GET() {
  const orders = await writeClient.fetch(
    `*[_type == "orders"] | order(createdAt desc) {
      _id,
      status,
      total,
      createdAt,
      products,
      shippingForm->{fullName, email, phoneNumber}
    }`
  );

  return NextResponse.json({ orders }, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
