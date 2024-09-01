import React from "react";
import Sidebar from "../components/ui/Sidebar"

const portal = () => {
  return (
    <>
      <div className="w-full flex bg-gray-500 ">
        <Sidebar />
        <div className="border-2 border-red-500 w-full">hello</div>
      </div>
    </>
  );
};

export default portal;
