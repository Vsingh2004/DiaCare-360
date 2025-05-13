"use client";
import React from "react";

const TopArticles = ({ articles }) => {
  console.log("Top Articles Data:", articles);

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Top Articles</h2>

      {/* Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {articles.map((article) => (
          <div
            key={article._id}
            className="flex flex-col rounded-lg shadow-md overflow-hidden bg-white border border-gray-200"
          >
            {/* Image Display */}
            {article.titleImage ? (
              <img
                src={article.titleImage}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-700">Image Not Available</p>
              </div>
            )}

            {/* Content Section */}
            <div className="p-4 flex flex-col justify-between">
              <p className="text-sm text-gray-600">
                {new Date(article.createdAt).toDateString()}
              </p>
              <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                {article.description ?? "No description available."}
              </p>
              <a
                href={`/articles/${article._id}`}
                className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopArticles;
