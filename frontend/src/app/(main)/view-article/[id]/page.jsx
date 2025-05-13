"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const ArticleDetail = () => {
  const router = useRouter();
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles/getbyid/${id}`);
        console.log("Fetched article:", res.data); 
        setArticle(res.data);
      } catch (error) {
        console.error("Failed to load article", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(()=>{
      fetchArticle();
    },[id])

  if (loading) return <div className="p-6 text-center text-gray-500">Loading article...</div>;

  if (!article) return <div className="p-6 text-center text-red-500">Article not found.</div>;

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">
      <img src={article.titleImage} alt={article.title} className="w-full h-64 object-cover mb-6 rounded-lg" />
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        By {article.author} · {new Date(article.createdAt).toDateString()}
      </p>
      <div className="prose max-w-none">{article.content}</div>
    </div>
  );
};

export default ArticleDetail;
