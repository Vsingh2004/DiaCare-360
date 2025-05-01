"use client";
import React from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import SmartMealPlanner from "@/components/Dashboard/SmartMealPlanner";
import Topbar from "@/components/Dashboard/Topbar";
import StandardMeals from "@/components/Dashboard/StandardMeals";
import MealPlanAI from "@/components/Dashboard/MealPlanAI";

const Page = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="relative">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <div className="h-16 shadow-md bg-white">
          <Topbar />
        </div>

        {/* Content below topbar */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <MealPlanAI />
          <SmartMealPlanner />
          <StandardMeals />
        </div>
      </div>
    </div>
  );
};

export default Page;
