"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  
  // ✅ Add to Cart
  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    toast.success("Product added to cart!");
  };

  return (
    <motion.div
      className="relative rounded-2xl shadow-md overflow-hidden w-full max-w-[270px] h-[400px] p-5 flex flex-col justify-between bg-white border border-gray-200 hover:shadow-xl transition-all"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 180 }}
    >
      {/* 🟢 Heart Icon for Favorites
      <button
        onClick={() => {}}
        className={`absolute top-2 right-2 p-2 text-gray-400}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={isFavorite ? "#f87171" : "none"}
          />
        </svg>
      </button> */}

      {/* Image Section */}
      <div className="flex justify-center items-center rounded-2xl h-[180px] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain max-h-[180px] w-full"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2 mt-4 flex-1">
        <h3 className="text-lg font-semibold text-[#046c4e] leading-tight line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-[#046c4e] font-bold text-xl">
          ₹{product.price}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/view/${product._id}`}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#c2efe0] text-[#046c4e] rounded-md hover:bg-[#aee3d3] transition"
          >
            View
          </Link>
          <Button
            size="sm"
            className={`flex items-center gap-1 ${addedToCart ? "bg-green-500" : "bg-[#046c4e]"} text-white hover:bg-[#035c41] px-3 py-1.5`}
            onClick={handleAddToCart}
            disabled={addedToCart}
          >
            <ShoppingCart size={16} />
            {addedToCart ? "Added" : "Add"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
