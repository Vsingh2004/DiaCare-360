"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import "./globals.css";

import PrelineScript from "@/components/PrelineScript";
import { ThemeProvider } from "next-themes";

// ✅ Import All Context Providers
import { AppProvider } from "@/context/AppContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

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
    <html lang="en" suppressHydrationWarning> 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <PrelineScript />
          <Toaster />

          {/* ✅ Context Wrapping in Hierarchical Order */}
          <AuthProvider> 
          <AppProvider> 
            <CartProvider> 
                {children}
            </CartProvider>
          </AppProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
