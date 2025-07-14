import axios from "axios";
import React, { useEffect, useState } from "react";
import SERVER_URI from "../utils/constants";
import EventCard from "./EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  const fetchEvents = async () => {
    const res = await axios.get(SERVER_URI + "/events/discover", {
      withCredentials: true,
    });
    setEvents(res.data.events);
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {events.map((i) => (
        <EventCard key={i._id} event={i} />
      ))}
    </div>
  );
};

export default Events;
