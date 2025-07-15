import axios from "axios";
import React from "react";
import { PRODUCTION_URI } from "../utils/constants";
import { toast, ToastContainer } from "react-toastify";

const BookingForm = ({ event, user, onBookSuccess }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        PRODUCTION_URI + `/ticket/${event._id}/book`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message);
      if (onBookSuccess) {
        onBookSuccess(event._id);
      }
    } catch (err) {
      console.log("Booking failed:", err.message);
      toast.error(err.message);
    }
  };
  return (
    <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-xl p-8 mt-10 border border-gray-200">
      <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
        Book Your Ticket
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            Event Name
          </label>
          <input
            type="text"
            readOnly
            value={event.name}
            className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-blue-300 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            Your Name
          </label>
          <input
            type="text"
            readOnly
            value={`${user.firstName} ${user.lastName}`}
            className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-blue-300 rounded-md focus:outline-none"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Start Date
            </label>
            <input
              type="text"
              readOnly
              value={new Date(event.startDate).toLocaleDateString()}
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-blue-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-blue-600 mb-1">
              End Date
            </label>
            <input
              type="text"
              readOnly
              value={new Date(event.endDate).toLocaleDateString()}
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-blue-300 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            Ticket Price
          </label>
          <input
            type="text"
            readOnly
            value={`₹${event.price}`}
            className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-blue-300 rounded-md focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2.5 mt-4 rounded-3xl hover:bg-blue-700 transition duration-300"
        >
          Book
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BookingForm;
