import React from "react";
import Sidebar from "../components/ui/Sidebar";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";

import Dashboard from "../pages/dashboard";
import Courses from "../pages/courses";

const PortalLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-start w-full h-full">
        <Sidebar />
        <main className="w-full h-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="/saved" element={<h1>Products</h1>} />
            <Route path="/orders" element={<h1>Orders</h1>} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default PortalLayout;
