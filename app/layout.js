export const metadata = {
  title: 'WhatsApp Agent - Hindi AI Chat',
  description: 'Ek intelligent WhatsApp-style agent jo Hindi mein baat karta hai',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
