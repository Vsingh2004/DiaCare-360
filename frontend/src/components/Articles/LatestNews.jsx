"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const LatestNewsSection = () => {
  const [news, setNews] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Replace with your news API endpoint
    axios
      .get("https://newsapi.org/v2/everything?q=diabetes&language=en&sortBy=publishedAt&apiKey=048998749cbf428280c9d2a38f2ed174")
      .then((res) => setNews(res.data.articles))
      .catch((err) => console.error("Error fetching news", err));
  }, []);

  const displayedNews = showAll ? news : news.slice(0, 4); // show only top 4 initially

  return (
    <section className="py-8 px-4 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Latest in Diabetes & Healthcare</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedNews.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <img src={item.urlToImage} alt="news" className="w-full h-48 object-cover rounded-md mb-3" />
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description?.slice(0, 100)}...</p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm mt-2 inline-block"
            >
              Read full article →
            </a>
          </div>
        ))}
      </div>

      {!showAll && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Show All Latest News
          </button>
        </div>
      )}
    </section>
  );
};

export default LatestNewsSection;
