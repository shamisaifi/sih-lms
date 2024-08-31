import React from "react";
import {
  MdSpaceDashboard,
  MdBook,
  MdChat,
  MdGrade,
  MdSettings,
} from "react-icons/md";

function Sidebar() {
  return (
    <div className="flex flex-col h-screen bg-gray-800 p-4 text-white w-64">
      <div className="flex items-center justify-center mb-8">
        <img
          src="https://via.placeholder.com/40"
          alt="Logo"
          className="w-10 h-10 rounded-full mr-2"
        />
        <h1 className="text-xl font-bold">GyaanSetu</h1>
      </div>

      <nav className="flex flex-col space-y-4">
        <a
          href="#"
          className="flex items-center p-2 rounded-md focus:bg-gray-600 hover:bg-gray-700"
        >
          <MdSpaceDashboard className="mr-3" /> Dashboard
        </a>
        <a
          href="#"
          className="flex items-center p-2 rounded-md focus:bg-gray-600 hover:bg-gray-700"
        >
          <MdBook className="mr-3" /> Courses
        </a>
        <a
          href="#"
          className="flex items-center p-2 rounded-md focus:bg-gray-600 hover:bg-gray-700"
        >
          <MdChat className="mr-3" /> Chats
        </a>
        <a
          href="#"
          className="flex items-center p-2 rounded-md focus:bg-gray-600 hover:bg-gray-700"
        >
          <MdGrade className="mr-3" /> Grades
        </a>
        <a
          href="#"
          className="flex items-center p-2 rounded-md focus:bg-gray-600 hover:bg-gray-700"
        >
          <MdSettings className="mr-3" /> Settings
        </a>
      </nav>

      <div className="mt-auto">
        <p className="text-center text-gray-400">&copy; 2023 GyaanSetu</p>
      </div>
    </div>
  );
}

export default Sidebar;
