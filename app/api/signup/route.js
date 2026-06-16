import { NextResponse } from "next/server";
import { Resend } from "resend";
import { addUser } from "../../../lib/users.js";
import { getRandomVerse } from "../../../lib/verses.js";
import { buildWelcomeEmail } from "../../../lib/email.js";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send welcome email if user wants email
    if (delivery === "email" || delivery === "both") {
      const { subject, html } = buildWelcomeEmail({ name, verse });
      await resend.emails.send({
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: email,
        subject,
        html: html.replace("{{EMAIL}}", encodeURIComponent(email)),
      });
    }

    // WhatsApp sending note:
    // To send WhatsApp messages, integrate Twilio or WATI here.
    // For now we store the number and can send manually or via a future integration.
    if (delivery === "whatsapp" || delivery === "both") {
      console.log(`WhatsApp signup: +91${whatsapp} — verse: ${verse.reference}`);
      // TODO: Add Twilio WhatsApp API call here
    }

    return NextResponse.json({ success: true, verse });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
