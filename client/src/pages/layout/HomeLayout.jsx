import React from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {

  const {currentUser} = useAuth();


  return (
    <div className="h-screen flex">
      <Sidebar/>
      <Outlet/>
    </div>
  );
};

export default HomeLayout;
