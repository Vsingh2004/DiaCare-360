"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/Marketplace/ProductCard";

const categories = [
  "Blood Sugar Monitoring Devices",
  "Diabetic-Friendly Food & Beverages",
  "Foot & Skin Care",
  "Vitamins & Supplements",
  "Lifestyle & Wellness",
];

const sortOptions = [
  { label: "Name (A-Z)", value: "name-asc" },
  { label: "Name (Z-A)", value: "name-desc" },
  { label: "Price (Low to High)", value: "price-asc" },
  { label: "Price (High to Low)", value: "price-desc" },
];

const priceRanges = [
  { label: "Below ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "Above ₹1000", min: 1000, max: Infinity },
];

const ratingsOptions = [4, 3, 2];

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(10); // ✅ Added state

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products/getall`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleClearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSortOption("");
    setSelectedPriceRange(null);
    setSelectedRating(null);
    setOnlyOffers(false);
    setVisibleProducts(10); // ✅ Reset visible products on clear
  };

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 10); // ✅ Load 30 more products
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesPrice = selectedPriceRange
        ? product.price >= selectedPriceRange.min &&
          product.price <= selectedPriceRange.max
        : true;
      const matchesRating = selectedRating
        ? product.rating >= selectedRating
        : true;
      const matchesOffer = onlyOffers
        ? product.old_price && product.old_price > product.price
        : true;
      return (
        matchesCategory &&
        matchesSearch &&
        matchesPrice &&
        matchesRating &&
        matchesOffer
      );
    })
    .sort((a, b) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-6">
      {/* Filters Row */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-4 items-center min-w-[1000px]">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search for products..."
            className="border px-4 py-2 rounded-md w-110"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category Filter */}
          <select
            className="border px-4 py-2 rounded-md w-48"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Price Range Filter */}
          <select
            className="border px-4 py-2 rounded-md w-40"
            value={selectedPriceRange ? selectedPriceRange.label : ""}
            onChange={(e) => {
              const selected = priceRanges.find(
                (range) => range.label === e.target.value
              );
              setSelectedPriceRange(selected || null);
            }}
          >
            <option value="">All Prices</option>
            {priceRanges.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>

          {/* Ratings Filter */}
          <select
            className="border px-4 py-2 rounded-md w-40"
            value={selectedRating || ""}
            onChange={(e) =>
              setSelectedRating(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">All Ratings</option>
            {ratingsOptions.map((rating) => (
              <option key={rating} value={rating}>
                {rating}★ & above
              </option>
            ))}
          </select>

          {/* Offers Filter */}
          <div className="flex items-center gap-2">
            <input
              id="offers"
              type="checkbox"
              checked={onlyOffers}
              onChange={(e) => setOnlyOffers(e.target.checked)}
              className="accent-green-600"
            />
            <label htmlFor="offers" className="text-sm">
              Only Offers
            </label>
          </div>

          {/* Sort Option */}
          <select
            className="border px-4 py-2 rounded-md w-40"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Clear All Button */}
          <button
            onClick={handleClearFilters}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0, visibleProducts).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found matching your filters.
          </p>
        )}
      </div>

      {/* Show More Button */}
      {visibleProducts < filteredProducts.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
