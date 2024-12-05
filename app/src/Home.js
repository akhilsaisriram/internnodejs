import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("isAllowed")) {
      console.log("Not authorized. Redirecting to login.");
      navigate("/login");
    }
  }, [navigate]); // Dependency ensures this runs only when `navigate` changes

  const handleLogout = () => {
    sessionStorage.removeItem("isAllowed");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Home Page!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
