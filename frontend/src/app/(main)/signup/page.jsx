import React from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import SignupNavbar from '@/app/Signup-navbar';

const Signup = () => {
  return (
    <div>
      <SignupNavbar/>
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#a1ffce] to-[#faffd1]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500">Join us to start your journey!</p>
        
        <form>
          <div className="relative mb-4">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
            />
          </div>

          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
            />
          </div>

          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
            />
          </div>

          <div className="relative mb-6">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-[#25BF76] rounded-md hover:bg-[#1e9e62] transition-all"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-[#25BF76] font-bold hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
