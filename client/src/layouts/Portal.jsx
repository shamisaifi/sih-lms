import React from "react";
import Sidebar from "../components/ui/Sidebar";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";

import { InstructorDashboard } from "@/components/instructor-dashboard";
import StudenDashboard from "@/components/student-dasboard";
import { InstructorCoursesPage } from "@/components/instructor-courses-page";
import { CourseCreator } from "@/components/course-creator";
import { StudentCourses } from "@/components/student-courses";
import { CourseViewPage } from "@/components/course-view-page";
import { LeaderboardPage } from "@/components/leaderboard-page";

import { useGlobalStore } from "@/stores/global-store";

const PortalLayout = () => {
  const { userType } = useGlobalStore();

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="flex items-start w-full h-full">
        <Sidebar />
        <main className="w-full p-6 bg-gray-50 overflow-y-auto max-h-[calc(100vh-5rem)]">
          <Routes>
            <Route
              path="/"
              element={
                userType === "student" ? (
                  <StudenDashboard />
                ) : (
                  <InstructorDashboard />
                )
              }
            />
            <Route
              path="courses"
              element={
                userType === "student" ? (
                  <StudentCourses />
                ) : (
                  <InstructorCoursesPage />
                )
              }
            />
            <Route path="courses/create-course" element={<CourseCreator />} />
            <Route path="courses/:courseId" element={<CourseViewPage />} />
            {userType === "student" && (
              <Route path="leaderboard" element={<LeaderboardPage />} />
            )}
            <Route path="saved" element={<h1>Products</h1>} />
            <Route path="orders" element={<h1>Orders</h1>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
