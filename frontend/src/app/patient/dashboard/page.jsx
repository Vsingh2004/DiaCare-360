"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Patient/Dashboard/Sidebar";
import Topbar from "@/components/Patient/Dashboard/Topbar";
import SmartMealPlanner from "@/components/Patient/Dashboard/SmartMealPlanner";
import StandardMeals from "@/components/Patient/Dashboard/StandardMeals";
import PersonalizedPlans from "@/components/Patient/Dashboard/PersonalizedPlans";

const Page = () => {
  const [active, setActive] = useState("Dashboard");

  const renderContent = () => {
    switch (active) {
      case "Dashboard":
        return <div>🏡 Dashboard Component Here</div>;
      case "Personalized Plans":
        return <PersonalizedPlans />;
      case "Recipe Explorer":
        return <div>🔍 Recipe Explorer Component Here</div>;
      case "Food Tracker":
        return <SmartMealPlanner />;
      case "Calorie Counter":
        return <div>⚖️ Calorie Counter Component Here</div>;
      case "Swap Meal":
        return <StandardMeals />;
      case "Reports":
        return <div>📈 Reports Component Here</div>;
      case "Settings":
        return <div>⚙️ Settings Component Here</div>;
      case "Profile":
        return <div>👤 Profile Component Here</div>;
      case "Logout":
        return <div>🚪 Logout Component Here</div>;
      default:
        return <div>🏡 Dashboard Component Here</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setActive={setActive} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <div className="h-16 shadow-md bg-white z-10">
          <Topbar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 mt-18">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Page;
