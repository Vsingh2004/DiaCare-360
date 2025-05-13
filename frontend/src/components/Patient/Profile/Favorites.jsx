"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";


const Favorites = () => {
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("Products");
  const { currentUser } = useAppContext();
  const userId = currentUser?._id;

  const fetchFavorites = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/favorites/${userId}`
      );
      setProducts(response.data.products);
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const removeFavorite = async (itemId, type) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/remove-favorite/${type}/${itemId}`,
        { userId }
      );
      alert("Item removed from favorites");
      fetchFavorites();
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-6xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Favorites</h2>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "Products" ? "bg-[#25BF76] text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("Products")}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "Articles" ? "bg-[#25BF76] text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("Articles")}
        >
          Articles
        </button>
      </div>

      {activeTab === "Products" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p className="text-gray-600">No favorite products yet.</p>
          ) : (
            products.map((item) => (
              <div key={item._id} className="bg-gray-50 shadow-sm p-4 rounded-lg border border-gray-200 relative">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <button
                  onClick={() => removeFavorite(item._id, "products")}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                >
                  <AiFillDelete size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
