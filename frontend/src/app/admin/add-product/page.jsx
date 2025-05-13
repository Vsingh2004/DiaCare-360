"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaProductHunt, FaInfoCircle, FaDollarSign, FaImage } from "react-icons/fa";

const AddProductSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Product name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
});

const AddProduct = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 👉 Image Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:5000/api/upload/products", formData);
      setImage(res.data.imageUrl); // Set Cloudinary URL as image
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // 👉 Formik for Form Submission
  const addProductForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },
    validationSchema: AddProductSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (!image) {
        toast.error("Please upload an image");
        return;
      }

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/products/add`,
          { ...values, image }
        );
        toast.success("Product added successfully");
        resetForm();
        router.push("/admin/add-product");
      } catch (error) {
        console.error("Error adding product:", error);
        toast.error("Failed to add product");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-white ml-65">
        <div className="w-full p-15 space-y-8 bg-white shadow-2xl rounded-2xl ">
          <h2 className="text-3xl font-bold text-center text-gray-800">Add Product</h2>
          <p className="text-center text-gray-500">Add a new product to the catalog</p>

          <form onSubmit={addProductForm.handleSubmit}>
            {/* Product Name Field */}
            <div className="relative mb-4">
              <FaProductHunt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="name"
                placeholder="Product Name"
                onChange={addProductForm.handleChange}
                value={addProductForm.values.name}
                className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
              />
            </div>

            {/* Description Field */}
            <div className="relative mb-4">
              <FaInfoCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <textarea
                id="description"
                placeholder="Product Description"
                onChange={addProductForm.handleChange}
                value={addProductForm.values.description}
                className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
              />
            </div>

            {/* Price Field */}
            <div className="relative mb-4">
              <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                id="price"
                placeholder="Price"
                onChange={addProductForm.handleChange}
                value={addProductForm.values.price}
                className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
              />
            </div>

            {/* Image Upload Field */}
            <div className="relative mb-6">
              <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
              />
              {uploading && <p className="text-gray-500 mt-2">Uploading image...</p>}
              {image && (
                <div className="mt-4">
                  <img src={image} alt="Preview" className="w-full h-40 object-cover rounded-md" />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white bg-[#25BF76] rounded-md hover:bg-[#1e9e62] transition-all"
              disabled={addProductForm.isSubmitting}
            >
              {addProductForm.isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
