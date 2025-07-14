import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import EventCard_Org from "../components/EventCard_Org";
import mockUser from "../utils/mockUser";
import mockEvents from "../utils/mockEvents";
import { Link } from "react-router-dom";

export default function OrganizerDashboard() {
    const user = mockUser;
    return (
        <DashboardLayout>
            <h2 className="text-2xl text-gray-500 mb-2">Hello, {user.fName}</h2>

            <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-primary font-bold text-3xl">My Events</h2>
                <Link to={`/organizer/create`}>
                    <button className="text-sm bg-primaryDark text-white px-5 py-2 rounded-3xl hover:bg-primary transition">
                        + Create New Event
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {mockEvents.map((event) => (
                    <EventCard_Org key={event.id} event={event} />
                ))}
            </div>
        </DashboardLayout>
    );
}