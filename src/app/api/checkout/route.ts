import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-17",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const { shipping, products } = await req.json();

    // Create shipping form document
    const shippingDoc = await writeClient.create({
      _type: "shippingForm",
      fullName: shipping.fullName,
      email: shipping.email,
      shippingAddress: shipping.shippingAddress,
      phoneNumber: shipping.phoneNumber,
    });

    // Create order document with reference to shipping form
    const orderDoc = await writeClient.create({
      _type: "orders",
      shippingForm: {
        _type: "reference",
        _ref: shippingDoc._id,
      },
      products: products.map((p: { name: string; price: number; quantity: number }) => ({
        _key: crypto.randomUUID(),
        name: p.name,
        price: p.price,
        qty: p.quantity,
      })),
    });

    return NextResponse.json({ success: true, orderId: orderDoc._id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to place order" },
      { status: 500 }
    );
  }
}
