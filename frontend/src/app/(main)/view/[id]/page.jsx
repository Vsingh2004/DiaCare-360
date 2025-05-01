'use client';
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const ViewProduct = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null); // Placeholder for future image selection
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/getbyid/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProduct(data);
        // Use the first image as the selected image
        if (data.image) {
          setSelectedImage(data.image);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => type === "inc" ? prev + 1 : prev > 1 ? prev - 1 : 1);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name}(s) to cart`);
    alert(`${quantity} ${product.name}(s) added to cart!`);
  };

  const handleBuyNow = () => {
    console.log(`Buying ${quantity} ${product.name}(s) now`);
  };

  const handleWishlist = () => {
    if (!wishlist.includes(product._id)) {
      setWishlist([...wishlist, product._id]);
      alert(`Added ${product.name} to your wishlist`);
    } else {
      alert(`This product is already in your wishlist.`);
    }
  };

  const handleViewProduct = (productId) => {
    router.push(`/viewproduct/${productId}`);
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!product || !product.image) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 mt-20">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 mb-14">
        {/* Left Side - Image (Single Image for Now) */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full max-w-md object-cover rounded-lg shadow-md transition-all"
          />
          {/* Placeholder for future image thumbnails */}
          {/* When you have multiple images, replace this with a map of images */}
          <div className="flex gap-4 mt-4">
            {/* <img
              src={product.imageUrl}
              alt="thumbnail-1"
              className="w-16 h-16 object-cover rounded-lg cursor-pointer transition-all hover:scale-105"
              onClick={() => handleImageClick(image)}
            /> */}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-2">{product.shortDescription}</p>
          <p className="text-2xl font-semibold mb-4 text-green-600">${product.price}</p>

          {/* Price after Discount */}
          {product.discountedPrice && (
            <p className="text-xl text-gray-500 line-through">${product.discountedPrice}</p>
          )}

          {/* Rating & Reviews */}
          <div className="flex items-center mb-6">
            <span className="text-yellow-500">★★★★☆</span>
            <p className="ml-2 text-sm text-gray-600">4.5 (200 reviews)</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <button
              className="px-3 py-1 bg-gray-300 text-black rounded-l"
              onClick={() => handleQuantityChange("dec")}
            >
              -
            </button>
            <span className="px-5 py-1 border-t border-b">{quantity}</span>
            <button
              className="px-3 py-1 bg-gray-300 text-black rounded-r"
              onClick={() => handleQuantityChange("inc")}
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Buy Now
            </button>
            <button
              onClick={handleWishlist}
              className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg"
            >
              Add to Wishlist
            </button>
          </div>

          {/* Full Description */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Related Products Section (Leave placeholder for now) */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((related) => (
            <div
              key={related._id}
              className="border p-4 rounded-lg cursor-pointer hover:shadow-lg transition"
              onClick={() => handleViewProduct(related._id)}
            >
              <img
                src={related.image}
                alt={related.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold">{related.name}</h3>
              <p className="text-green-600 font-bold">${related.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
