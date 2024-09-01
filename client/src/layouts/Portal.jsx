import React from "react";
import Sidebar from "../components/ui/Sidebar"
import { Outlet } from "react-router-dom";

const PortalLayout = () => {
  return (
    <>
      <Sidebar />
      <h1>portal</h1>
    </>
  );
};

export default PortalLayout;
