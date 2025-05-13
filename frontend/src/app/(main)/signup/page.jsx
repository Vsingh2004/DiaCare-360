"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaBriefcase, FaGraduationCap, FaClock } from "react-icons/fa";
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
  role: Yup.string().oneOf(["patient", "expert"]).required("Role is required"),

  // Expert-specific validations
  specialization: Yup.string().when("role", {
    is: "expert",
    then: (schema) => schema.required("Specialization is required"),
  }),
  qualification: Yup.string().when("role", {
    is: "expert",
    then: (schema) => schema.required("Qualification is required"),
  }),
  experience: Yup.number().when("role", {
    is: "expert",
    then: (schema) =>
      schema
        .required("Experience is required")
        .min(0, "Experience cannot be negative"),
  }),
});

const Signup = () => {
  const router = useRouter();
  const [uniqueId, setUniqueId] = React.useState("");
  const[showModal, setShowModal] = React.useState(false);

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "patient",
      specialization: "",
      qualification: "",
      experience: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/add`,
          values
        );
        if (res.data.uniqueId){
          setUniqueId(res.data.uniqueId);
          setShowModal(true);
        }

        toast.success("User registered successfully");
        resetForm();
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
      <div className="flex items-center justify-center  bg-gradient-to-r from-[#a1ffce] to-[#faffd1]">
        
        <div className="w-full max-w-xl p-8 space-y-8 m-10 bg-white shadow-2xl rounded-2xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
          <p className="text-center text-gray-500">Join us to start your journey!</p>

          <form onSubmit={signupForm.handleSubmit}>
            {/* Role Selector */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700 font-medium">Select Role</label>
              <select
                name="role"
                value={signupForm.values.role}
                onChange={signupForm.handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
              >
                <option value="patient">Patient</option>
                <option value="expert">Healthcare Expert</option>
              </select>
            </div>

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
            <div className="relative mb-4">
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

            {/* Expert Fields (Only if role === 'expert') */}
            {signupForm.values.role === "expert" && (
              <>
                {/* Specialization */}
                <div className="relative mb-4">
                  <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization (e.g. Diabetologist)"
                    onChange={signupForm.handleChange}
                    onBlur={signupForm.handleBlur}
                    value={signupForm.values.specialization}
                    className="w-full pl-10 px-4 py-3 border rounded-md"
                  />
                  {signupForm.touched.specialization && signupForm.errors.specialization && (
                    <div className="text-red-500 text-sm mt-1">{signupForm.errors.specialization}</div>
                  )}
                </div>

                {/* Qualification */}
                <div className="relative mb-4">
                  <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="qualification"
                    placeholder="Qualification (e.g. MBBS)"
                    onChange={signupForm.handleChange}
                    onBlur={signupForm.handleBlur}
                    value={signupForm.values.qualification}
                    className="w-full pl-10 px-4 py-3 border rounded-md"
                  />
                  {signupForm.touched.qualification && signupForm.errors.qualification && (
                    <div className="text-red-500 text-sm mt-1">{signupForm.errors.qualification}</div>
                  )}
                </div>

                {/* Experience */}
                <div className="relative mb-6">
                  <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="experience"
                    placeholder="Years of Experience"
                    onChange={signupForm.handleChange}
                    onBlur={signupForm.handleBlur}
                    value={signupForm.values.experience}
                    className="w-full pl-10 px-4 py-3 border rounded-md"
                  />
                  {signupForm.touched.experience && signupForm.errors.experience && (
                    <div className="text-red-500 text-sm mt-1">{signupForm.errors.experience}</div>
                  )}
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 text-white bg-[#25BF76] rounded-md hover:bg-[#1e9e62] transition-all"
              disabled={signupForm.isSubmitting}
            >
              {signupForm.isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>

            {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center relative w-[400px]">
      
      {/* Close Button */}
      <button
      onClick={() => { 
        setShowModal(false);
        router.push("/login");
      }}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
      >
        ✖
      </button>

      <h2 className="text-2xl font-bold mb-4">Unique ID Generated</h2>
      <p className="mb-4">Save this Unique ID, use it to login as an expert:</p>

      <div className="text-lg font-mono p-2 bg-gray-100 rounded-md mb-4">
        {uniqueId}
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="px-5 py-2 bg-[#25BF76] text-white rounded-md hover:bg-[#1e9e62]"
          onClick={() => { 
            setShowModal(false);
            router.push("/login");
          }}
        >
          Close
        </button>

        <button
          className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => {
            navigator.clipboard.writeText(uniqueId);
            toast.success("Unique ID copied to clipboard!");
          }}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  </div>
)}



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
