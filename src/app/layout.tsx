import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import { StructuredData } from "@/components/shared/StructuredData";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://internity.ae"),
  title: {
    template: "%s | Internity",
    default: "Internity - Premium Video Production | UAE",
  },
  description:
    "Award-winning video production company based in the UAE. Corporate films, commercials, documentaries, and creative content.",
  openGraph: {
    images: ["/images/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Internity - Premium Video Production | UAE",
    description:
      "Award-winning video production company based in the UAE. Corporate films, commercials, documentaries, and creative content.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="video"
          href="/videos/hero.webm"
          type="video/webm"
        />
      </head>
      <body className={`${inter.variable} ${cairo.variable} antialiased`}>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
