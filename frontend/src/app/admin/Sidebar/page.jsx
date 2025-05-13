"use client";
import React, { useState } from "react";
import { FaPlus, FaTasks, FaUsers, FaBox, FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { name: "Add Articles", icon: <FaPlus />, path: "/admin/add-articles" },
    { name: "Add Products", icon: <FaBox />, path: "/admin/add-product" },
    { name: "Manage Articles", icon: <FaEdit />, path: "/admin/manage-articles" },
    { name: "Manage Products", icon: <FaTasks />, path: "/admin/manage-products" },
    { name: "Manage Users", icon: <FaUsers />, path: "/admin/manage-users" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg transition-all duration-300 z-50 mt-18 mr-64 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="w-full py-4 text-white bg-gray-800 hover: focus:outline-none"
      >
        {isCollapsed ? "→" : "←"}
      </button>

      <ul className="mt-6 space-y-3">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center p-4 text-white hover:bg-gray-600 cursor-pointer transition duration-200"
            onClick={() => router.push(item.path)}
          >
            <div className="text-xl">{item.icon}</div>
            {!isCollapsed && <span className="ml-4">{item.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
