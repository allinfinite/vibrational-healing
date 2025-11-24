import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/lib/contexts/SoundContext";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://vibrational-healing.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vibrational Healing Portal | Sound & Energy Medicine",
    template: "%s | Vibrational Healing"
  },
  description: "Transform anxiety into peace through intentional sound healing. Explore tuning forks, singing bowls, voice chanting, and ancient vibrational medicine practices. Experience acoustic biofield modulation and nervous system regulation.",
  keywords: [
    "sound healing",
    "vibrational medicine",
    "energy healing",
    "biofield",
    "tuning forks",
    "singing bowls",
    "anxiety relief",
    "nervous system regulation",
    "polyvagal theory",
    "frequency healing",
    "meditation",
    "consciousness",
    "harmonic resonance"
  ],
  authors: [{ name: "Vibrational Healing Portal" }],
  creator: "Vibrational Healing Portal",
  publisher: "Vibrational Healing Portal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Vibrational Healing Portal",
    title: "Vibrational Healing Portal | Transform Anxiety into Peace",
    description: "Discover the science of sound healing and biofield modulation. Interactive journey from anxiety to transformation to peace through intentional vibrational practices.",
    images: [
      {
        url: "/generated/images/hero-landing-epic.png",
        width: 1200,
        height: 630,
        alt: "Vibrational Healing - Sound waves transforming consciousness"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibrational Healing Portal | Sound & Energy Medicine",
    description: "Transform anxiety into peace through intentional sound healing. Explore ancient practices meets modern science.",
    images: ["/generated/images/hero-landing-epic.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest",
  category: "health"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <SoundProvider>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
        </SoundProvider>
      </body>
    </html>
  );
}
