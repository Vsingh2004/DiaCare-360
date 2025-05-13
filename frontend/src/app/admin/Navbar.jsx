"use client"
import React from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";

const AdminNavbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md px-8 py-4 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <FaBars className="text-gray-600 text-2xl cursor-pointer hover:text-[#25BF76] transition" />
          <h1 className="text-2xl font-bold text-gray-800">DiaCare 360 Admin</h1>
        </div>

        <button className="flex items-center bg-[#25BF76] text-white px-4 py-2 rounded-full hover:bg-[#1E9E5D] transition">
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
""
