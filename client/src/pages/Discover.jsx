import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import EventCard from "../components/EventCard";
import mockUser from "../utils/mockUser";
import mockEvents from "../utils/mockEvents";

export default function Discover() {
  const [searchTerm, setSearchTerm] = useState("");
  const user = mockUser;

  const filteredEvents = mockEvents.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <h2 className="text-2xl text-gray-500 mb-2">Hello, {user.fName}</h2>

      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-primary font-bold text-3xl">Discover Events</h2>
        <input
          type="text"
          placeholder="Search events here..."
          className="px-8 py-2 border rounded-3xl text-center focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No events match your search.</p>
      )}
    </DashboardLayout>
  );
}