import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0a",
};
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Jennifer & Michel — Memories from Tenerife",
  description: "A collection of beautiful memories from Tenerife, for Jennifer and Michel.",
  openGraph: {
    title: "Jennifer & Michel — Memories from Tenerife",
    description: "A collection of beautiful memories from Tenerife.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} h-full`}
    >
      <body className="min-h-full bg-[#0a0a0a] text-white">{children}</body>
    </html>
  );
}
