import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  const reviews = await client.fetch(
    `*[_type == "review" && product._ref == $productId] | order(createdAt desc) {
      _id, author, rating, comment, verified, createdAt
    }`,
    { productId }
  );

  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  try {
    const { productId, author, rating, comment } = await req.json();

    if (!productId || !author || !rating || !comment) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const review = await writeClient.create({
      _type: "review",
      product: { _type: "reference", _ref: productId },
      author,
      rating,
      comment,
      verified: false,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
