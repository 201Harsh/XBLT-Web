import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XBLT",
  description: "XBLT is a tool for building and deploying web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
