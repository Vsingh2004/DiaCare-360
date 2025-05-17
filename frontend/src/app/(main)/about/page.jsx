import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

const About = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-teal-100 min-h-screen p-8 mt-10">
      <Navbar/>
      <div className="max-w-7xl mx-auto py-12 px-6 space-y-12">

        {/* Header Section */}
        <section className="text-center">
          <h1 className="text-5xl font-bold text-teal-600 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            Empowering diabetic patients through innovation, knowledge, and care.
          </p>
        </section>

        {/* Who We Are Section */}
        <section className="bg-white shadow-lg rounded-3xl p-8 grid md:grid-cols-2 gap-35">
          <div>
            <h2 className="text-3xl font-semibold text-teal-500 mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              At <span className="font-bold">DiaCare 360</span>, we combine cutting-edge technology with expert guidance
              to provide a comprehensive platform for managing diabetes effectively.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Personalized meal planning and tracking</li>
              <li>Reliable resources curated by health experts</li>
              <li>Access to medically-approved diabetic products</li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <Image 
              src="/about-us.jpg"
              alt="Diabetes Care Illustration"
              width={400}
              height={300}
              className="rounded-3xl shadow-md"
            />
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="bg-teal-600 text-white rounded-3xl p-8">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="leading-relaxed">
            To become a trusted digital companion that simplifies diabetes management
            and enhances well-being through personalized guidance, innovative solutions,
            and community support.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {['Meal Tracking', 'Curated Resources', 'Diabetes Products', 'Expert Advice', 'Health Monitoring', 'Community Support'].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-xl font-bold text-teal-500 mb-2">{feature}</h3>
              <p className="text-gray-600">
                Empowering individuals to manage their health with confidence and ease.
              </p>
            </div>
          ))}
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-800 text-white text-center p-4 rounded-xl">
          <p>&copy; 2025 DiabetesCare Hub | All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default About;