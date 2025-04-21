"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import SignupNavbar from "@/app/Signup-navbar";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Should be 8 characters minimum")
    .matches(/[a-z]/, "Lowercase is required")
    .matches(/[A-Z]/, "Uppercase is required")
    .matches(/[0-9]/, "Number is required")
    .matches(/\W/, "Special character is required"),
  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/add`,
          values
        );
        toast.success("User registered successfully");
        resetForm();
        router.push("/login");
      } catch (error) {
        console.error(error);
        toast.error("User registration failed");
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <SignupNavbar />
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#a1ffce] to-[#faffd1]">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
          <p className="text-center text-gray-500">Join us to start your journey!</p>

          <form onSubmit={signupForm.handleSubmit}>
            {/* Name Field */}
            <div className="relative mb-4">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.name}
                className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
              />
              {signupForm.touched.name && signupForm.errors.name && (
                <div className="text-red-500 text-sm mt-1">{signupForm.errors.name}</div>
              )}
            </div>

            {/* Email Field */}
            <div className="relative mb-4">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.email}
                className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
              />
              {signupForm.touched.email && signupForm.errors.email && (
                <div className="text-red-500 text-sm mt-1">{signupForm.errors.email}</div>
              )}
            </div>

            {/* Password Field */}
            <div className="relative mb-4">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.password}
                className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
              />
              {signupForm.touched.password && signupForm.errors.password && (
                <div className="text-red-500 text-sm mt-1">{signupForm.errors.password}</div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative mb-6">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.confirmPassword}
                className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
              />
              {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">{signupForm.errors.confirmPassword}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white bg-[#25BF76] rounded-md hover:bg-[#1e9e62] transition-all"
              disabled={signupForm.isSubmitting}
            >
              {signupForm.isSubmitting ? 'Signing Up...' : 'Sign Up'}
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
