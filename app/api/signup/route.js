import { NextResponse } from "next/server";
import { addUser } from "../../../lib/users.js";
import { getRandomVerse } from "../../../lib/verses.js";
import { buildWelcomeEmail } from "../../../lib/email.js";

export async function POST(request) {
  try {
    const { name, email, whatsapp, delivery } = await request.json();

    if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    if ((delivery === "email" || delivery === "both") && (!email || !email.includes("@"))) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }
    if ((delivery === "whatsapp" || delivery === "both") && (!whatsapp || whatsapp.length < 10)) {
      return NextResponse.json({ error: "Valid WhatsApp number is required." }, { status: 400 });
    }

    const result = addUser({ name: name.trim(), email: email?.trim().toLowerCase() || "", whatsapp: whatsapp || "", delivery: delivery || "email" });

    if (!result.success && result.reason === "already_exists") {
      return NextResponse.json({ error: "This email is already subscribed!" }, { status: 409 });
    }

    const verse = getRandomVerse();

    if (delivery === "email" || delivery === "both") {
      const { subject, html } = buildWelcomeEmail({ name, verse });

      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: process.env.FROM_NAME, email: process.env.FROM_EMAIL },
          to: [{ email: email, name: name }],
          subject: subject,
          htmlContent: html.replace("{{EMAIL}}", encodeURIComponent(email)),
        }),
      });
    }

    if (delivery === "whatsapp" || delivery === "both") {
      console.log(`WhatsApp signup: +91${whatsapp} — verse: ${verse.reference}`);
    }

    return NextResponse.json({ success: true, verse });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
