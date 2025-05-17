"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Fetch all products on mount
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/products/getall");
      setProducts(response.data);
      setFilteredProducts(response.data);

      // Extract unique categories & subcategories for filters
      const cats = [...new Set(response.data.map((p) => p.category))];
      const subs = [...new Set(response.data.map((p) => p.subcategory))];

      setCategories(cats);
      setSubcategories(subs);

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products when category or subcategory changes
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedSubcategory) {
      filtered = filtered.filter((p) => p.subcategory === selectedSubcategory);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedSubcategory, products]);

  // Delete product by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/products/delete/${id}`);
      // Remove from products & filteredProducts
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  if (loading) return <p className="p-4 text-center">Loading products...</p>;
  if (error) return <p className="p-4 text-center text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto ml-65 mt-18">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Filter by Category:</label>
          <select
            className="border rounded px-3 py-2"
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
        </div>

        <div>
          <label className="block mb-1 font-medium">Filter by Subcategory:</label>
          <select
            className="border rounded px-3 py-2"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">All Subcategories</option>
            {subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-left text-gray-700 font-semibold">Name</th>
                <th className="px-4 py-2 border-b text-left text-gray-700 font-semibold">Category</th>
                <th className="px-4 py-2 border-b text-left text-gray-700 font-semibold">Subcategory</th>
                <th className="px-4 py-2 border-b text-left text-gray-700 font-semibold">Price</th>
                <th className="px-4 py-2 border-b text-left text-gray-700 font-semibold">Stock</th>
                <th className="px-4 py-2 border-b text-center text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(({ _id, name, category, subcategory, price, stock }) => (
                <tr key={_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{name}</td>
                  <td className="px-4 py-3 border-b">{category}</td>
                  <td className="px-4 py-3 border-b">{subcategory}</td>
                  <td className="px-4 py-3 border-b">₹{price}</td>
                  <td className="px-4 py-3 border-b">{stock}</td>
                  <td className="px-4 py-3 border-b text-center">
                    <button
                      onClick={() => handleDelete(_id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
