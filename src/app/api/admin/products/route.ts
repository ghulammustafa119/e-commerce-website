import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function GET() {
  try {
    const products = await writeClient.fetch(
      `*[_type == "product"] | order(_createdAt desc) {
        _id, name, price, description,
        "imageUrl": image.asset->url,
        category, discountPercent, isNew, dressStyle,
        colors, sizes, stock
      }`,
      {},
      { next: { revalidate: 0 } }
    );
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const dressStyle = formData.get("dressStyle") as string;
    const stock = Number(formData.get("stock") || 100);
    const discountPercent = Number(formData.get("discountPercent") || 0);
    const isNew = formData.get("isNew") === "true";
    const colors = (formData.get("colors") as string)?.split(",").map((c) => c.trim()).filter(Boolean) || [];
    const sizes = formData.getAll("sizes") as string[];
    const imageFile = formData.get("image") as File | null;

    if (!name || !price || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let imageAsset = null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageAsset = await writeClient.assets.upload("image", buffer, {
        filename: imageFile.name,
        contentType: imageFile.type,
      });
    }

    const doc: Record<string, unknown> = {
      _type: "product",
      name,
      price,
      description,
      category,
      stock,
      discountPercent,
      isNew,
      colors,
      sizes,
    };

    if (dressStyle) doc.dressStyle = dressStyle;

    if (imageAsset) {
      doc.image = {
        _type: "image",
        asset: { _type: "reference", _ref: imageAsset._id },
      };
    }

    const created = await writeClient.create(doc as { _type: string; [key: string]: unknown });
    return NextResponse.json({ success: true, product: created });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
