"use client";
import React from "react";

const sampleArticles = [
  {
    id: 1,
    title: "Managing Diabetes Naturally",
    date: "April 20, 2025",
    imageUrl: "/images/articles/diabetes-naturally.jpg",
  },
  {
    id: 2,
    title: "Heart-Healthy Foods to Try Today",
    date: "April 18, 2025",
    imageUrl: "/images/articles/heart-health.jpg",
  },
  {
    id: 3,
    title: "Latest Study on Type-2 Diabetes",
    date: "April 15, 2025",
    imageUrl: "/images/articles/study-type2.jpg",
  },
  {
    id: 4,
    title: "Best Fitness Routines for Diabetics",
    date: "April 10, 2025",
    imageUrl: "/images/articles/fitness-diabetics.jpg",
  },
  {
    id: 5,
    title: "Best Fitness Routines for Diabetics",
    date: "April 10, 2025",
    imageUrl: "/images/articles/fitness-diabetics.jpg",
  },
  {
    id: 6,
    title: "Best Fitness Routines for Diabetics",
    date: "April 10, 2025",
    imageUrl: "/images/articles/fitness-diabetics.jpg",
  }
  // Add more articles here...
];

const TopArticles = () => {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Top Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {sampleArticles.map((article) => (
          <div
            key={article.id}
            className="relative rounded-xl overflow-hidden shadow-md group h-84"
            style={{
              backgroundImage: `url(${article.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300" />
            <div className="absolute bottom-0 p-4 text-white z-10">
              <p className="text-sm text-gray-200">{article.date}</p>
              <p className="font-semibold text-lg leading-snug">{article.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopArticles;
