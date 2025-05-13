'use client';
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';

const ViewProduct = () => {
  const { id } = useParams();
  const router = useRouter();

  const [relatedProducts, setRelatedProducts] = useState([
    { _id: 1, name: "Product A", price: 29.99, image: "https://via.placeholder.com/150" },
    { _id: 2, name: "Product B", price: 39.99, image: "https://via.placeholder.com/150" },
    { _id: 3, name: "Product C", price: 49.99, image: "https://via.placeholder.com/150" }
  ]);

  return (
    <div className="p-6 mt-20">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image Gallery Placeholder */}
        <div className="space-y-4">
          <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded-lg">
            Main Image Here
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 bg-gray-200 rounded-lg">Image 1</div>
            <div className="h-24 bg-gray-200 rounded-lg">Image 2</div>
            <div className="h-24 bg-gray-200 rounded-lg">Image 3</div>
          </div>
        </div>

        {/* Product Details & Action Buttons */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Product Name</h1>
          <p className="text-lg text-gray-600">Short description of the product goes here. Highlight main features and specifications.</p>
          <p className="text-2xl font-semibold text-green-600">$49.99</p>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg">Add to Cart</button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">Buy Now</button>
            <button className="px-6 py-2 bg-pink-600 text-white rounded-lg">Add to Wishlist</button>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Product Highlights</h2>
            <ul className="list-disc pl-5">
              <li>High-quality materials</li>
              <li>Excellent durability and finish</li>
              <li>Available in multiple sizes and colors</li>
              <li>One-year warranty included</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full Product Description */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Product Description</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
      </div>

      {/* Shipping & Return Policy */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Shipping & Return Policy</h2>
        <p>Free shipping on orders over $50. Easy returns within 30 days of purchase. Contact support for any issues.</p>
      </div>

      {/* Social Sharing Options */}
      <div className="mt-10 flex gap-4">
        <h2 className="text-xl font-semibold mb-4">Share:</h2>
        <FaFacebook className="text-blue-600 cursor-pointer hover:scale-105" size={24} />
        <FaTwitter className="text-blue-400 cursor-pointer hover:scale-105" size={24} />
        <FaPinterest className="text-red-600 cursor-pointer hover:scale-105" size={24} />
      </div>

      {/* Related Products Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map((related) => (
            <div
              key={related._id}
              className="border p-4 rounded-lg cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={related.image}
                alt={related.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold">{related.name}</h3>
              <p className="text-green-600 font-bold">${related.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
