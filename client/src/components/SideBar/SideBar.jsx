import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdGroups,
  MdChat,
  MdAmpStories,
  MdOutlineSettings,
} from "react-icons/md";

import { CiLogout } from "react-icons/ci";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { currentUser } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  const toggleshow = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="w-16 bg-gray-100 flex flex-col items-center py-4 space-y-4 border-r border-gray-300">
      <NavLink to="/home" className="w-10 h-10 mb-6">
        <img className='w-8 h-8 bg-gray-500 rounded-full mr-4' src={currentUser.photoUrl} alt="User"/>
      </NavLink>
      <div className="flex flex-col space-y-6 flex-1">
        <NavLink
          to="/home/chats"
          className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer"
        >
          <MdChat className="w-full h-full" />
        </NavLink>
        <NavLink
          to="/home/groups"
          className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer"
        >
          <MdGroups className="w-full h-full" />
        </NavLink>
        <NavLink
          to="/home/stories"
          className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer"
        >
          <MdAmpStories className="w-full h-full" />
        </NavLink>
      </div>
      {showSettings && (
        <div className="fixed left-4 bottom-28 z-50 flex flex-col">
          <div className="p-4 bg-white shadow-lg border-b-2 border-indigo-500">
            <button>Languages</button>
          </div>
          <div className="p-4 bg-white shadow-lg border-b-2 border-indigo-500">
            <button>User Profile</button>
          </div>
          <div className="p-4 bg-white shadow-lg">
            <button>Themes</button>
          </div>
        </div>
      )}
      <div className="w-8 h-8">
        <MdOutlineSettings onClick={toggleshow} className="w-full h-full" />
      </div>
      <NavLink to="/logout" className="w-8 h-8">
        <CiLogout className="w-full h-full" />
      </NavLink>
    </div>
  );
};

export default Sidebar;
