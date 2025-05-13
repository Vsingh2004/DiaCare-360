"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/Products/ProductCard"; // ✅ Adjust path if needed

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products/getall`)
      .then((res) => {
        // Get only first 4 or 8 products
        setProducts(res.data.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching featured products:", err));
  }, []);

  return (
    <div className="bg-white py-12 md:px-10 sm:px-6 lg:px-20">
      <h2 className="text-3xl font-bold text-[#25BF76] text-center mb-4">
        Medically Approved Products in One Place
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Ensure authenticity and reliability with our curated product selection.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href="/products"
          className="bg-[#25BF76] text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default FeaturedProducts;
