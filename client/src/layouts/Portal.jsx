import React from "react";
import Sidebar from "../components/ui/Sidebar";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";

import { Dashboard } from "@/pages";
import { InstructorCoursesPage } from "@/components/instructor-courses-page";
import { CourseCreator } from "@/components/course-creator";
import SearchResults from "@/pages/searchResults";

const PortalLayout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="flex items-start w-full h-full">
        <Sidebar />
        <main className="w-full p-6 bg-gray-50 overflow-y-auto max-h-[calc(100vh-5rem)]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="courses" element={<InstructorCoursesPage />} />
            <Route path="courses/create-course" element={<CourseCreator />} />
            <Route path="saved" element={<h1>Products</h1>} />
            <Route path="orders" element={<h1>Orders</h1>} />
            <Route path="search" element={<SearchResults />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
