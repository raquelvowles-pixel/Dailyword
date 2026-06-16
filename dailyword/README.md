# DailyWord 📖

A free daily Bible verse app. Users sign up and receive an uplifting Bible verse in their inbox every morning at 7:00 AM.

**Built with:** Next.js · Vercel · Resend · 50 curated Bible verses

---

## Quick Setup (15 minutes)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in your values in `.env.local`:
- `RESEND_API_KEY` — get from [resend.com](https://resend.com) (free)
- `FROM_EMAIL` — a verified email in Resend
- `FROM_NAME` — e.g. DailyWord
- `CRON_SECRET` — any random string you make up
- `NEXT_PUBLIC_APP_URL` — your deployed URL

### 3. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Vercel
```bash
# Push to GitHub, then connect repo on vercel.com
# Add environment variables in Vercel → Settings → Environment Variables
```

---

## How it works

| File | Purpose |
|---|---|
| `app/page.js` | Signup landing page |
| `app/api/signup/route.js` | Handles signup + sends welcome email |
| `app/api/cron/route.js` | Daily cron job — sends verse to all subscribers at 7AM |
| `app/api/unsubscribe/route.js` | One-click unsubscribe handler |
| `lib/verses.js` | 50 curated Bible verses |
| `lib/users.js` | File-based user storage (JSON) |
| `lib/email.js` | HTML email templates |
| `vercel.json` | Cron schedule (7:00 AM daily) |
| `data/users.json` | Auto-created on first signup |

---

## Project Structure
```
dailyword/
├── app/
│   ├── layout.js
│   ├── page.js                    ← Landing page
│   └── api/
│       ├── signup/route.js        ← POST /api/signup
│       ├── cron/route.js          ← GET /api/cron (runs at 7AM)
│       └── unsubscribe/route.js   ← GET /api/unsubscribe
├── lib/
│   ├── verses.js                  ← Bible verse bank
│   ├── users.js                   ← User storage
│   └── email.js                   ← Email templates
├── data/
│   └── users.json                 ← Auto-created (subscribers)
├── vercel.json                    ← Cron config
├── .env.example                   ← Copy to .env.local
└── LAUNCH_PLAN.md                 ← How to grow your app
```

---

## Testing the cron manually

```bash
curl -H "Authorization: Bearer your_cron_secret" \
  https://yourdomain.com/api/cron
```

---

## Upgrading later

When you outgrow the JSON file storage, swap `lib/users.js` for:
- **Supabase** (free Postgres database) — best option
- **PlanetScale** (free MySQL)
- **MongoDB Atlas** (free tier)

See `LAUNCH_PLAN.md` for the full growth strategy.
