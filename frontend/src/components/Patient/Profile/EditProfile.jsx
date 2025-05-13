"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({});
  const userId = "YOUR_USER_ID"; // replace with your logged-in user's ID

  // Fetch user data on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/getbyid/${userId}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  // Image handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  // ** Formik Initial Values **
  const initialValues = {
    name: userData.name || "",
    age: userData.personalInfo?.age || "",
    gender: userData.personalInfo?.gender || "",
    dob: userData.personalInfo?.dob || "",
    phone: userData.contactDetails?.phone || "",
    email: userData.email || "",
    emergencyContact: userData.contactDetails?.emergencyContact || "",
    // Health-related details
    diabetesType: userData.healthDetails?.diabetesType || "",
    allergies: userData.healthDetails?.allergies || "",
    medications: userData.healthDetails?.medications || "",
    doctorContact: userData.healthDetails?.doctorContact || "",
    height: userData.healthDetails?.height || "",
    weight: userData.healthDetails?.weight || "",
    cholesterol: userData.healthDetails?.cholesterol || "",
    bloodPressure: userData.healthDetails?.bloodPressure || "",
  };

  // ** Yup Validation Schema **
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    age: Yup.number().required("Age is required"),
    phone: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    emergencyContact: Yup.string().required("Emergency Contact is required"),
  });

  // ** Form Submission **
  const handleSubmit = (values) => {
    axios
      .put(`http://localhost:5000/api/update-profile/${userId}`, {
        personalInfo: {
          age: values.age,
          gender: values.gender,
          dob: values.dob,
        },
        contactDetails: {
          phone: values.phone,
          emergencyContact: values.emergencyContact,
        },
        healthDetails: {
          diabetesType: values.diabetesType,
          allergies: values.allergies,
          medications: values.medications,
          doctorContact: values.doctorContact,
          height: values.height,
          weight: values.weight,
          cholesterol: values.cholesterol,
          bloodPressure: values.bloodPressure,
        },
      })
      .then((res) => {
        alert("Profile updated successfully");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update profile");
      });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

      {/* Image Upload */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src={profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <div className="text-gray-600">
          <p>Click on the image to upload a new profile picture.</p>
        </div>
      </div>

      {/* Form */}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "name", label: "Full Name" },
                  { name: "age", label: "Age" },
                  { name: "gender", label: "Gender" },
                  { name: "dob", label: "Date of Birth", type: "date" },
                  { name: "phone", label: "Phone Number" },
                  { name: "email", label: "Email" },
                  { name: "emergencyContact", label: "Emergency Contact" },
                ].map(({ name, label, type = "text" }) => (
                  <div key={name}>
                    <Field
                      name={name}
                      type={type}
                      placeholder={label}
                      className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76] w-full"
                    />
                    <ErrorMessage
                      name={name}
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Health Information */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-4">Health Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "diabetesType", label: "Type of Diabetes" },
                  { name: "allergies", label: "Allergies" },
                  { name: "medications", label: "Medications" },
                  { name: "doctorContact", label: "Doctor's Contact" },
                  { name: "height", label: "Height" },
                  { name: "weight", label: "Weight" },
                  { name: "cholesterol", label: "Cholesterol" },
                  { name: "bloodPressure", label: "Blood Pressure" },
                ].map(({ name, label, type = "text" }) => (
                  <div key={name}>
                    <Field
                      name={name}
                      type={type}
                      placeholder={label}
                      className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76] w-full"
                    />
                    <ErrorMessage
                      name={name}
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-end gap-4 col-span-2">
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#25BF76] text-white py-2 px-6 rounded-md hover:bg-[#1FAF66] transition"
              >
                Save Changes
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
