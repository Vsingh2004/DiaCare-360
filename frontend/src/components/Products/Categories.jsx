"use client"
import React from "react";
import { menu_list } from "../../../public/assets/assets"; // Importing the categories from assets

const Categories = ({ setCategory, selectedCategory }) => {
  return (
    <div className="py-12 mt-16">
      <div className=" px-5">
        <h1 className="text-3xl font-semibold text-center text-green-600 mb-6">
          Doctor Recommended Products
        </h1>
        <p className="text-center text-sm text-gray-600 mb-8">
          Explore a curated selection of products recommended by healthcare professionals for better
          diabetic management and care.
        </p>
        
        <div className="flex gap-6 overflow-x-scroll pb-4 overflow [&::-webkit-scrollbar]:hidden">
          {menu_list.map((category, index) => {
            const { menu_image, menu_name } = category;
            return (
              <div
                key={index}
                onClick={() => setCategory(prev => prev === menu_name ? "All" : menu_name)}
                className="flex  flex-col items-center cursor-pointer transition duration-300 transform hover:scale-105"
              >
                <img
                  src={menu_image} // Using the image from assets
                  alt={menu_name}
                  className={`min-w-35 h-35 rounded-full object-cover shadow-lg transition duration-300 ${selectedCategory === menu_name ? "border-4 border-green-600" : ""}`}
                />
                <p className="mt-4 text-center text-sm text-gray-700">{menu_name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
