import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

const siteUrl = "https://theenglishcenter.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "The English Center — Master English with Confidence",
    template: "%s | The English Center",
  },
  description:
    "The English Center is a premier English learning institute offering spoken English, IELTS, grammar, and communication courses for students and professionals.",

  keywords: [
    "English learning center",
    "spoken English classes",
    "IELTS coaching",
    "English grammar course",
    "English institute India",
    "communication skills",
    "The English Center",
  ],

  authors: [{ name: "The English Center", url: siteUrl }],
  creator: "The English Center",
  publisher: "The English Center",

  icons: {
    icon: "/logo_icon.png",
    shortcut: "/logo_icon.png",
    apple: "/logo_icon.png",
  },

  // ────────────────────────────────────────────
  // Open Graph — used by WhatsApp, Facebook, LinkedIn
  // ────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "The English Center",
    title: "The English Center — Master English with Confidence",
    description:
      "Join The English Center and transform your English speaking, writing, and communication skills. Enroll in our expert-led courses today!",
    images: [
      {
        url: "/logo_full.png",
        width: 1200,
        height: 630,
        alt: "The English Center — Master English with Confidence",
      },
    ],
  },

  // ────────────────────────────────────────────
  // Twitter / X Card
  // ────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "The English Center — Master English with Confidence",
    description:
      "Join The English Center and transform your English speaking, writing, and communication skills. Enroll in our expert-led courses today!",
    images: ["/logo_full.png"],
    creator: "@theenglishcenter",
  },

  // ────────────────────────────────────────────
  // Robots / Indexing
  // ────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
