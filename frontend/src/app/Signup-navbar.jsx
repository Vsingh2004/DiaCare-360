"use client"; // Required for client-side hooks like `usePathname`

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SignupNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Website Logo */}
        <Link href="/" className="text-2xl font-bold text-[#25BF76]">
          DiaCare 360
        </Link>

        {/* Conditional Links for Signup/Login */}
        {pathname !== "/signup" && (
          <Link
            href="/signup"
            className="text-[#25BF76] hover:text-[#1e9e62] transition-all font-medium"
          >
            Sign Up
          </Link>
        )}

        {pathname !== "/login" && (
          <Link
            href="/login"
            className="text-[#25BF76] hover:text-[#1e9e62] transition-all font-medium"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default SignupNavbar;
