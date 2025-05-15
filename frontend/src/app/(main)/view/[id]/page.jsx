'use client';
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaPinterest, FaWhatsapp } from 'react-icons/fa';
import { ShoppingCart, CreditCard, heart } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const ViewProduct = () => {
  const { id } = useParams();
  const router = useRouter();


  // State management
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  // Fetch product details, related products, and reviews
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/getbyid/${id}`);
        console.log("API Response:", response.data);

        setProduct(response.data || {});
        setReviews(response.data.reviews || []);

        // 🔥 Fetch related products based on subcategory
      if (response.data.subcategory) {
        const relatedResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/related`, {
          params: {
            subcategory: response.data.subcategory,
            productId: response.data._id,
          },
        });

        setRelatedProducts(relatedResponse.data.relatedProducts || []);
      }

      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

    // ✅ Add to Cart
    const handleAddToCart = () => {
      addToCart(product);
      setAddedToCart(true);
      toast.success("Product added to cart!");
    };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!product) return <div className="text-center mt-20">Product not found.</div>;

  return (
    <div className="p-6 mt-20">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Swiper
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="w-full h-[400px] rounded-lg"
          >
            {/* Optional chaining to avoid errors */}
            {product?.images?.length > 0 ? (
              product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))
            ) : (
              <div className="text-center">No Images Available</div>
            )}
          </Swiper>
          {product?.offers && (
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">
              {product.offers}
            </button>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product?.name || "Product Name"}</h1>
          <p className="text-lg text-gray-600">{product?.shortDescription || "No description available."}</p>
          <p className="text-2xl font-semibold text-green-600">${product?.price || "0.00"}</p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Product Highlights</h2>
            <ul className="list-disc pl-5">
              {product?.highlights?.length > 0 ? (
                product.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))
              ) : (
                <li>No Highlights Available</li>
              )}
            </ul>
          </div>

          <div className="flex gap-4">
          <Button
            size="lg"
            className={` flex justify-center items-center px-6 py-4 text-md ${addedToCart ? "bg-green-500" : "bg-[#046c4e]"} text-white rounded-lg hover:bg-[#035c41] `}
            onClick={handleAddToCart}
            disabled={addedToCart}
          >
            <ShoppingCart size={16} />
            {addedToCart ? "Added to Cart" : "Add to Cart"}
          </Button>
          <a href="/patient/cart">
          <Button
            size="lg"
            className={` flex justify-center items-center px-6 py-4 text-md bg-blue-400 hover:bg-blue-800 text-white rounded-lg  `}
            onClick = {handleAddToCart}
            disabled={addedToCart}
          >
            <CreditCard size={16} />
            Buy Now
          </Button>
          </a>
            <button className="px-6 py-2 bg-pink-600 text-white rounded-lg">Add to Wishlist</button>
          </div>

          <div className="mt-6 flex gap-4">
            <FaFacebook size={24} className="text-blue-600 cursor-pointer" />
            <FaTwitter size={24} className="text-blue-400 cursor-pointer" />
            <FaPinterest size={24} className="text-red-600 cursor-pointer" />
            <FaWhatsapp size={24} className="text-green-600 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Product Description</h2>
        <p>{product?.description || "No detailed description available."}</p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">Shipping & Return Policy</h2>
        <p>Free shipping on orders over ₹1000. Easy returns within 30 days.</p>
      </div>

      <div className="mt-10">
  <h2 className="text-xl font-semibold">Related Products</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
    {relatedProducts.length > 0 ? (
      relatedProducts.map((item) => (
        <div key={item._id} className="p-4 border rounded-lg">
          <img
            src={item?.images?.[0] || "/placeholder.png"}
            alt={item.name}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="mt-2 font-semibold">{item.name}</h3>
          <p className="text-green-600">${item.price}</p>
          <Link 
          href={`/view/${item._id}`}
           className="mt-4 flex items-center justify-center gap-1 px-3 py-1.5 text-md bg-[#022418] text-[#fff] t rounded-md hover:bg-[#aee3d3] hover:text-[#022418] transition">View Product</Link>
        </div>
      ))
    ) : (
      <p>No related products found.</p>
    )}
  </div>
</div>


      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="p-5 border rounded-lg shadow-sm hover:shadow-md transition duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    {'⭐'.repeat(review.rating)}
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{review.comment}</p>
                <button className="text-blue-500 hover:underline text-sm">Report</button>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
