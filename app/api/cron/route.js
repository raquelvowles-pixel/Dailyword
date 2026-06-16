import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getActiveUsers } from "@/lib/users";
import { getDailyVerse } from "@/lib/verses";
import { buildDailyEmail } from "@/lib/email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request) {
  // Protect this endpoint — only Vercel's cron or your secret key can call it
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = getActiveUsers();
    const verse = getDailyVerse();

    if (users.length === 0) {
      return NextResponse.json({ message: "No active subscribers yet.", sent: 0 });
    }

    const results = { sent: 0, failed: 0, errors: [] };

    // Send emails in batches of 10 to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (user) => {
          try {
            const { subject, html } = buildDailyEmail({ name: user.name, verse });
            await resend.emails.send({
              from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
              to: user.email,
              subject,
              html: html.replace("{{EMAIL}}", encodeURIComponent(user.email)),
            });
            results.sent++;
          } catch (err) {
            results.failed++;
            results.errors.push({ email: user.email, error: err.message });
            console.error(`Failed to send to ${user.email}:`, err.message);
          }
        })
      );

      // Small pause between batches
      if (i + batchSize < users.length) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    console.log(`Daily cron complete: ${results.sent} sent, ${results.failed} failed`);
    return NextResponse.json({
      success: true,
      verse: verse.reference,
      ...results,
    });

  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json({ error: "Cron job failed." }, { status: 500 });
  }
}
