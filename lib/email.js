const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com";
const fromName = process.env.FROM_NAME || "DailyWord";

function baseTemplate({ previewText, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${fromName}</title>
</head>
<body style="margin:0;padding:0;background:#f5f3ee;font-family:Georgia,serif;">
<div style="display:none;max-height:0;overflow:hidden;color:#f5f3ee;">${previewText}</div>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ee;padding:32px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

      <!-- Header -->
      <tr><td style="padding-bottom:24px;text-align:center;">
        <div style="display:inline-block;background:#3C3489;border-radius:12px;padding:10px 20px;">
          <span style="color:#CECBF6;font-size:18px;font-weight:bold;letter-spacing:1px;font-family:Arial,sans-serif;">✦ ${fromName}</span>
        </div>
      </td></tr>

      <!-- Card -->
      <tr><td style="background:#ffffff;border-radius:16px;padding:40px 36px;border:1px solid #e8e4f0;">
        ${body}
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:24px 0;text-align:center;">
        <p style="font-family:Arial,sans-serif;font-size:12px;color:#999;margin:0 0 8px;">
          You're receiving this because you signed up at <a href="${appUrl}" style="color:#7F77DD;text-decoration:none;">${appUrl}</a>
        </p>
        <p style="font-family:Arial,sans-serif;font-size:12px;color:#999;margin:0;">
          <a href="${appUrl}/api/unsubscribe?email={{EMAIL}}" style="color:#999;text-decoration:underline;">Unsubscribe</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export function buildWelcomeEmail({ name, verse }) {
  const firstName = name.split(" ")[0];
  const body = `
    <h1 style="font-family:Arial,sans-serif;font-size:22px;font-weight:600;color:#1a1a2e;margin:0 0 8px;">
      Welcome, ${firstName}! 🙏
    </h1>
    <p style="font-family:Arial,sans-serif;font-size:15px;color:#666;margin:0 0 32px;line-height:1.6;">
      You're all set to receive a fresh Bible verse every morning at 7:00 AM. Here's your very first one:
    </p>

    <!-- Verse block -->
    <div style="background:#EEEDFE;border-left:4px solid #534AB7;border-radius:8px;padding:28px 24px;margin:0 0 32px;">
      <p style="font-size:13px;font-family:Arial,sans-serif;color:#534AB7;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 14px;">
        ✦ ${verse.theme}
      </p>
      <p style="font-size:19px;color:#26215C;line-height:1.75;margin:0 0 16px;font-style:italic;">
        "${verse.text}"
      </p>
      <p style="font-size:14px;font-family:Arial,sans-serif;color:#534AB7;font-weight:600;margin:0;">
        — ${verse.reference}
      </p>
    </div>

    <p style="font-family:Arial,sans-serif;font-size:14px;color:#888;line-height:1.7;margin:0;">
      A new verse will arrive in your inbox each morning. Share it with someone who needs it today. 💜
    </p>
  `;

  return {
    subject: `Welcome to ${fromName} — Here's your first verse 🙏`,
    html: baseTemplate({ previewText: `"${verse.text.slice(0, 80)}..."`, body }).replace("{{EMAIL}}", ""),
  };
}

export function buildDailyEmail({ name, verse }) {
  const firstName = name.split(" ")[0];
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const body = `
    <p style="font-family:Arial,sans-serif;font-size:13px;color:#999;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">
      ${today}
    </p>
    <h1 style="font-family:Arial,sans-serif;font-size:20px;font-weight:600;color:#1a1a2e;margin:0 0 28px;">
      Good morning, ${firstName} ☀️
    </h1>

    <!-- Verse block -->
    <div style="background:#EEEDFE;border-left:4px solid #534AB7;border-radius:8px;padding:28px 24px;margin:0 0 28px;">
      <p style="font-size:13px;font-family:Arial,sans-serif;color:#534AB7;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 14px;">
        ✦ Today's verse · ${verse.theme}
      </p>
      <p style="font-size:20px;color:#26215C;line-height:1.75;margin:0 0 16px;font-style:italic;">
        "${verse.text}"
      </p>
      <p style="font-size:14px;font-family:Arial,sans-serif;color:#534AB7;font-weight:600;margin:0;">
        — ${verse.reference}
      </p>
    </div>

    <p style="font-family:Arial,sans-serif;font-size:14px;color:#888;line-height:1.7;margin:0 0 16px;">
      Let this verse guide your day. Share it with a friend or family member who might need it. 💜
    </p>
    <a href="${appUrl}" style="font-family:Arial,sans-serif;font-size:14px;color:#534AB7;text-decoration:none;">
      Visit DailyWord →
    </a>
  `;

  return {
    subject: `Your verse for ${today} — ${verse.reference}`,
    html: baseTemplate({ previewText: `"${verse.text.slice(0, 80)}..."`, body }),
  };
}
