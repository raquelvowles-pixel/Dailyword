# DailyWord — Launch & Growth Plan
### Zero budget · No existing audience · Starting from scratch

---

## Phase 1: Setup (Days 1–3)

### Step 1 — Create your free accounts
| Service | Link | What to do |
|---|---|---|
| Vercel | vercel.com | Sign up, connect your GitHub |
| Resend | resend.com | Sign up, verify your sending domain |
| GitHub | github.com | Create a repo, push your code |

### Step 2 — Configure environment variables on Vercel
In your Vercel project → Settings → Environment Variables, add:
```
RESEND_API_KEY        → from Resend dashboard
FROM_EMAIL            → verse@yourdomain.com
FROM_NAME             → DailyWord
CRON_SECRET           → any random string e.g. mySecret123
NEXT_PUBLIC_APP_URL   → https://yourdomain.com
```

### Step 3 — Deploy
```bash
# In your project folder:
npm install
git add .
git commit -m "Initial DailyWord app"
git push origin main
```
Vercel auto-deploys on every push. Your app goes live instantly.

### Step 4 — Test before launch
- [ ] Sign up with your own email — confirm welcome email arrives
- [ ] Test the unsubscribe link in the email
- [ ] Manually trigger the cron: GET /api/cron (with your CRON_SECRET in the header)
- [ ] Check Vercel logs for any errors

---

## Phase 2: Soft Launch (Days 4–7)

### Your first 10 subscribers — personal outreach
This is the most important phase. Do this before anything else.

**WhatsApp / SMS (your personal network)**
Send this message to 20–30 friends and family:

> "Hey! I just built my first app — it sends a free Bible verse to your inbox every morning 🙏
> Would mean a lot if you signed up and shared it: [your link]
> Takes 30 seconds. No spam, unsubscribe anytime 💜"

**Why this works:** People support people they know. Your first 10–20 signups will come from here, and they'll share it.

**Target groups to message:**
- Family group chats
- Church WhatsApp groups (ask the admin to share)
- Friends who are Christians or spiritually curious
- Colleagues you're close with

---

## Phase 3: Free Organic Growth (Weeks 2–8)

### Channel 1: Facebook Groups (biggest opportunity for zero budget)

Search Facebook for:
- "Christian women [your city]"
- "Bible study group"
- "Daily devotional"
- "Prayer and encouragement"
- "Christian moms"

**Post template:**
> "Hi everyone 🙏 I built a free app that sends one uplifting Bible verse to your inbox every morning. No ads, no spam — just Scripture to start your day.
>
> Here's today's verse: [paste a verse]
>
> If you'd like to receive one daily, sign up free here: [link]
>
> God bless 💜"

Post in 3–5 groups per week. Don't post the same message everywhere at once — Facebook may flag it.

---

### Channel 2: Reddit

**Best subreddits:**
- r/Christianity (2M+ members)
- r/Bible (500K+ members)
- r/dailyverses
- r/Christian
- r/ReformedChristianity

**Post idea:**
> Title: "I built a free daily Bible verse email — here's today's verse for you"
> Body: Share the verse, explain the app, drop the link

Reddit rewards genuine posts. Don't be salesy — share the verse first, mention the app second.

---

### Channel 3: Instagram (even with 0 followers)

Create an account: @dailyword or @yourdailyverse

**Daily content (takes 10 mins/day):**
Post the day's Bible verse as a simple image quote. Use Canva (free) with a purple/gold design.

Caption template:
> "📖 [Verse text]
> — [Reference]
>
> Save this for when you need it 💜
> Get a verse like this in your inbox every morning → link in bio
>
> #bibleverses #dailyverse #christianquotes #scripture #bibleverse #faith #morningdevotion #christianlife"

**Growth hack:** Comment meaningfully on posts from accounts like @youversion, @biblequotes, @proverbs31 — genuine comments attract followers.

---

### Channel 4: TikTok / YouTube Shorts (optional but powerful)

Record a 30-second video:
- "Day 1 of sharing a Bible verse every day"
- Show your phone, read the verse, share a brief thought
- End with: "I also send this to your inbox every morning — link in bio"

You don't need to be a speaker or pastor. Authenticity wins on TikTok.

---

### Channel 5: Churches & Faith Communities

Email or visit local churches and ask if they'll:
- Share your app in their weekly newsletter
- Post it in their WhatsApp/Facebook group
- Mention it from the pulpit

**Template email to a pastor:**
> "Dear Pastor [Name],
>
> I'm a member of [or: I recently visited] your community. I built a free app that sends a daily Bible verse to subscribers' inboxes every morning at 7AM — completely free, no ads.
>
> I'd love to offer it to your congregation as a simple way to start their day with Scripture. Would you be willing to share the link? [your link]
>
> God bless,
> [Your name]"

One church sharing your app = 50–200 new signups instantly.

---

## Phase 4: Keep Subscribers Engaged (Ongoing)

**Reduce unsubscribes by:**
- Varying verse themes (hope, strength, peace) so it never feels repetitive
- Adding a personal note once a week ("This verse got me through a hard week...")
- Celebrating milestones ("You've been receiving DailyWord for 30 days! 🎉")

**Ask subscribers to share:**
Once a month, add a line to the email:
> "Know someone who could use some encouragement today? Forward this to them 💜"

Word-of-mouth from existing subscribers is your most powerful growth tool.

---

## Realistic Growth Timeline

| Timeframe | Realistic subscriber goal |
|---|---|
| End of Week 1 | 10–30 (friends & family) |
| End of Month 1 | 50–150 (Facebook groups + Reddit) |
| End of Month 3 | 200–500 (Instagram + church partnerships) |
| End of Month 6 | 500–2,000 (organic + word of mouth) |

---

## Future Monetization (when you're ready)

Once you have 500+ engaged subscribers, you can explore:

- **Donation / tip jar** — "Buy me a coffee" link in the email footer
- **Premium tier** — themed verse packs (anxiety, grief, new beginnings), $3–5/month
- **Merchandise** — verse-printed mugs, cards via Printful (no inventory needed)
- **Sponsorships** — Christian brands (devotional apps, Bible publishers) pay to reach your audience

---

## Tools You'll Need (all free)

| Tool | Use | Link |
|---|---|---|
| Canva | Instagram verse images | canva.com |
| Vercel | App hosting | vercel.com |
| Resend | Email delivery | resend.com |
| Notion | Track growth metrics | notion.so |
| Buffer | Schedule social posts | buffer.com |

---

## Weekly Action Checklist

**Every day (10 mins):**
- [ ] Post today's verse on Instagram

**Every week (1 hour):**
- [ ] Post in 3 Facebook groups
- [ ] Post in 1 Reddit thread
- [ ] Message 5 people personally

**Every month:**
- [ ] Reach out to 2 churches
- [ ] Review subscriber count + email open rates in Resend dashboard
- [ ] Add 10 new verses to the verse bank

---

*Start small, stay consistent. The first 100 subscribers are the hardest — after that, word of mouth does most of the work.*
