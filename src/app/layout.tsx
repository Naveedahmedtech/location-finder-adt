
// 'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StickyThemeSwitcher from "@/app/components/StickyThemeSwitcher";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ClientProviders from "@/app/ClientProviders";
import NextTopLoader from 'nextjs-toploader';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "How Many Hours | Time & Distance Calculator for Flights & Driving",
    description: "Easily calculate how many hours it takes to drive or fly between destinations. Get accurate estimates based on distance, speed, and route.",
    keywords: [
        'travel time calculator',
        'how many hours',
        'driving distance',
        'flight time',
        'trip planner',
        'distance between cities',
        'road trip time',
    ],
    metadataBase: new URL("https://app.howmanyhours.com"),
    openGraph: {
        title: "How Many Hours | Travel Time Calculator",
        description: "Calculate travel time for flights and driving routes. Plan your trips with accurate time and distance estimates.",
        url: "https://app.howmanyhours.com",
        siteName: "How Many Hours",
        images: [
            {
                url: "/og-image.jpg", // Add your Open Graph image here
                width: 1200,
                height: 630,
                alt: "How Many Hours – Travel Time Calculator",
            },
        ],
        type: "website",
    },
};


const RootLayout = ({
                      children,
                    }: Readonly<{ children: React.ReactNode }>) => {
  return (
      <html lang="en">
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
      <NextTopLoader color="#FFFF" />
      <ClientProviders>
        <Header />
        <main className="mt-5 flex-grow">{children}</main>
        <Footer />
        <StickyThemeSwitcher />
      </ClientProviders>
      </body>
      </html>
  );
};

export default RootLayout;
