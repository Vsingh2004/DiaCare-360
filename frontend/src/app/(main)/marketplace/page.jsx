import React from "react";
import ProductGrid from "@/components/Marketplace/ProductGrid";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Marketplace/Hero";
import ExpertRecommend from "@/components/Marketplace/ExpertRecommend";

const page = () => {
  return (
    <div>
      <Navbar />
      {/* <Hero/> */}
      <ExpertRecommend/>
      <ProductGrid />
    </div>
  );
};

export default page;
