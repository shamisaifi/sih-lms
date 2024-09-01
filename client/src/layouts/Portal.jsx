import React from "react";
import Sidebar from "../components/ui/Sidebar";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";

const PortalLayout = () => {
  return (
    <>
      <Navbar/>
      <div className="flex items-start w-full h-full">
        <Sidebar />
        <main className="w-full h-full">
          <Routes>
            <Route path="/" element={<h1>Dashboard</h1>} />
            <Route path="courses" element={<h1>Users</h1>} />
            <Route path="saved" element={<h1>Products</h1>} />
            <Route path="orders" element={<h1>Orders</h1>} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default PortalLayout;
