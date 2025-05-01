"use client";
import React from "react";
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
  image: Yup.string().url("Invalid image URL").required("Image URL is required"),
});

const AddProduct = () => {
  const router = useRouter();

  const addProductForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      image: "",
    },
    validationSchema: AddProductSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/products/add`,
          values
        );
        toast.success("Product added successfully");
        resetForm();
        router.push("admin/product/add");
      } catch (error) {
        
        toast.error("Failed to add product");
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#a1ffce] to-[#faffd1]">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
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
              {addProductForm.touched.name && addProductForm.errors.name && (
                <div className="text-red-500 text-sm mt-1">{addProductForm.errors.name}</div>
              )}
            </div>

            {/* Description Field */}
            <div className="relative mb-4">
              <FaInfoCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <textarea
                id="description"
                placeholder="Product Description"
                onChange={addProductForm.handleChange}
                onBlur={addProductForm.handleBlur}
                value={addProductForm.values.description}
                className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
              />
              {addProductForm.touched.description && addProductForm.errors.description && (
                <div className="text-red-500 text-sm mt-1">{addProductForm.errors.description}</div>
              )}
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
              {addProductForm.touched.price && addProductForm.errors.price && (
                <div className="text-red-500 text-sm mt-1">{addProductForm.errors.price}</div>
              )}
            </div>

            {/* Image URL Field */}
            <div className="relative mb-6">
              <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="image"
                placeholder="Image URL"
                onChange={addProductForm.handleChange}
                value={addProductForm.values.image}
                className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
              />
              {addProductForm.touched.image && addProductForm.errors.image && (
                <div className="text-red-500 text-sm mt-1">{addProductForm.errors.image}</div>
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
