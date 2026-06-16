"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [delivery, setDelivery] = useState("both");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verse, setVerse] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setIsIOS(/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()));
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
    window.addEventListener("appinstalled", () => setInstalled(true));
  }, []);

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setInstalled(true);
      setDeferredPrompt(null);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (delivery === "email" || delivery === "both") {
      if (!email.trim() || !email.includes("@")) { setError("Please enter a valid email address."); return; }
    }
    if (delivery === "whatsapp" || delivery === "both") {
      if (!whatsapp.trim() || whatsapp.length < 10) { setError("Please enter a valid WhatsApp number."); return; }
    }
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp, delivery }),
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
      <div style={styles.logo}>
        <div style={styles.logoIcon}>✦</div>
        <span style={styles.logoText}>DailyWord</span>
      </div>

      {!verse ? (
        <div style={styles.card}>
          <h1 style={styles.h1}>Start your day with Scripture</h1>
          <p style={styles.subtitle}>
            Get a free, uplifting Bible verse every morning at 7:00 AM.
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
              <label style={styles.label}>How would you like to receive your verse?</label>
              <div style={styles.toggleGroup}>
                {[
                  { value: "email", label: "📧 Email only" },
                  { value: "whatsapp", label: "💬 WhatsApp only" },
                  { value: "both", label: "✦ Both" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDelivery(opt.value)}
                    style={{
                      ...styles.toggleBtn,
                      ...(delivery === opt.value ? styles.toggleBtnActive : {}),
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {(delivery === "email" || delivery === "both") && (
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
            )}

            {(delivery === "whatsapp" || delivery === "both") && (
              <div style={styles.field}>
                <label style={styles.label}>WhatsApp number</label>
                <div style={styles.phoneRow}>
                  <div style={styles.countryCode}>🇮🇳 +91</div>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
                    style={{ ...styles.input, flex: 1 }}
                    disabled={loading}
                    maxLength={10}
                  />
                </div>
                <p style={styles.hint}>We'll send your verse via WhatsApp each morning.</p>
              </div>
            )}

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? "Signing you up..." : "✦ Get my daily verse — it's free"}
            </button>
          </form>

          <p style={styles.trust}>🔒 No spam ever. Unsubscribe in one click.</p>

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
          <p style={styles.subtitle}>
            {delivery === "email" && "Check your inbox — we've sent it there too. See you tomorrow morning! ☀️"}
            {delivery === "whatsapp" && "Check your WhatsApp — we've sent it there too. See you tomorrow morning! ☀️"}
            {delivery === "both" && "Check your inbox and WhatsApp — we've sent it there too. See you tomorrow morning! ☀️"}
          </p>

          <div style={styles.verseCard}>
            <p style={styles.verseTheme}>✦ {verse.theme}</p>
            <p style={styles.verseText}>"{verse.text}"</p>
            <p style={styles.verseRef}>— {verse.reference}</p>
          </div>

          {/* Install App Section */}
          {!installed && (
            <div style={styles.installBox}>
              <p style={styles.installTitle}>📱 Add DailyWord to your home screen</p>

              {/* Android install button */}
              {deferredPrompt && (
                <button onClick={handleInstall} style={styles.installBtn}>
                  ⬇️ Install App on Android
                </button>
              )}

              {/* iPhone instructions */}
              {isIOS && (
                <div style={styles.iosSteps}>
                  <div style={styles.iosStep}>
                    <span style={styles.stepNum}>1</span>
                    <span>Tap the <strong>Share button</strong> at the bottom of Safari ⬆️</span>
                  </div>
                  <div style={styles.iosStep}>
                    <span style={styles.stepNum}>2</span>
                    <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
                  </div>
                  <div style={styles.iosStep}>
                    <span style={styles.stepNum}>3</span>
                    <span>Tap <strong>"Add"</strong> — DailyWord appears on your home screen! 🎉</span>
                  </div>
                </div>
              )}

              {!deferredPrompt && !isIOS && (
                <p style={styles.installHint}>
                  Open this page in your phone browser to install the app on your home screen.
                </p>
              )}
            </div>
          )}

          {installed && (
            <div style={{ ...styles.installBox, background: "#E1F5EE", borderColor: "#5DCAA5" }}>
              <p style={{ ...styles.installTitle, color: "#0F6E56" }}>✅ App installed! Open DailyWord from your home screen anytime.</p>
            </div>
          )}

          <p style={styles.sharePrompt}>Know someone who'd love this? Share the link with them 💜</p>
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
  toggleGroup: { display: "flex", gap: 8, flexWrap: "wrap" },
  toggleBtn: { padding: "8px 14px", border: "1px solid #ddd", borderRadius: 99, fontSize: 13, fontFamily: "Arial, sans-serif", cursor: "pointer", background: "#fafafa", color: "#555" },
  toggleBtnActive: { background: "#EEEDFE", border: "1px solid #534AB7", color: "#3C3489", fontWeight: 600 },
  phoneRow: { display: "flex", gap: 8, alignItems: "center" },
  countryCode: { padding: "11px 14px", border: "1px solid #ddd", borderRadius: 10, fontSize: 15, fontFamily: "Arial, sans-serif", background: "#f0f0f0", color: "#555", whiteSpace: "nowrap" },
  hint: { fontFamily: "Arial, sans-serif", fontSize: 12, color: "#aaa", margin: "4px 0 0" },
  btn: { marginTop: 6, padding: "13px 20px", background: "#3C3489", color: "#CECBF6", border: "none", borderRadius: 10, fontSize: 15, fontFamily: "Arial, sans-serif", fontWeight: 600, cursor: "pointer" },
  error: { fontFamily: "Arial, sans-serif", fontSize: 13, color: "#c0392b", margin: "4px 0 0" },
  trust: { fontFamily: "Arial, sans-serif", fontSize: 12, color: "#aaa", textAlign: "center", marginTop: 14 },
  features: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 },
  featureItem: { fontFamily: "Arial, sans-serif", fontSize: 13, color: "#534AB7", background: "#EEEDFE", padding: "6px 12px", borderRadius: 99 },
  successTag: { fontFamily: "Arial, sans-serif", fontSize: 13, color: "#534AB7", fontWeight: 600, marginBottom: 8 },
  verseCard: { background: "#EEEDFE", borderLeft: "4px solid #534AB7", borderRadius: 10, padding: "24px 20px", margin: "20px 0 24px" },
  verseTheme: { fontFamily: "Arial, sans-serif", fontSize: 12, color: "#534AB7", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" },
  verseText: { fontFamily: "Georgia, serif", fontSize: 18, color: "#26215C", lineHeight: 1.75, margin: "0 0 14px", fontStyle: "italic" },
  verseRef: { fontFamily: "Arial, sans-serif", fontSize: 13, color: "#534AB7", fontWeight: 600, margin: 0 },
  sharePrompt: { fontFamily: "Arial, sans-serif", fontSize: 14, color: "#888", margin: "16px 0 14px", lineHeight: 1.6 },
  footer: { fontFamily: "Arial, sans-serif", fontSize: 12, color: "#bbb", marginTop: 28, textAlign: "center" },
  installBox: { background: "#EEEDFE", border: "1px solid #AFA9EC", borderRadius: 12, padding: "16px 18px", margin: "0 0 20px" },
  installTitle: { fontFamily: "Arial, sans-serif", fontSize: 14, fontWeight: 600, color: "#3C3489", margin: "0 0 12px" },
  installBtn: { width: "100%", padding: "11px", background: "#3C3489", color: "#CECBF6", border: "none", borderRadius: 10, fontSize: 14, fontFamily: "Arial, sans-serif", fontWeight: 600, cursor: "pointer", marginBottom: 8 },
  iosSteps: { display: "flex", flexDirection: "column", gap: 10 },
  iosStep: { display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "Arial, sans-serif", fontSize: 13, color: "#444", lineHeight: 1.5 },
  stepNum: { minWidth: 24, height: 24, background: "#3C3489", color: "#CECBF6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 },
  installHint: { fontFamily: "Arial, sans-serif", fontSize: 13, color: "#888", margin: 0, lineHeight: 1.6 },
};
