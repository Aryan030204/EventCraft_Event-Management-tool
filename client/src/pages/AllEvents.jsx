import React, { useEffect, useState } from "react";
import axios from "axios";
import {PRODUCTION_URI} from "../utils/constants";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${PRODUCTION_URI}/me/events/scheduled`, {
        withCredentials: true,
      });
      setEvents(res.data.events);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`${PRODUCTION_URI}/event/${eventId}`, {
        withCredentials: true,
      });
      setEvents(events.filter((e) => e._id !== eventId));
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  const handleEdit = (event) => {
    setEditingEventId(event._id);
    setEditedEvent({ ...event });
  };

  const handleSave = async (eventId) => {
    try {
      await axios.put(`${PRODUCTION_URI}/event/${eventId}`, editedEvent, {
        withCredentials: true,
      });
      setEditingEventId(null);
      fetchEvents(); // Refresh after save
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedEvent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-blue-600 m-8">
        Your Scheduled Events
      </h2>

      {events.length === 0 ? (
        <h3 className="text-center text-gray-500 text-xl mt-10">
          You have not scheduled any events yet.
        </h3>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5">
          {events.map((event) => {
            const isEditing = editingEventId === event._id;
            return (
              <div
                key={event._id}
                className="bg-blue-50 shadow-xl border border-gray-200 rounded-2xl w-[20rem] p-6 space-y-4 m-4"
              >
                <div className="space-y-2 text-sm text-gray-800">
                  <div>
                    <strong>Event Name:</strong>
                    {isEditing ? (
                      <input
                        name="name"
                        value={editedEvent.name}
                        onChange={handleChange}
                        className="w-full mt-1 px-2 py-1 border rounded-3xl"
                      />
                    ) : (
                      <p>{event.name}</p>
                    )}
                  </div>

                  <div>
                    <strong>Start Date:</strong>
                    {isEditing ? (
                      <input
                        name="startDate"
                        type="date"
                        value={editedEvent.startDate?.slice(0, 10)}
                        onChange={handleChange}
                        className="w-full mt-1 px-2 py-1 border rounded-3xl"
                      />
                    ) : (
                      <p>{new Date(event.startDate).toLocaleDateString()}</p>
                    )}
                  </div>

                  <div>
                    <strong>End Date:</strong>
                    {isEditing ? (
                      <input
                        name="endDate"
                        type="date"
                        value={editedEvent.endDate?.slice(0, 10)}
                        onChange={handleChange}
                        className="w-full mt-1 px-2 py-1 border rounded-3xl"
                      />
                    ) : (
                      <p>{new Date(event.endDate).toLocaleDateString()}</p>
                    )}
                  </div>

                  <div>
                    <strong>Price:</strong>
                    {isEditing ? (
                      <input
                        name="price"
                        type="number"
                        value={editedEvent.price}
                        onChange={handleChange}
                        className="w-full mt-1 px-2 py-1 border rounded-3xl"
                      />
                    ) : (
                      <p>₹{event.price}</p>
                    )}
                  </div>

                  <div>
                    <strong>Type:</strong>
                    {isEditing ? (
                      <select
                        name="type"
                        value={editedEvent.type}
                        onChange={handleChange}
                        className="w-full mt-1 px-2 py-1 border rounded-3xl"
                      >
                        <option value="commercial">Commercial</option>
                        <option value="education">Education</option>
                        <option value="conference">Conference</option>
                        <option value="kids">Kids</option>
                        <option value="music">Music</option>
                      </select>
                    ) : (
                      <p className="capitalize">{event.type}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <strong>Registrations:</strong>
                    {isEditing ? (
                      <input
                        type="checkbox"
                        name="registrations"
                        checked={editedEvent.registrations}
                        onChange={handleChange}
                      />
                    ) : (
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          event.registrations
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {event.registrations ? "Open" : "Closed"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  {isEditing ? (
                    <button
                      onClick={() => handleSave(event._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white w-full mt-4 font-semibold py-2.5 rounded-3xl cursor-pointer transition duration-300"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(event)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white w-full mt-4 font-semibold py-2.5 rounded-3xl cursor-pointer transition duration-300"
                    >
                      Update
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 w-full mt-4 rounded-3xl font-semibold cursor-pointer transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
