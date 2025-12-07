import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google"; // [MODIFY] Added Orbitron
import "./globals.css";
import { SmoothScroller } from "@/components/smooth-scroller";
import { Header } from "@/components/header";
import { CustomCursor } from "@/components/cursor";
import { PageTransition } from "@/components/page-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Burak | Tech Enthusiast",
  description: "Ultra-modern portfolio featuring 3D experiences and creative development.",
};

import { StarfieldBackground } from "@/components/starfield-background";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased bg-black`}
        suppressHydrationWarning
      >
        <StarfieldBackground className="fixed inset-0 z-0 pointer-events-none" />
        <div className="relative z-10">
          <CustomCursor />
          <SmoothScroller>
            <Header />
            <PageTransition>
              {children}
            </PageTransition>
          </SmoothScroller>
        </div>
      </body>
    </html>
  );
}
