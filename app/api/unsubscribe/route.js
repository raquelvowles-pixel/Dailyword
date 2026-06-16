import { NextResponse } from "next/server";
import { unsubscribeUser } from "@/lib/users";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return new Response(unsubscribePage("Invalid link. No email provided.", false), {
      headers: { "Content-Type": "text/html" },
    });
  }

  const decoded = decodeURIComponent(email);
  const result = unsubscribeUser(decoded);

  return new Response(
    unsubscribePage(
      result
        ? `You've been unsubscribed. We'll miss you! 💜`
        : `We couldn't find that email address.`,
      result
    ),
    { headers: { "Content-Type": "text/html" } }
  );
}

function unsubscribePage(message, success) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Unsubscribe — DailyWord</title>
<style>
  body { margin:0; font-family: Arial, sans-serif; background:#f5f3ee; display:flex; align-items:center; justify-content:center; min-height:100vh; }
  .card { background:#fff; border-radius:16px; padding:48px 40px; max-width:400px; text-align:center; border:1px solid #e8e4f0; }
  .icon { font-size:48px; margin-bottom:16px; }
  h1 { font-size:20px; color:#1a1a2e; margin:0 0 12px; }
  p { font-size:15px; color:#888; margin:0 0 24px; line-height:1.6; }
  a { display:inline-block; background:#3C3489; color:#CECBF6; padding:12px 24px; border-radius:8px; text-decoration:none; font-size:14px; }
</style>
</head>
<body>
  <div class="card">
    <div class="icon">${success ? "🙏" : "❓"}</div>
    <h1>${success ? "Unsubscribed" : "Not found"}</h1>
    <p>${message}</p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL || "/"}">← Back to DailyWord</a>
  </div>
</body>
</html>`;
}
