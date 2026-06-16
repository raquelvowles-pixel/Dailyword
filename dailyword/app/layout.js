export const metadata = {
  title: "DailyWord — A Bible Verse Every Morning",
  description: "Sign up to receive a fresh, uplifting Bible verse in your inbox every morning at 7AM. Free forever.",
  openGraph: {
    title: "DailyWord — A Bible Verse Every Morning",
    description: "Start your day with Scripture. A free daily Bible verse delivered to your inbox.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#f5f3ee", fontFamily: "Georgia, serif" }}>
        {children}
      </body>
    </html>
  );
}
