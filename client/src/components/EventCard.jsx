import React from "react";

const EventCard = ({ event, onBook }) => {
  const { name, startDate, endDate, price, registrations } = event;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6 w-full max-w-xl border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <span
          className={`text-sm font-semibold px-3 py-1 rounded-full ${
            registrations
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {registrations ? "Registrations Open" : "Registrations Closed"}
        </span>
      </div>

      <div className="text-gray-600 space-y-1">
        <p>
          <strong>Start:</strong> {new Date(startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>End:</strong> {new Date(endDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Price:</strong> ₹{price}
        </p>
      </div>

      <button
        onClick={() => onBook(event._id)}
        disabled={!registrations}
        className={`mt-5 w-full py-2 px-4 text-white font-semibold rounded-lg transition ${
          registrations
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Book Ticket
      </button>
    </div>
  );
};

export default EventCard;
