"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/Products/ProductCard";
import { categories, menu_list } from "../../../public/assets/assets"; // Importing the categories from assets

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
  const [visibleProducts, setVisibleProducts] = useState(10);
  const [hoveredCategory, setHoveredCategory] = useState(null);

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
    setVisibleProducts(10);
  };

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 10);
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
          <input
            type="text"
            placeholder="Search for products..."
            className="border px-4 py-2 rounded-md w-110"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category Filter with Hover Dropdown */}
          <div
            className="relative"
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <select
              className="border px-4 py-2 rounded-md w-48"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              onMouseEnter={(e) => {
                const hovered = menu_list.find(
                  (item) => item.menu_name === e.target.value
                );
                setHoveredCategory(hovered);
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Subcategory Dropdown */}
            {hoveredCategory && (
              <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg p-2 z-10">
                {hoveredCategory.subcategories.map((subcat, index) => (
                  <div
                    key={index}
                    className="p-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedCategory(subcat)}
                  >
                    {subcat}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Other Filters */}
          <select className="border px-4 py-2 rounded-md w-40">
            <option value="">All Prices</option>
            {priceRanges.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>

          <select className="border px-4 py-2 rounded-md w-40">
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
