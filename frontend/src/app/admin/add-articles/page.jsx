"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaHeading, FaInfoCircle, FaImage, FaTags } from "react-icons/fa";
import  {articles_categories}  from "../../../../public/assets/articles_categories.js"; 


const AddArticleSchema = Yup.object().shape({
  title: Yup.string().min(5, "Too Short!").required("Title is required"),
  titleImage: Yup.string().url("Invalid URL").required("Image URL is required"),
  shortDescription: Yup.string().min(20, "Description too short").required("Description is required"),
  content: Yup.string().min(50, "Content too short").required("Content is required"),
  author: Yup.string().required("Author is required"),
  category: Yup.string().required("Category is required"),
  displayIn: Yup.array().min(1, "At least one section must be selected").required("Display sections are required"),
});

const AddArticle = () => {
  const router = useRouter();
  const [selectedSections, setSelectedSections] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const sections = [
    "EditorsChoice",
    "TopArticles",
    "GridSection",
    "InfiniteScroller",
  ];

  const addArticleForm = useFormik({
    initialValues: {
      title: "",
      titleImage: "",
      shortDescription: "",
      content: "",
      author: "",
      category: "",
      displayIn: [],
    },
    validationSchema: AddArticleSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/articles/add`,
          { ...values, category: selectedCategories, displayIn: selectedSections }
        );
        toast.success("Article added successfully");
        resetForm();
        setSelectedSections([]); // Reset selected sections
        router.push("/admin/manage-articles"); 
      } catch (error) {
        toast.error("Failed to add article");
        setSubmitting(false);
      }
    },
  });

  const handleCheckboxChange = (section) => {
    setSelectedSections((prevSelected) => {
      if (prevSelected.includes(section)) {
        const newSelection = prevSelected.filter((item) => item !== section);
        addArticleForm.setFieldValue("displayIn", newSelection); // <-- Update Formik
        return newSelection;
      } else {
        const newSelection = [...prevSelected, section];
        addArticleForm.setFieldValue("displayIn", newSelection); // <-- Update Formik
        return newSelection;
      }
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown visibility
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  }

  return (
    <div className="flex items-center justify-center min-h-screen ml-65  bg-gray-200 mt-12">
      <div className="w-full  p-15 bg-white shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-4">Add Article</h2>
        <p className="text-center text-gray-500 mb-6">Publish a new article to the platform</p>

        <form onSubmit={addArticleForm.handleSubmit}>
          
          {/* Display In (Custom Dropdown with Checkboxes) */}
          <div className="relative mb-4">
            <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="displayIn"
              value={selectedSections.join(", ")}
              onClick={toggleDropdown}
              placeholder="Select Sections"
              readOnly
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
            />
            {isDropdownOpen && (
              <div className="absolute left-0 w-full mt-2 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
                <div className="p-2">
                  {sections.map((section) => (
                    <label key={section} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={section}
                        checked={selectedSections.includes(section)}
                        onChange={() => handleCheckboxChange(section)}
                        className="text-blue-500"
                      />
                      <span>{section}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {addArticleForm.touched.displayIn && addArticleForm.errors.displayIn && (
              <div className="text-red-500 text-sm mt-1">{addArticleForm.errors.displayIn}</div>
            )}
          </div>

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
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
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
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
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
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
            />
            {addArticleForm.touched.content && addArticleForm.errors.content && (
              <div className="text-red-500 text-sm mt-1">{addArticleForm.errors.content}</div>
            )}
          </div>

          <div className="relative mb-4">
            <FaInfoCircle className="absolute left-3 top-4 text-gray-400" />
            <textarea
              id="shortDescription"
              placeholder="Short Description"
              rows="3"
              onChange={addArticleForm.handleChange}
              onBlur={addArticleForm.handleBlur}
              value={addArticleForm.values.shortDescription}
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
            />
            {addArticleForm.touched.shortDescription && addArticleForm.errors.shortDescription && (
              <div className="text-red-500 text-sm mt-1">{addArticleForm.errors.shortDescription}</div>
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
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
            />
            {addArticleForm.touched.author && addArticleForm.errors.author && (
              <div className="text-red-500 text-sm mt-1">{addArticleForm.errors.author}</div>
            )}
          </div>


          {/* Category Dropdown */}
          <div className="relative mb-4">
            <button
              type="button"
              onClick={toggleCategoryDropdown}
              className="w-full text-left px-4 py-3 border rounded-md bg-white focus:outline-none"
            >
              Select Categories
            </button>
            {isCategoryDropdownOpen && (
              <div className="absolute left-0 w-full mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                {Object.entries(articles_categories).map(([group, items]) => (
                  <div key={group} className="p-2">
                    <p className="font-semibold mb-2">{group}</p>
                    {items.map((item) => (
                      <label key={item} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={item}
                          checked={selectedCategories.includes(item)}
                          onChange={() => handleCategoryChange(item)}
                          className="text-blue-500"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-[#25BF76] rounded-md hover:bg-[#1e9e62] transition-all"
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
