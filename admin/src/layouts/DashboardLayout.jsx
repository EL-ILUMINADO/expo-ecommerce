import React from "react";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      DashboardLayout
      <h1>Sidebar</h1>
      <h2>Navbar</h2>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
