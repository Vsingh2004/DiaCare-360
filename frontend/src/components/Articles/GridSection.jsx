"use client";
import React from "react";

const articleData = {
  featured: {
    id: 1,
    title: "Breakthrough Discovery in Diabetes Cure",
    imageUrl: "/images/articles/featured-diabetes.jpg",
  },
  gridArticles: [
    {
      id: 2,
      title: "10 Tips to Lower Blood Sugar Naturally",
      imageUrl: "/images/articles/tip1.jpg",
    },
    {
      id: 3,
      title: "Mental Health in Diabetics",
      imageUrl: "/images/articles/tip2.jpg",
    },
    {
      id: 4,
      title: "Herbal Solutions for Insulin Resistance",
      imageUrl: "/images/articles/tip3.jpg",
    },
    {
      id: 5,
      title: "Workout Plan for Better Glucose Control",
      imageUrl: "/images/articles/tip4.jpg",
    },
    {
      id: 6,
      title: "New Wearable Tech for Monitoring Sugar",
      imageUrl: "/images/articles/tip5.jpg",
    },
    {
      id: 7,
      title: "Importance of Sleep in Diabetic Patients",
      imageUrl: "/images/articles/tip6.jpg",
    },
  ],
};

const GridSection = () => {
  const { featured, gridArticles } = articleData;

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
          </div>
        </div>

        {/* 6 Grid Articles in Two Columns */}
        <div className="space-y-4">
          {gridArticles.slice(0, 3).map((article) => (
            <div key={article.id} className="flex items-center gap-4">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-20 h-20 object-cover rounded"
              />
              <p className="font-medium">{article.title}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {gridArticles.slice(3, 6).map((article) => (
            <div key={article.id} className="flex items-center gap-4">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-20 h-20 object-cover rounded"
              />
              <p className="font-medium">{article.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GridSection;
