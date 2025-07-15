import axios from "axios";
import React, { useEffect, useState } from "react";
import {SERVER_URI} from "../utils/constants";
import EventCard from "./EventCard";
import BookingForm from "./BookingForm"; // import the form component

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookedEventIds, setBookedEventIds] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchEvents = async () => {
    try {
      const res = await axios.get(SERVER_URI + "/events/discover", {
        withCredentials: true,
      });
      setEvents(res.data.events);
      setFilteredEvents(res.data.events);

      const booked = res.data.events
        .filter((e) => e.ticketsBooked.includes(user._id))
        .map((e) => e._id);
      setBookedEventIds(booked);
    } catch (err) {
      console.log("Error fetching events", err.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (filterType === "all") {
      setFilteredEvents(events);
    } else if (filterType === "booked") {
      const booked = events.filter((e) => e.ticketsBooked.includes(user._id));
      setFilteredEvents(booked);
    } else {
      const filtered = events.filter((e) => e.type === filterType);
      setFilteredEvents(filtered);
    }
  }, [filterType, events]);

  const handleBookClick = (eventId) => {
    const eventToBook = events.find((e) => e._id === eventId);
    setSelectedEvent(eventToBook);
  };

  return (
    <div className="p-4">
      {/* Filter menu */}
      <div className="flex flex-wrap items-center gap-3 mb-6 justify-center sm:justify-start">
        {[
          "all",
          "commercial",
          "education",
          "conference",
          "kids",
          "music",
          "booked",
        ].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
              filterType === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {type === "booked" ? "My Booked Events" : type}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            No events found.
          </p>
        ) : (
          filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onBook={handleBookClick}
              isBooked={bookedEventIds.includes(event._id)}
            />
          ))
        )}
      </div>

      {/* Booking Form Overlay */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black opacity-90 z-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl relative opacity-100 z-41">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
            >
              ✕
            </button>
            <BookingForm
              event={selectedEvent}
              user={user}
              onBookSuccess={(eventId) => {
                setBookedEventIds((prev) => [...prev, eventId]);
                setSelectedEvent(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
