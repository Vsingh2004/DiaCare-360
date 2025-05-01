"use client";
import React, { useEffect, useRef, useState } from "react";

const mockArticles = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Article ${i + 1}`,
  imageUrl: `/images/articles/hscroll-${(i % 6) + 1}.jpg`,
  date: `2025-04-${(i % 28) + 1}`,
}));

const ArticleCard = ({ title, imageUrl, date }) => (
  <div className="min-w-[250px] mr-4 flex-shrink-0 rounded-lg bg-white shadow-md overflow-hidden">
    <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
    <div className="p-3">
      <h3 className="font-semibold text-md">{title}</h3>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
  </div>
);

const InfiniteScroller = () => {
  const [articles, setArticles] = useState(mockArticles.slice(0, 12));
  const scrollerRef = useRef(null);
  const [leftPos, setLeftPos] = useState(0);

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLeftPos((prev) => prev - 1);
    }, 20); // Adjust speed here (lower = faster)

    return () => clearInterval(interval);
  }, []);

  // Infinite loop effect
  useEffect(() => {
    if (Math.abs(leftPos) >= scrollerRef.current.scrollWidth / 2) {
      setLeftPos(0); // Reset to start for seamless loop
    }
  }, [leftPos]);

  // Duplicate cards for seamless scroll illusion
  const duplicated = [...articles, ...articles];

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Trending Articles</h2>
      <div
        className="overflow-hidden relative w-full"
        style={{ height: "280px" }}
      >
        <div
          ref={scrollerRef}
          className="flex absolute"
          style={{
            transform: `translateX(${leftPos}px)`,
            transition: "transform 0.02s linear",
            width: `${duplicated.length * 260}px`,
          }}
        >
          {duplicated.map((article, idx) => (
            <div key={idx}>
              <ArticleCard {...article} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfiniteScroller;
