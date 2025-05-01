"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const EditorsChoice = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles/getall`);
        setArticles(res.data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div className="px-6 py-10 text-center text-gray-500">Loading articles...</div>;
  }

  return (
    <section className="px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">⭐ Editor’s Choice</h2>
      {articles.length === 0 ? (
        <p className="text-gray-500">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Link key={article._id} href={`/view-article/${article._id}`}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer">
                <img
                  src={article.titleImage}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <span className="inline-block text-sm text-blue-600 font-medium mb-1">
                    ★ Editor’s Pick
                  </span>
                  <h3 className="font-semibold text-lg">{article.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(article.createdAt).toDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default EditorsChoice;
