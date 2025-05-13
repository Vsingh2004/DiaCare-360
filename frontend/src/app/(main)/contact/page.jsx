"use client";
import Navbar from "@/components/Navbar";
import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12 sm:px-12 lg:px-24">
      <Navbar/>
      <div className="max-w-6xl mt-10 mx-auto">
        <h2 className="text-4xl font-bold text-[#25BF76] mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question about features, pricing, or anything else — our team is ready to answer all your questions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="bg-[#F7FDF9] p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Get in touch
            </h3>
            <ul className="text-gray-600 space-y-4 text-sm">
              <li>
                📍 <strong>Address:</strong> BBD University, Lucknow, UP, India
              </li>
              <li>
                📧 <strong>Email:</strong> support@diacare360.com
              </li>
              <li>
                📞 <strong>Phone:</strong> +91 98765 43210
              </li>
              <li>
                🕐 <strong>Hours:</strong> Mon - Fri: 9am - 6pm
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 border border-gray-300 rounded-md focus:ring-[#25BF76] focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 border border-gray-300 rounded-md focus:ring-[#25BF76] focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                className="sm:col-span-2 p-3 border border-gray-300 rounded-md focus:ring-[#25BF76] focus:outline-none"
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="sm:col-span-2 p-3 border border-gray-300 rounded-md focus:ring-[#25BF76] focus:outline-none"
                required
              ></textarea>
              <button
                type="submit"
                className="sm:col-span-2 bg-[#25BF76] text-white font-semibold py-3 rounded-md hover:bg-[#1e9f63] transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Optional Map */}
        {/* <div className="mt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!..." // Replace with actual embed if needed
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-md"
          ></iframe>
        </div> */}
      </div>
    </div>
  );
};

export default Contact;
