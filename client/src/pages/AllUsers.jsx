import React, { useEffect, useState } from "react";
import axios from "axios";
import {SERVER_URI} from "../utils/constants";
import { FaStar } from "react-icons/fa6";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${SERVER_URI}/users/all`, {
        withCredentials: true,
      });

      setUsers(res.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePromote = async (userId) => {
    await axios.patch(
      SERVER_URI + `/users/${userId}/promote`,
      {},
      {
        withCredentials: true,
      }
    );
    fetchUsers();
  };

  const handleReport = async (userId) => {
    await axios.patch(
      SERVER_URI + `/users/${userId}/report`,
      {},
      {
        withCredentials: true,
      }
    );
    fetchUsers();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl  mb-6 text-center text-blue-700">
        Registered Users
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-purple-200">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Stars</th>
              <th className="py-3 px-4 text-left">Reports</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-purple-50 transition duration-200"
              >
                <td className="py-3 px-4">
                  {user.firstName} {user.lastName}
                </td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 capitalize">{user.role}</td>
                <td className="py-3 px-4 capitalize">{user.stars}</td>
                <td className="py-3 px-4 capitalize">{user.reports}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handlePromote(user._id)}
                    className="bg-yellow-400 flex gap-2 text-white px-3 py-2 cursor-pointer rounded-md text-sm hover:bg-green-600"
                  >
                    Promote <FaStar size={20} />
                  </button>
                  <button
                    onClick={() => handleReport(user._id)}
                    className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                  >
                    Report
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No non-admin users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
