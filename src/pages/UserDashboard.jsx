// src/pages/Profile.jsx
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function UserDashboard() {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const [user, setUser] = useState();


  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const res = await fetch("https://project-backend-gd2d.onrender.com/api/user/updateDetails", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
     },
      body: JSON.stringify({ fullname: user.name, id: localUser._id }),
    });
    const jsonRes = await res.json();
    console.log(jsonRes)
    if(jsonRes.success == true){
        localStorage.setItem("user", JSON.stringify(jsonRes.user))
        setIsEditing(false);
        toast.success(jsonRes.message)
        navigate("/dashboard")
    }
  };
  useEffect(() => {
    console.log(localUser);
    setUser({
      name: localUser.fullname,
      email: localUser.email,
      role: localUser.role,
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
            alt="Profile"
            className="w-28 h-28 rounded-full shadow-md"
          />
          <h2 className="mt-4 text-xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-gray-500">role - {user?.role}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user?.name}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                isEditing ? "bg-white border-gray-300" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user?.email}
              disabled
              className="w-full mt-1 px-4 py-2 border rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={user?.role}
              disabled
              className="w-full mt-1 px-4 py-2 border rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="w-1/2 mr-2 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition duration-200"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="w-1/2 ml-2 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition duration-200"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
