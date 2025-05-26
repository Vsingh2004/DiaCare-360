"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Patient/Sidebar";
import Topbar from "@/components/Patient/Topbar";
import PatientDashboard from "@/components/Patient/Dashboard";
import HealthEntry from "@/components/Patient/HealthEntry";
import GeneralPlan from "@/components/Patient/GeneralPlan";
import CustomizePlan from "@/components/Patient/CustomizePlan" 


const Page = () => {
  const [active, setActive] = useState("Dashboard");

  const renderContent = () => {
    switch (active) {
      case "Dashboard":
        return <PatientDashboard/>;
      case "Health Data Entry":
        return <HealthEntry />;
        case "Generate Meal Plan":
          return <GeneralPlan />;
          case "Customize Your Plan":
            return <CustomizePlan />;
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
