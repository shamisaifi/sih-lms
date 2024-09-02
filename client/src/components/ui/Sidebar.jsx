import React, { useState } from "react";
import {
  MdSpaceDashboard,
  MdBook,
  MdChat,
  MdGrade,
  MdSettings,
} from "react-icons/md";
import { BiMenuAltRight, BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";

function Sidebar() {
  const sidebarContent = [
    { icon: <MdSpaceDashboard />, text: "Dashboard", navigateTo: "" },
    { icon: <MdBook />, text: "Courses", navigateTo: "courses" },
    { icon: <MdChat />, text: "Chats", navigateTo: "chats" },
    { icon: <MdGrade />, text: "Grades", navigateTo: "grades" },
    { icon: <MdSettings />, text: "Settings", navigateTo: "settings" },
  ];

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative flex items-start flex-col h-screen  py-2 px-4  transition-all duration-250 ease `}
      style={{ width: isOpen ? "18rem" : "4.5rem" }}
    >
      <div className="w-full overflow-hidden flex justify-end ">
        <div className="cursor-pointer" onClick={toggleSidebar}>
          {isOpen ? (
            <BiMenuAltRight className="w-7 h-7" />
          ) : (
            <BiMenuAltLeft className="w-7 h-7" />
          )}
        </div>
      </div>

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
