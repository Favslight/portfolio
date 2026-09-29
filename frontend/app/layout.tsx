import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
});

export const metadata: Metadata = {
  title: "Full Stack Developer Portfolio",
  description:
    "Backend-focused Full Stack Developer portfolio featuring scalable systems, API architecture, AI-driven platforms, and frontend execution.",
  keywords: [
    "Full Stack Developer",
    "Backend Engineer",
    "Node.js",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "AI platforms"
  ],
  openGraph: {
    title: "Full Stack Developer (Backend-Focused)",
    description:
      "Portfolio showcasing production systems, real-time integrations, payment architecture, and modern frontend development.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
