'use client';
import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import SignupNavbar from '@/app/Signup-navbar';

const Login = () => {
  const router = useRouter();

  const [role, setRole] = useState('patient'); // Default role is 'patient'

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    uniqueId: role === 'expert' ? Yup.string().required('Unique ID is required for experts') : Yup.string().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/authenticate`, values);
        localStorage.setItem('user', JSON.stringify(res.data));
        toast.success('Login successful');
        router.push("/");
        // Optional: redirect or refresh
      } catch (err) {
        console.error(err);
        toast.error('Login failed');
      }
    },
  });

  return (
    <div>
      <SignupNavbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#a1ffce] to-[#faffd1] px-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl border border-gray-200 transition-transform duration-300 hover:scale-[1.02]">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-500 mt-1">Sign in to continue</p>
          </div>

          {/* Role Selection */}
          <div className="flex justify-center space-x-4 mb-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${role === 'patient' ? 'bg-[#25BF76] text-white' : 'bg-gray-200'}`}
              onClick={() => setRole('patient')}
            >
              Patient
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${role === 'expert' ? 'bg-[#25BF76] text-white' : 'bg-gray-200'}`}
              onClick={() => setRole('expert')}
            >
              Expert
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">

          {role === 'expert' && (
              <div className="relative">
                <input
                  type="text"
                  name="uniqueId"
                  placeholder="Unique ID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.uniqueId || ''}
                  className={`w-full pl-4 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.uniqueId && formik.errors.uniqueId ? 'border-red-500 focus:ring-red-300 bg-red-50' : 'focus:ring-[#25BF76]'}`}
                />
                {formik.touched.uniqueId && formik.errors.uniqueId && (
                  <p className="text-sm text-red-500 mt-1">{formik.errors.uniqueId}</p>
                )}
              </div>
            )}
            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500 focus:ring-red-300 bg-red-50'
                    : 'focus:ring-[#25BF76]'
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-500 focus:ring-red-300 bg-red-50'
                    : 'focus:ring-[#25BF76]'
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
              )}
            </div>

            {/* Options */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#25BF76]" />
                Remember me
              </label>
              <a href="/forgot-password" className="text-[#25BF76] hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-[#25BF76] text-white rounded-md font-semibold transition hover:bg-[#1e9e62] active:scale-95"
            >
              Sign In
            </button>

            {/* Bottom Text */}
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-[#25BF76] font-semibold hover:underline">
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
