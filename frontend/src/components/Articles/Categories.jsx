"use client";
import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react"; // lucide icons

const Categories = () => {
  const categories = {
    Health: ["Diabetes", "Heart", "Fitness", "Blood Pressure", "Allergies"],
    Lifestyle: ["Diet", "Mental Wellness", "Yoga", "Sleep", "Hydration"],
    Research: ["New Studies", "Trends", "Clinical Trials", "Reports", "Case Studies"],
    Nutrition: ["Supplements", "Vitamins", "Superfoods", "Meal Plans", "Snacks"],
    Technology: ["Wearables", "Apps", "Smart Devices", "AI in Health", "Remote Monitoring"],
    Medications: ["Insulin", "Oral Meds", "Pain Relief", "Herbal", "Prescriptions"],
    Wellness: ["Mindfulness", "Therapy", "Spiritual", "Massage", "Journaling"],
    Prevention: ["Early Signs", "Risk Factors", "Screenings", "Vaccinations", "Hygiene"],
    Fitness: ["Workouts", "Stretching", "Walking", "Home Exercises", "Gym"],
    Community: ["Events", "Stories", "Support Groups", "Workshops", "Q&A"],
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b shadow-sm z-50 sticky top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 relative">
      <a href="/" className="inline-flex items-center mr-15">
            <svg
              className="w-8 text-deep-purple-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth={2}
              strokeLinecap="round"
              strokeMiterlimit={10}
              stroke="currentColor"
              fill="none"
            >
              <rect x={3} y={1} width={7} height={12} />
              <rect x={3} y={17} width={7} height={6} />
              <rect x={14} y={1} width={7} height={6} />
              <rect x={14} y={11} width={7} height={12} />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              DiaCare 360
            </span>
          </a>
        {/* Logo */}
        {/* <div className="text-xl font-bold">MyHealthBlog</div> */}

        {/* Desktop Categories */}
        <div className="hidden lg:flex gap-6">
          {Object.entries(categories).map(([main, subs]) => (
            <div key={main} className="relative group">
              <div className="flex items-center gap-1 cursor-pointer font-semibold">
                {main}
                <ChevronDown size={16} />
              </div>
              <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 z-50 w-40">
                {subs.map((sub) => (
                  <div
                    key={sub}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {sub}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Search Bar */}

        {/* Burger Menu Icon */}
        <div className="lg:hidden">
          {isMobileMenuOpen ? (
            <X size={24} onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer" />
          ) : (
            <Menu size={24} onClick={() => setIsMobileMenuOpen(true)} className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden p-4 border-t space-y-4">
          {Object.entries(categories).map(([main, subs]) => (
            <details key={main} className="border rounded">
              <summary className="cursor-pointer px-4 py-2 font-semibold flex justify-between items-center">
                {main}
                <ChevronDown size={16} />
              </summary>
              <div className="pl-6 py-2 space-y-1">
                {subs.map((sub) => (
                  <div key={sub} className="text-sm hover:underline cursor-pointer">
                    {sub}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </nav>
  );  
};

export default Categories;