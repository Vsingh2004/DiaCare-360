'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import SignupNavbar from '@/app/Signup-navbar';

const Login = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`, values)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('user', res.data.token);
          toast.success('Login successfully');
        })
        .catch((err) => {
          console.log(err);
          toast.error('Login failed');
        });
    },
  });

  return (
    <div>
      <SignupNavbar />
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#a1ffce] to-[#faffd1]">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back!</h2>
          <p className="text-center text-gray-500">Sign in to continue</p>

          <form onSubmit={formik.handleSubmit}>
            <div className="relative mb-4">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500 focus:ring-red-300 bg-red-50'
                    : 'focus:ring-[#25BF76]'
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div className="relative mb-4">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-500 focus:ring-red-300 bg-red-50'
                    : 'focus:ring-[#25BF76]'
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
              )}
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
              Don't have an account?{' '}
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
