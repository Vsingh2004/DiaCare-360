"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import "./globals.css";
import { CartProvider } from "@/context/CartContext"; // Correctly imported
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

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PrelineScript />
        <Toaster />
        
        {/* Wrap your app with CartProvider */}
        <CartProvider>
          {children}
        </CartProvider>

      </body>
    </html>
  );
}
