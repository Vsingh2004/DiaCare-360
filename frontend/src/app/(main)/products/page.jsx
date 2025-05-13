"use client"
import React, { useState } from "react";
import ProductGrid from "@/components/Products/ProductGrid";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Products/Hero";
import Categories from "@/components/Products/Categories";

const Page = () => {
  // ✅ Manage the category state here
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div>
      <Navbar />
      {/* <Hero /> */}
    
      <Categories
        setCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      
      <ProductGrid selectedCategory={selectedCategory} />
    </div>
  );
};

export default Page;
