import axios from "axios";
import React from "react";
import {PRODUCTION_URI} from "../utils/constants";

const BookingForm = ({ event, user, onBookSuccess }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        PRODUCTION_URI + `/ticket/${event._id}/book`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      if (onBookSuccess) {
        onBookSuccess(event._id);
      }
    } catch (err) {
      console.error("Booking failed:", err.message);
    }
  };
  return (
    <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-xl p-8 mt-10 border border-purple-200">
      <h2 className="text-3xl font-semibold text-purple-700 mb-6 text-center">
        Book Your Ticket
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Event Name
          </label>
          <input
            type="text"
            readOnly
            value={event.name}
            className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-purple-300 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            readOnly
            value={`${user.firstName} ${user.lastName}`}
            className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-purple-300 rounded-md focus:outline-none"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Start Date
            </label>
            <input
              type="text"
              readOnly
              value={new Date(event.startDate).toLocaleDateString()}
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-purple-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-purple-700 mb-1">
              End Date
            </label>
            <input
              type="text"
              readOnly
              value={new Date(event.endDate).toLocaleDateString()}
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-purple-300 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Ticket Price
          </label>
          <input
            type="text"
            readOnly
            value={`₹${event.price}`}
            className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-purple-300 rounded-md focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-2.5 mt-4 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Book
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
