"use client"; // Keep this for client-side logic

import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation"; // Import usePathname
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrelineScript from "@/components/PrelineScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Pages where Navbar and Footer should be hidden
  const hideLayoutPages = ["/login", "/signup"];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PrelineScript />
        <Toaster />
        {/* Show Navbar and Footer only if not on specific pages */}
        {!hideLayoutPages.includes(pathname) && <Navbar />}
        
        {children}
        
        {!hideLayoutPages.includes(pathname) && <Footer />}
      </body>
    </html>
  );
}
