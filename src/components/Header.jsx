import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear("user");
    localStorage.clear("token");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <nav className="bg-gray-300 text-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img
          src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <span className="font-medium text-black">{user?.fullname}</span>
      </div>
      <div>
        <button
          className="text-black px-4 py-2 rounded border cursor-pointer border-gray-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Header;
