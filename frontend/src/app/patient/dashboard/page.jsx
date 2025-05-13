"use client";
import React from "react";
import Sidebar from "@/components/Patient/Dashboard/Sidebar";
import SmartMealPlanner from "@/components/Patient/Dashboard/SmartMealPlanner";
import Topbar from "@/components/Patient/Dashboard/Topbar";
import StandardMeals from "@/components/Patient/Dashboard/StandardMeals";
import MealPlanAI from "@/components/Patient/Dashboard/MealPlanAI";

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
