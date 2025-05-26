'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Grid,
  BookOpen,
  List,
  PieChart,
  RefreshCw,
  Settings,
  User,
  LogOut
} from "lucide-react";

export default function Sidebar({ setActive }) {
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActiveLocal] = useState("Dashboard");

  const handleNavigation = (label) => {
    setActiveLocal(label);
    setActive(label);
  };

  const sidebarItems = [
    { label: "Dashboard", icon: Grid },
    { label: "Health Data Entry", icon: List },
    { label: "Generate Meal Plan", icon: PieChart },
    { label: "Customize Your Plan", icon: RefreshCw },
    { label: "Finalize & Download", icon: BookOpen },
    { label: "Wearable Devices (Coming Soon)", icon: RefreshCw },
    { label: "Profile", icon: User },
    { label: "Settings", icon: Settings },
    { label: "Logout", icon: LogOut },
  ];

  return (
    <div className="relative h-screen mt-18">
      <motion.div
        animate={{ width: isOpen ? 240 : 72 }}
        className="bg-[#E9F7F1] text-[#1E2A3A] h-full shadow-xl flex flex-col justify-between transition-all duration-300 overflow-hidden"
      >
        <div>
          <div className="flex items-center justify-between p-4">
            <h1 className={`text-xl font-bold ${!isOpen && "hidden"}`}>DiaCare</h1>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1E2A3A] transition"
            >
              {isOpen ? <ChevronLeft /> : <ChevronRight />}
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {sidebarItems.map(({ label, icon: Icon }) => {
              const isActive = active === label;
              return (
                <motion.div
                  key={label}
                  layout
                  onClick={() => handleNavigation(label)}
                  className={`flex items-center gap-3 p-3 cursor-pointer relative overflow-hidden ${
                    isActive ? "text-white" : "text-[#1E2A3A]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-[#4CAF93] rounded-lg z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className="z-10 pl-1">
                    <Icon size={20} />
                  </div>
                  {isOpen && <span className="z-10 font-medium">{label}</span>}
                </motion.div>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#CDF5E4]">
          {isOpen ? (
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="rounded-full w-8 h-8"
              />
              <div>
                <p className="text-sm font-semibold">Vaibhav</p>
                <p className="text-xs text-[#4CAF93]">Patient</p>
              </div>
            </div>
          ) : (
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="rounded-full w-8 h-8 mx-auto"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
