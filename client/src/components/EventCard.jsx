import axios from "axios";
import {PRODUCTION_URI} from "../utils/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event, onBook, isBooked }) => {
  const { _id, name, startDate, endDate, price, registrations } = event;
  const [ended, setEnded] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const today = new Date();
    const eventEnd = new Date(endDate);
    if (today > eventEnd && event.ticketsBooked.includes(user._id)) {
      setEnded(true);
    }
  }, []);

  const onCancel = async () => {
    await axios.delete(PRODUCTION_URI + `/ticket/${event._id}/cancel`, {
      withCredentials: true,
    });
  };
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6 w-full max-w-xl border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <div className="flex flex-col items-center gap-[1rem]">
          <span
            className={`text-sm font-semibold p-4 text-center py-1 rounded-full ${
              registrations
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {registrations ? "Registrations Open" : "Registrations Closed"}
          </span>
        </div>
      </div>

      <div className="text-gray-600">
        {ended && (
          <Link
            to={`/feedback/${_id}`}
            target="_blank"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 inline-block text-sm rounded-3xl text-center"
          >
            Give Feedback
          </Link>
        )}
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

      {isBooked ? (
        <button
          onClick={() => onCancel()}
          className="mt-5 w-full bg-gray-100 border-2 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer text-red-500 mt-4 font-semibold py-2.5 rounded-3xl transition"
        >
          Cancel Ticket
        </button>
      ) : (
        <button
          onClick={() => onBook(_id)}
          disabled={!registrations}
          className={`mt-5 w-full py-2 px-4 text-white font-semibold rounded-3xl transition ${
            registrations
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Book Ticket
        </button>
      )}
    </div>
  );
};
export default EventCard;
