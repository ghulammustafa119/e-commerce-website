import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await writeClient.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email },
      { next: { revalidate: 0 } }
    );

    if (existing) {
      return NextResponse.json({ message: "Already subscribed!" });
    }

    await writeClient.create({
      _type: "newsletter",
      email,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Subscribed successfully!" });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
