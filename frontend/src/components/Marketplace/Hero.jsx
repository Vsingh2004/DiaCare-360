"use client";
import React, { useState, useEffect } from "react";

// Array of banner data
const banners = [
  {
    image: "/hero/hero1.png",
    title: "Special Offers on Diabetic-Friendly Products!",
    description: "Up to 30% off on all diabetic essentials. Shop now and save!",
  },
  {
    image: "/hero/hero2.png",
    title: "New Arrivals in Diabetes Care",
    description: "Explore the latest products designed to help manage diabetes.",
  },
  {
    image: "/images/banner3.jpg",
    title: "Monitor Your Health with Our Smart Devices",
    description: "Stay on top of your health with our new range of smart glucose meters.",
  },
  {
    image: "/images/banner4.jpg",
    title: "Diabetic Diet Plans for a Healthier Life",
    description: "Get personalized diet plans to manage your diabetes effectively.",
  },
  {
    image: "/images/banner5.jpg",
    title: "Free Shipping on Orders Over $50",
    description: "Order now and enjoy free shipping on all orders above $50.",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // useEffect(() => {
  //   const interval = setInterval(goToNextBanner, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <section className="relative mt-18">
      {/* Banner Slide Container */}
      <div className="relative w-full h-86 overflow-hidden">
        <div
          className="flex transition-transform duration-1000"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${banners.length * 100}%`,
          }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="w-full h-86 flex-shrink-0 relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              {/* You can uncomment this to show title/description */}
              {/* <div className="absolute bottom-0 left-0 w-full p-6 bg-black bg-opacity-50 text-white">
                <h2 className="text-2xl font-bold">{banner.title}</h2>
                <p>{banner.description}</p>
              </div> */}
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
