import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import SignupNavbar from '@/app/Signup-navbar';

const Login = () => {
  return (
    <div>
      <SignupNavbar/>
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#a1ffce] to-[#faffd1]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back!</h2>
        <p className="text-center text-gray-500">Sign in to continue</p>

        <form>
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

          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="/forgot-password" className="text-[#25BF76] text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-[#25BF76] rounded-md hover:bg-[#1e9e62] transition-all"
          >
            Sign In
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#25BF76] font-bold hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
