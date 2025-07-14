import React, { useState } from "react";
import axios from "axios";
import SERVER_URI from "../utils/constants";
import { toast, ToastContainer } from "react-toastify";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    price: 0,
    registrations: true,
    type: "commercial",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${SERVER_URI}/event/create`, formData, {
        withCredentials: true,
      });
      toast.success("Event created successfully!");
      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        price: 0,
        registrations: true,
        type: "commercial",
      });
      console.log(res.data);
    } catch (err) {
      console.error("Error creating event:", err);
      toast.error("Failed to create event.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-xl p-8">
      <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
        Create New Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Event Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            required
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="commercial">Commercial</option>
            <option value="education">Education</option>
            <option value="conference">Conference</option>
            <option value="kids">Kids</option>
            <option value="music">Music</option>
          </select>
        </div>

        {/* Start & End Dates */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ticket price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Registration Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="registrations"
            name="registrations"
            checked={formData.registrations}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label htmlFor="registrations" className="text-sm text-gray-700">
            Registrations Open
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2.5 mt-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateEvent;
