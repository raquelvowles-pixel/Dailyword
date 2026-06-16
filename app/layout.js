export const metadata = {
  title: "DailyWord — A Bible Verse Every Morning",
  description: "Sign up to receive a fresh, uplifting Bible verse in your inbox every morning at 7AM. Free forever.",
  manifest: "/manifest.json",
  themeColor: "#3C3489",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DailyWord",
  },
  openGraph: {
    title: "DailyWord — A Bible Verse Every Morning",
    description: "Start your day with Scripture. A free daily Bible verse delivered to your inbox.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3C3489" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="DailyWord" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `
        }} />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#f5f3ee", fontFamily: "Georgia, serif" }}>
        {children}
      </body>
    </html>
  );
}
