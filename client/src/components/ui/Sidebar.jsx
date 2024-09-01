import React, { useState } from "react";
import {
  MdSpaceDashboard,
  MdBook,
  MdChat,
  MdGrade,
  MdSettings,
} from "react-icons/md";

import { BiMenuAltRight, BiMenuAltLeft } from "react-icons/bi";

function Sidebar() {
  const sidebarContent = [
    { icon: <MdSpaceDashboard />, text: "Dashboard" },
    { icon: <MdBook />, text: "Courses" },
    { icon: <MdChat />, text: "Chats" },
    { icon: <MdGrade />, text: "Grades" },
    { icon: <MdSettings />, text: "Settings" },
  ];

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative flex items-start flex-col h-screen bg-gray-800 p-4 text-white transition duration-150 ease-out ${
        isOpen ? "w-64" : "w-20"
      } `}
    >
      <div className=" w-full overflow-hidden flex items-center justify-between mb-8 ">
        {isOpen && (
          <div className="flex items-center justify-center">
            <img
              src="public\assets\logo\GYAANSETU__3_-removebg-preview.png"
              alt="Logo"
              className=" w-10 h-8 rounded-full mr-2"
            />

            <h1 className="text-xl font-bold tracking-wider">
              <span className="text-orange-400">Gyaan</span>
              <span className="text-yellow-400">Setu</span>
            </h1>
          </div>
        )}

        <div className="ml-2 cursor-pointer " onClick={toggleSidebar}>
          {isOpen ? (
            <BiMenuAltRight className="w-7 h-7" />
          ) : (
            <BiMenuAltLeft className="w-7 h-7" />
          )}
        </div>
      </div>

      <nav className=" w-full flex flex-col space-y-4 mt-5 ">
        {sidebarContent?.map((item) => {
          return (
            <a
              href="#"
              className="w-full  flex items-center p-2 rounded-md focus:bg-gray-600 hover:bg-gray-700"
            >
              <span className="mr-3 text-2xl">{item.icon}</span>{" "}
              {isOpen ? item.text : ""}
            </a>
          );
        })}
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
