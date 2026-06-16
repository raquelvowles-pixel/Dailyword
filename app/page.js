"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verse, setVerse] = useState(null);

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !email.includes("@")) {
      setError("Please enter your name and a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); return; }
      setVerse(data.verse);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      {/* Header */}
      <div style={styles.logo}>
        <div style={styles.logoIcon}>✦</div>
        <span style={styles.logoText}>DailyWord</span>
      </div>

      {!verse ? (
        <div style={styles.card}>
          <h1 style={styles.h1}>Start your day with Scripture</h1>
          <p style={styles.subtitle}>
            Get a free, uplifting Bible verse delivered to your inbox every morning at 7:00 AM.
            No spam. Unsubscribe anytime.
          </p>

          <form onSubmit={handleSignup} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Your name</label>
              <input
                type="text"
                placeholder="e.g. Sarah Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                disabled={loading}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                disabled={loading}
              />
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? "Signing you up..." : "✦ Get my daily verse — it's free"}
            </button>
          </form>

          <p style={styles.trust}>🔒 No spam ever. Unsubscribe in one click.</p>

          {/* Social proof */}
          <div style={styles.features}>
            {["📖 50+ curated Bible verses", "📬 Delivered at 7:00 AM daily", "💜 Free forever"].map((f) => (
              <div key={f} style={styles.featureItem}>{f}</div>
            ))}
          </div>
        </div>
      ) : (
        <div style={styles.card}>
          <p style={styles.successTag}>✦ You're subscribed!</p>
          <h1 style={styles.h1}>Welcome! Here's your first verse</h1>
          <p style={styles.subtitle}>Check your inbox — we've sent it there too. See you tomorrow morning! ☀️</p>

          <div style={styles.verseCard}>
            <p style={styles.verseTheme}>✦ {verse.theme}</p>
            <p style={styles.verseText}>"{verse.text}"</p>
            <p style={styles.verseRef}>— {verse.reference}</p>
          </div>

          <p style={styles.sharePrompt}>
            Know someone who'd love this? Share the link with them 💜
          </p>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: "DailyWord", text: "Get a free Bible verse every morning!", url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }
            }}
            style={{ ...styles.btn, background: "#534AB7" }}
          >
            Share DailyWord →
          </button>
        </div>
      )}

      <p style={styles.footer}>
        Made with 💜 · <a href="/api/unsubscribe" style={{ color: "#999", fontSize: 12 }}>Unsubscribe</a>
      </p>
    </main>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 16px", background: "#f5f3ee" },
  logo: { display: "flex", alignItems: "center", gap: 10, marginBottom: 28 },
  logoIcon: { width: 38, height: 38, background: "#3C3489", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#CECBF6", fontSize: 18, fontFamily: "Arial" },
  logoText: { fontSize: 20, fontWeight: "bold", color: "#1a1a2e", fontFamily: "Arial, sans-serif" },
  card: { background: "#fff", borderRadius: 20, padding: "40px 36px", maxWidth: 480, width: "100%", border: "1px solid #e8e4f0" },
  h1: { fontFamily: "Georgia, serif", fontSize: 26, color: "#1a1a2e", margin: "0 0 10px", fontWeight: "normal", lineHeight: 1.3 },
  subtitle: { fontFamily: "Arial, sans-serif", fontSize: 15, color: "#777", margin: "0 0 28px", lineHeight: 1.7 },
  form: { display: "flex", flexDirection: "column", gap: 14 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontFamily: "Arial, sans-serif", fontSize: 13, color: "#555", fontWeight: 600 },
  input: { padding: "11px 14px", border: "1px solid #ddd", borderRadius: 10, fontSize: 15, fontFamily: "Arial, sans-serif", outline: "none", color: "#1a1a2e", background: "#fafafa" },
  btn: { marginTop: 6, padding: "13px 20px", background: "#3C3489", color: "#CECBF6", border: "none", borderRadius: 10, fontSize: 15, fontFamily: "Arial, sans-serif", fontWeight: 600, cursor: "pointer", transition: "background 0.15s" },
  error: { fontFamily: "Arial, sans-serif", fontSize: 13, color: "#c0392b", margin: "4px 0 0" },
  trust: { fontFamily: "Arial, sans-serif", fontSize: 12, color: "#aaa", textAlign: "center", marginTop: 14 },
  features: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 },
  featureItem: { fontFamily: "Arial, sans-serif", fontSize: 13, color: "#534AB7", background: "#EEEDFE", padding: "6px 12px", borderRadius: 99 },
  successTag: { fontFamily: "Arial, sans-serif", fontSize: 13, color: "#534AB7", fontWeight: 600, marginBottom: 8 },
  verseCard: { background: "#EEEDFE", borderLeft: "4px solid #534AB7", borderRadius: 10, padding: "24px 20px", margin: "20px 0 24px" },
  verseTheme: { fontFamily: "Arial, sans-serif", fontSize: 12, color: "#534AB7", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" },
  verseText: { fontFamily: "Georgia, serif", fontSize: 18, color: "#26215C", lineHeight: 1.75, margin: "0 0 14px", fontStyle: "italic" },
  verseRef: { fontFamily: "Arial, sans-serif", fontSize: 13, color: "#534AB7", fontWeight: 600, margin: 0 },
  sharePrompt: { fontFamily: "Arial, sans-serif", fontSize: 14, color: "#888", margin: "0 0 14px", lineHeight: 1.6 },
  footer: { fontFamily: "Arial, sans-serif", fontSize: 12, color: "#bbb", marginTop: 28, textAlign: "center" },
};
