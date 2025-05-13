"use client";

import { Bell, Search, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Topbar = ({ user = { name: "Vaibhav" }, notifications = 3 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mt-18  bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm"
    >
      {/* Left: Greeting */}
      <div className="flex flex-col">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          Hello, {user.name} 👋
        </h2>
        <p className="text-sm text-muted-foreground">
          Welcome to DiaCare 360
        </p>
      </div>

      {/* Center: Command-style Search */}
      <div className="flex-1 hidden md:flex justify-center px-8">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search meals, devices, tips..."
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>
      </div>

      {/* Right: Notification + Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
          </Button>
          {notifications > 0 && (
            <Badge
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full"
              variant="destructive"
            >
              {notifications}
            </Badge>
          )}
        </div>

        <Avatar className="hover:shadow-md transition-shadow duration-300 cursor-pointer">
          <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="user" />
          <AvatarFallback>
            <User className="w-4 h-4 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      </div>
    </motion.div>
  );
};

export default Topbar;
