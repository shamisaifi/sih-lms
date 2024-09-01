import React from "react";
import Sidebar from "../components/ui/Sidebar"
import { Outlet } from "react-router-dom";

const portal = () => {
  return (
    <>
      <Sidebar />
      <h1>portal</h1>
    </>
  );
};

export default portal;
