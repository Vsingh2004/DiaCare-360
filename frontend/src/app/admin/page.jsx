"use client";
import React from "react";
import AdminNavbar from "./Navbar";
import AdminSidebar from "./Sidebar/page.jsx";
import { FaUser, FaBox, FaClipboard, FaBookOpen } from "react-icons/fa";

const AdminLandingPage = () => {
  const stats = [
    {
      title: "Total Users",
      count: 150,
      icon: <FaUser className="text-[#25BF76] text-3xl" />,
      bgColor: "bg-white",
    },
    {
      title: "Total Products",
      count: 120,
      icon: <FaBox className="text-[#2A7BA5] text-3xl" />,
      bgColor: "bg-white",
    },
    {
      title: "Total Articles",
      count: 45,
      icon: <FaClipboard className="text-[#E8F6FF] text-3xl" />,
      bgColor: "bg-white",
    },
    {
      title: "Total Orders",
      count: 200,
      icon: <FaBookOpen className="text-[#25BF76] text-3xl" />,
      bgColor: "bg-white",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="relative">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className=" flex flex-col flex-1">
        <div className="h-16 shadow-md ">
        <AdminNavbar />
        </div>
        {/* Content below topbar */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 ml-65 mt-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`${stat.bgColor} p-6 rounded-xl shadow-md flex items-center space-x-4 hover:shadow-lg transition`}
            >
              <div className="p-3 rounded-full">{stat.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {stat.title}
                </h3>
                <p className="text-2xl text-gray-900 font-bold">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLandingPage;
