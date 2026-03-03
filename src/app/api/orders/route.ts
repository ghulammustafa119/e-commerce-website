import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const orders = await writeClient.fetch(
    `*[_type == "orders" && shippingForm->email == $email] | order(createdAt desc) {
      _id,
      status,
      total,
      createdAt,
      products
    }`,
    { email }
  );

  return NextResponse.json({ orders });
}
