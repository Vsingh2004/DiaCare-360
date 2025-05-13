"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedSection, setSelectedSection] = useState("all");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles/getall`);
      setArticles(res.data);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/articles/delete/${id}`);
      fetchArticles(); // Refresh list
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/add-articles?id=${id}`);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    // You can add logic to filter articles based on selectedSection
  };

  return (
    <div className=" ml-65 mt-10 p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Articles</h1>

      {/* Dropdown for Sections */}
      <div className="mb-6 flex gap-4">
        <select
          className="border rounded px-4 py-2"
          value={selectedSection}
          onChange={handleSectionChange}
        >
          <option value="all">All Articles</option>
          <option value="top">Top Articles</option>
          <option value="more">More Articles</option>
          <option value="trending">Trending Articles</option>
        </select>

        {/* (Optional) Category Filter */}
        {/* Example, you can make dynamic categories later */}
        <select
          className="border rounded px-4 py-2"
        >
          <option>All Categories</option>
          <option>Diabetes</option>
          <option>Fitness</option>
          <option>Nutrition</option>
        </select>
      </div>

      {/* Article List */}
      <div className="space-y-4">
        {articles.map((article) => (
          <div
            key={article._id}
            className="flex items-center bg-white shadow p-4 rounded-lg hover:shadow-md transition"
          >
            <img
              src={article.titleImage}
              alt={article.title}
              className="h-20 w-20 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p className="text-gray-500 text-sm">By {article.author}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(article._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(article._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageArticles;
