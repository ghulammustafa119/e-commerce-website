import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await writeClient.create({
      _type: "contactSubmission",
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
