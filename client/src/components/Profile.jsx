import React, { useState, useEffect } from "react";
import axios from "axios";
import {SERVER_URI} from "../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    role: "",
  });
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (storedUser) {
      setUser({
        firstName: storedUser.firstName,
        lastName: storedUser.lastName,
        role: storedUser.role,
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`${SERVER_URI}/profile`, user, {
        withCredentials: true,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success(res.data.message);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  const handleDelete = async () => {
    await axios.delete(SERVER_URI + "/profile", {
      withCredentials: true,
    });
    localStorage.removeItem("user");
    toast.success("Profile deleted successfully");
    toast.success("Redirecting you to signup page");
    setTimeout(() => {
      navigate("/signup");
    }, 2000);
  };

  return (
    <div className="w-[25rem] h-fit mx-auto m-12 p-8 sm:p-12 bg-white shadow-xl p-8 rounded-xl">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Profile Details
      </h2>

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            readOnly={!isEditing}
            value={user.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              isEditing ? "bg-white" : "bg-gray-100"
            } text-gray-800 focus:outline-none`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            readOnly={!isEditing}
            value={user.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              isEditing ? "bg-white" : "bg-gray-100"
            } text-gray-800 focus:outline-none`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Role
          </label>
          {isEditing ? (
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="attendee">Attendee</option>
              <option value="organizer">Organizer</option>
              <option value="admin">Admin</option>
            </select>
          ) : (
            <input
              type="text"
              name="role"
              readOnly
              value={user.role}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-3xl focus:outline-none"
            />
          )}
        </div>

        <button
          type="button"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={`w-full mt-4 font-semibold py-2.5 rounded-3xl cursor-pointer transition duration-300 ${
            isEditing
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isEditing ? "Save" : "Update"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="w-full bg-gray-100 border-2 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer text-red-500 mt-4 font-semibold py-2.5 rounded-3xl transition duration-300"
        >
          Delete My Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
