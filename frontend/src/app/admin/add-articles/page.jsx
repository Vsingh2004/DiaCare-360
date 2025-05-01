"use client";
import React, {useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaHeading, FaInfoCircle, FaImage, FaTags } from "react-icons/fa";

const AddArticleSchema = Yup.object().shape({
  title: Yup.string().min(5, "Too Short!").required("Title is required"),
  titleImage: Yup.string().url("Invalid URL").required("Image URL is required"),
  content: Yup.string().min(50, "Content too short").required("Content is required"),
  author: Yup.string().required("Author is required"),
  category: Yup.string().required("Category is required"),
});

const AddArticle = () => {
  const router = useRouter();

  const addArticleForm = useFormik({
    initialValues: {
      title: "",
      titleImage: "",
      content: "",
      author: "",
      category: "",
    },
    validationSchema: AddArticleSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/articles/add`,
          values
        );
        toast.success("Article added successfully");
        resetForm();
        router.push("/admin/add-articles"); // or wherever you list all articles
      } catch (error) {
        toast.error("Failed to add article");
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100">
      <div className="w-full max-w-xl p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-4">Add Article</h2>
        <p className="text-center text-gray-500 mb-6">Publish a new article to the platform</p>

        <form onSubmit={addArticleForm.handleSubmit}>
          {/* Title */}
          <div className="relative mb-4">
            <FaHeading className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="title"
              placeholder="Article Title"
              onChange={addArticleForm.handleChange}
              onBlur={addArticleForm.handleBlur}
              value={addArticleForm.values.title}
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {addArticleForm.touched.title && addArticleForm.errors.title && (
              <div className="text-red-500 text-sm mt-1">{addArticleForm.errors.title}</div>
            )}
          </div>

          {/* Title Image */}
          <div className="relative mb-4">
            <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="titleImage"
              placeholder="Image URL"
              onChange={addArticleForm.handleChange}
              onBlur={addArticleForm.handleBlur}
              value={addArticleForm.values.titleImage}
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {addArticleForm.touched.titleImage && addArticleForm.errors.titleImage && (
              <div className="text-red-500 text-sm mt-1">{addArticleForm.errors.titleImage}</div>
            )}
          </div>

          {/* Content */}
          <div className="relative mb-4">
            <FaInfoCircle className="absolute left-3 top-4 text-gray-400" />
            <textarea
              id="content"
              placeholder="Article Content"
              rows="6"
              onChange={addArticleForm.handleChange}
              onBlur={addArticleForm.handleBlur}
              value={addArticleForm.values.content}
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {addArticleForm.touched.content && addArticleForm.errors.content && (
              <div className="text-red-500 text-sm mt-1">{addArticleForm.errors.content}</div>
            )}
          </div>
          {/* Author */}
          <div className="relative mb-6">
            <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="author"
              placeholder="Author Name"
              onChange={addArticleForm.handleChange}
              onBlur={addArticleForm.handleBlur}
              value={addArticleForm.values.author}
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {addArticleForm.touched.author && addArticleForm.errors.author && (
              <div className="text-red-500 text-sm mt-1">{addArticleForm.errors.author}</div>
            )}
          </div>

          {/* Category */}
          <div className="relative mb-6">
            <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="category"
              placeholder="Category (e.g. Health, Nutrition)"
              onChange={addArticleForm.handleChange}
              onBlur={addArticleForm.handleBlur}
              value={addArticleForm.values.category}
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {addArticleForm.touched.category && addArticleForm.errors.category && (
              <div className="text-red-500 text-sm mt-1">{addArticleForm.errors.category}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all"
            disabled={addArticleForm.isSubmitting}
          >
            {addArticleForm.isSubmitting ? "Adding Article..." : "Add Article"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
