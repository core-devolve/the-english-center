import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import OfferPopup from "@/components/OfferPopup";

export const metadata: Metadata = {
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

  icons: {
    icon: "/logo_icon.png",
    shortcut: "/logo_icon.png",
    apple: "/logo_icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "The English Center",
    title: "The English Center — Master English with Confidence",
    description:
      "Join The English Center and transform your English speaking, writing, and communication skills.",
    images: [
      {
        url: "/logo_icon.png",
        width: 800,
        height: 800,
        alt: "The English Center",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "The English Center — Master English with Confidence",
    description:
      "Join The English Center and transform your English speaking, writing, and communication skills.",
    images: ["/logo_icon.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <Navbar />
        {children}
        <OfferPopup />
        <Footer />
      </body>
    </html>
  );
}
