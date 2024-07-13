// src/components/Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { currentUser,logout } = useAuth();

  useEffect(() => {
    if(currentUser){
        logout();
        navigate('/login')
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-xl font-bold">Logging out...</h1>
      </div>
    </div>
  );
};

export default Logout;
