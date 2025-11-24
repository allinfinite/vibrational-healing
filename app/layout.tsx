import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/lib/contexts/SoundContext";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibrational Healing Portal",
  description: "Anxiety into Peace - Sound & Energy Healing Visualized",
};

import PageTransition from "@/components/layout/PageTransition";

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
          <main className="min-h-screen pt-16">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </SoundProvider>
      </body>
    </html>
  );
}
