import { NextResponse } from "next/server";
import { Resend } from "resend";
import { addUser } from "@/lib/users";
import { getRandomVerse } from "@/lib/verses";
import { buildWelcomeEmail } from "@/lib/email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    // Basic validation
    if (!name || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Name and valid email are required." }, { status: 400 });
    }

    // Save user to our JSON store
    const result = addUser({ name: name.trim(), email: email.trim().toLowerCase() });

    if (!result.success && result.reason === "already_exists") {
      return NextResponse.json({ error: "This email is already subscribed!" }, { status: 409 });
    }

    // Pick a random verse for the welcome email
    const verse = getRandomVerse();

    // Build and send the welcome email
    const { subject, html } = buildWelcomeEmail({ name, verse });

    await resend.emails.send({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: email,
      subject,
      html: html.replace("{{EMAIL}}", encodeURIComponent(email)),
    });

    return NextResponse.json({
      success: true,
      verse, // Send verse back so the frontend can display it immediately
    });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
