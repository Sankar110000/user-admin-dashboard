import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // user id being edited
  const [newName, setNewName] = useState("");
  
  const token = localStorage.getItem("token");

  const getUsers = async () => {
    try {
      const res = await fetch("https://project-backend-gd2d.onrender.com/api/user/getUsers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const jsonRes = await res.json();
      setAllUsers(jsonRes.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (usr) => {
    setEditingUser(usr._id);
    setNewName(usr.fullname);
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch("https://project-backend-gd2d.onrender.com/api/user/updateDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          fullname: newName,
        }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      toast.success("User updated successfully ✅");
      setEditingUser(null);
      getUsers();
    } catch (error) {
      console.log(error);
      toast.error("Error while updating user ❌");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4">Full Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((usr) => (
                <tr
                  key={usr._id}
                  className="border-b hover:bg-gray-50 transition duration-150"
                >
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {editingUser === usr._id ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="px-2 py-1 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    ) : (
                      usr.fullname
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{usr.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        usr.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {usr.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    {editingUser === usr._id ? (
                      <>
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                          onClick={() => handleUpdate(usr._id)}
                        >
                          Save
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                          onClick={() => setEditingUser(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="px-4 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                        onClick={() => handleEdit(usr)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-6 text-center text-gray-500 italic"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
