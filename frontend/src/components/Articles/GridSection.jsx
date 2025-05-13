"use client";
import React, { useState } from "react";

const articleData = {
  featured: {
    id: 1,
    title: "Breakthrough Discovery in Diabetes Cure",
    imageUrl: "/images/articles/featured-diabetes.jpg",
    description:
      "A new scientific breakthrough offers hope for a potential cure for diabetes, changing the lives of millions worldwide.",
  },
};

const GridSection = ({ articles }) => {
  const { featured } = articleData;
  const [visibleArticles, setVisibleArticles] = useState(6);

  const handleLoadMore = () => {
    setVisibleArticles(visibleArticles + 6); // Load 6 more articles
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Explore More Articles</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Article - Full Height on First Column */}
        <div className="row-span-2 relative rounded-xl overflow-hidden shadow-lg h-[500px]">
          <img
            src={featured.imageUrl}
            alt={featured.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-end">
            <h3 className="text-white text-xl font-semibold">{featured.title}</h3>
            <p className="text-white text-sm">{featured.description}</p>
            <a
              href="#"
              className="text-white text-sm underline mt-2"
            >
              Read more
            </a>
          </div>
        </div>

        {/* Grid Articles */}
        <div className="space-y-4 lg:col-span-2">
          {articles.slice(0, visibleArticles).map((article) => (
            <div key={article._id} className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0 w-full md:w-40 h-40">
                <img
                  src={article.titleImage}
                  alt={article.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex flex-col justify-between">
                <p className="font-medium text-lg">{article.title}</p>
                <p className="text-sm text-gray-600">{article.description}</p>
                <a
                  href="#"
                  className="mt-2 text-blue-600 hover:underline"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {visibleArticles < articles.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Load More Articles
          </button>
        </div>
      )}
    </section>
  );
};

export default GridSection;
