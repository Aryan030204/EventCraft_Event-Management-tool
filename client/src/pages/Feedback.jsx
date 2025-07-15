import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Feedback = () => {
  const [comment, setComment] = useState("");
  const [data, setData] = useState({});
  const id = useParams().eventid;

  const getEvent = async () => {
    const res = await axios.get(SERVER_URI + `/events/${id}`, {
      withCredentials: true,
    });
    setData(res.data.event);
  };
  useEffect(() => {
    getEvent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      SERVER_URI + `/event/${data._id}/feedback/submit`,
      {},
      {
        withCredentials: true,
      }
    );
    toast.success("feedback submitted successfully");
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-purple-100 to-white px-4 py-10 w-[30rem]">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl border border-purple-300">
        <h2 className="text-3xl font-semibold text-purple-700 text-center mb-6">
          Event Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Event Name
            </label>
            <input
              type="text"
              readOnly
              value={data.name}
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-purple-300 rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Your Feedback
            </label>
            <textarea
              required
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your thoughts about the event..."
              className="w-full px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition duration-300"
          >
            Submit Feedback
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Feedback;
