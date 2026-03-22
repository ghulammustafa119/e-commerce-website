import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const fields: Record<string, unknown> = {};

    const name = formData.get("name") as string;
    if (name) fields.name = name;

    const price = formData.get("price");
    if (price) fields.price = Number(price);

    const description = formData.get("description") as string;
    if (description) fields.description = description;

    const category = formData.get("category") as string;
    if (category) fields.category = category;

    const dressStyle = formData.get("dressStyle") as string;
    if (dressStyle) fields.dressStyle = dressStyle;

    const stock = formData.get("stock");
    if (stock !== null && stock !== "") fields.stock = Number(stock);

    const discountPercent = formData.get("discountPercent");
    if (discountPercent !== null && discountPercent !== "") fields.discountPercent = Number(discountPercent);

    const isNewVal = formData.get("isNew");
    if (isNewVal !== null) fields.isNew = isNewVal === "true";

    const colors = formData.get("colors") as string;
    if (colors !== null) {
      fields.colors = colors.split(",").map((c) => c.trim()).filter(Boolean);
    }

    const sizes = formData.getAll("sizes") as string[];
    if (sizes.length > 0) fields.sizes = sizes;

    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const imageAsset = await writeClient.assets.upload("image", buffer, {
        filename: imageFile.name,
        contentType: imageFile.type,
      });
      fields.image = {
        _type: "image",
        asset: { _type: "reference", _ref: imageAsset._id },
      };
    }

    const updated = await writeClient.patch(id).set(fields).commit();
    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await writeClient.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
