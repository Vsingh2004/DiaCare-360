"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {menu_list} from "../../../../public/assets/assets"; // Adjust the import path as necessary
import {
  FaProductHunt,
  FaInfoCircle,
  FaDollarSign,
  FaImage,
  FaClipboardList,
  FaWarehouse,
  FaTags,
  FaBuilding,
  FaPercent,
  FaStar,
  FaListUl,
} from "react-icons/fa";

/* ===============================
   ✅ InputField Component Definition
================================ */
const InputField = ({ id, icon, formik, type = "text", placeholder, ...props }) => {
  return (
    <div className="relative mb-4">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</span>
      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          onChange={formik.handleChange}
          value={formik.values[id]}
          className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={formik.handleChange}
          value={formik.values[id]}
          className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
          {...props}
        />
      )}
    </div>
  );
};

/* ===============================
   ✅ Validation Schema
================================ */
const AddProductSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Product name is required"),
  description: Yup.string().required("Description is required"),
  shortDescription: Yup.string().required("Short description is required"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
  category: Yup.string().required("Category is required"),
  subcategory: Yup.string().required("Subcategory is required"),
  stock: Yup.number().required("Stock quantity is required").min(0, "Cannot be negative"),
  brand: Yup.string().required("Brand is required"),
  offers: Yup.string(),
  highlights: Yup.string(),
  ratings: Yup.number().min(0).max(5),
});

/* ===============================
   ✅ Main Component
================================ */
const AddProduct = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedRelated, setSelectedRelated] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [filteredRelatedProducts, setFilteredRelatedProducts] = useState([]);

  // Fetch all products for the "Related Products" list
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/getall`).then((res) => {
      setRelatedProducts(res.data);
    });
  }, []);

  // Image Upload Handler
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file)); // Keep this as is
  
    try {
      setUploading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setImages((prev) => [...prev, ...res.data.imageUrls.map(img => img.imageUrl)]);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

   
  // Formik for Form Submission
  const addProductForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      subcategory: "",
      stock: "",
      brand: "",
      offers: "",
      highlights: "",
      ratings: 0,
      isFeatured: false,
      tags: "",
    },
    validationSchema: AddProductSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (images.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }

      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/add`, {
          ...values,
          images,
          relatedProducts: selectedRelated,
          highlights: values.highlights.split(",").map((item) => item.trim()),
          tags: values.tags.split(",").map((tag) => tag.trim()),
        });
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

  // Handle Category Change and update subcategories
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const categoryData = menu_list.find((item) => item.menu_name === selectedCategory);

    setSubCategories(categoryData ? categoryData.subcategories : []);
    addProductForm.setFieldValue("category", selectedCategory);
    addProductForm.setFieldValue("subcategory", ""); // Reset subcategory when category changes
  };

  // Filter related products based on the selected subcategory
useEffect(() => {
  if (addProductForm.values.subcategory) {
    const filtered = relatedProducts.filter(
      (product) => product.subcategory === addProductForm.values.subcategory
    );
    setFilteredRelatedProducts(filtered);
  } else {
    setFilteredRelatedProducts([]);
  }
}, [addProductForm.values.subcategory, relatedProducts]);
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-white ml-65">
      <div className="w-full p-15 space-y-8 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Add Product</h2>

        <form onSubmit={addProductForm.handleSubmit}>
          <InputField id="name" icon={<FaProductHunt />} placeholder="Product Name" formik={addProductForm} />
          <InputField id="description" icon={<FaInfoCircle />} placeholder="Product Description" formik={addProductForm} type="textarea" />
          <InputField id="shortDescription" icon={<FaClipboardList />} placeholder="Short Description" formik={addProductForm} type="textarea" />
          <InputField id="price" icon={<FaDollarSign />} placeholder="Price" formik={addProductForm} />

          {/* Category Dropdown */}
          <select
            id="category"
            onChange={handleCategoryChange}
            value={addProductForm.values.category}
            className="w-full px-4 py-3 mb-4 border rounded-md"
          >
            <option value="">Select Category</option>
            {menu_list.map((item, index) => (
              <option key={index} value={item.menu_name}>
                {item.menu_name}
              </option>
            ))}
          </select>

          {/* Subcategory Dropdown */}
          <select
            id="subcategory"
            onChange={addProductForm.handleChange}
            value={addProductForm.values.subcategory}
            className="w-full px-4 py-3 mb-4 border rounded-md"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          <input type="file" multiple onChange={handleImageUpload} />
          {uploading && <p>Uploading...</p>}
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            {images.map((img, index) => (
              <img key={index} src={img} alt={`Uploaded ${index}`} className="w-full h-40 object-cover rounded-md" />
            ))}
          </div>

          <InputField id="stock" icon={<FaWarehouse />} placeholder="Stock Quantity" formik={addProductForm} />
          <InputField id="brand" icon={<FaBuilding />} placeholder="Brand Name" formik={addProductForm} />
          <InputField id="offers" icon={<FaPercent />} placeholder="Offers (e.g., 10% Off)" formik={addProductForm} />
          <InputField id="ratings" icon={<FaStar />} placeholder="Ratings (0 to 5)" formik={addProductForm} />
          <InputField id="highlights" icon={<FaListUl />} placeholder="Highlights (comma separated)" formik={addProductForm} />

          

          {/* Related Products */}
          <select
  multiple
  value={selectedRelated}
  onChange={(e) =>
    setSelectedRelated(Array.from(e.target.selectedOptions, (option) => option.value))
  }
  className="w-full px-4 py-3 border rounded-md mb-4"
>
  {filteredRelatedProducts.length > 0 ? (
    filteredRelatedProducts.map((product) => (
      <option key={product._id} value={product._id}>
        {product.name}
      </option>
    ))
  ) : (
    <option disabled>No related products available</option>
  )}
</select>


          <button type="submit" className="w-full py-3 text-white bg-[#25BF76] rounded-md hover:bg-[#1e9e62] transition-all" disabled={addProductForm.isSubmitting}>
            {addProductForm.isSubmitting ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
