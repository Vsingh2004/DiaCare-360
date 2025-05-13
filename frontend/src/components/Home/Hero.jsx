import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Salad, Syringe } from 'lucide-react'; // medical icons

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-tr from-[#E8F6FF] to-white overflow-hidden">
      {/* Main Content */}
      <div className="pt-18 pb-12 px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        
        {/* LEFT CONTENT (Updated) */}
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2A7BA5] leading-tight mb-4">
            All-in-One Diabetes Care Platform
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            Track your health, plan meals, access expert tips, and shop diabetic essentials — all in one place.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3">
              <HeartPulse className="text-[#25BF76]" />
              <span className="text-gray-600 text-sm">Real-time Sugar Monitoring</span>
            </div>
            <div className="flex items-center gap-3">
              <Salad className="text-[#25BF76]" />
              <span className="text-gray-600 text-sm">Smart Meal Planning</span>
            </div>
            <div className="flex items-center gap-3">
              <Syringe className="text-[#25BF76]" />
              <span className="text-gray-600 text-sm">Insulin Reminders</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/icons/store.svg" alt="store" className="w-5 h-5" />
              <span className="text-gray-600 text-sm">Diabetic Product Store</span>
            </div>
          </div>

          {/* Call-to-Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#25BF76] text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition">
              Get Started Free
            </button>
            <button className="bg-white border border-[#25BF76] text-[#25BF76] px-6 py-3 rounded-full shadow-md hover:bg-[#25BF76] hover:text-white transition">
              Explore Features
            </button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE SIDE (Unchanged) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/hero/doctor.webp"
            alt="Doctor with patient"
            className="max-w-xl"
          />
        </motion.div>
      </div>

      {/* Medical Icons Floating (Unchanged) */}
      <div className="absolute bottom-6 left-18 flex gap-4 opacity-60">
        <div className="bg-white p-3 rounded-xl shadow-md">
          <HeartPulse className="text-[#25BF76]" />
        </div>
        <div className="bg-white p-3 rounded-xl shadow-md">
          <Salad className="text-[#25BF76]" />
        </div>
        <div className="bg-white p-3 rounded-xl shadow-md">
          <Syringe className="text-[#25BF76]" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
