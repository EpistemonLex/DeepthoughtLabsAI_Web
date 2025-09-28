import type { Metadata } from "next";
import { Inter, Oswald, Montserrat } from "next/font/google";
import "./globals.css";

// Body Font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

// Headings Font
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-headings",
});

// Logo Font
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Deepthought Labs AI",
  description: "Your Expertise, Amplified. Your Data, Sovereign.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} ${oswald.variable}`}>
        {children}
      </body>
    </html>
  );
}