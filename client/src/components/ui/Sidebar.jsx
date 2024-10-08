import React, { useState } from "react";
import {
  MdSpaceDashboard,
  MdBook,
  MdChat,
  MdGrade,
  MdSettings,
  MdLeaderboard,
} from "react-icons/md";
import { Link } from "react-router-dom";

function Sidebar() {
  const sidebarContent = [
    { icon: <MdSpaceDashboard />, text: "Dashboard", navigateTo: "" },
    { icon: <MdBook />, text: "Courses", navigateTo: "courses" },
    { icon: <MdLeaderboard />, text: "Leaderboard", navigateTo: "leaderboard" },
    { icon: <MdChat />, text: "Chats", navigateTo: "chats" },
    { icon: <MdGrade />, text: "Grades", navigateTo: "grades" },
    { icon: <MdSettings />, text: "Settings", navigateTo: "settings" },
  ];

  const [isOpen, setIsOpen] = useState(false);


  return (
    <div
      className={`relative flex items-start flex-col h-screen  py-2 px-4  transition-all duration-500 ease `}
      style={{ width: isOpen ? "18rem" : "4.5rem" }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
    

      <nav className="w-full flex flex-col space-y-4 mt-5">
        {sidebarContent.map((item, index) => (
          <Link
            key={index}
            to={item.navigateTo}
            className={`gap-3 flex items-center p-2 rounded-md focus:bg-gray-300 hover:bg-gray-200 transition-all duration-300 ease-in-out`}
            
          >
            <span className="text-2xl">{item.icon}</span>
            {isOpen && <span>{item.text}</span>}
          </Link>
        ))}
      </nav>

      {isOpen && (
        <div className="mt-auto">
          <p className="text-center text-gray-400">&copy; 2024 GyaanSetu</p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
