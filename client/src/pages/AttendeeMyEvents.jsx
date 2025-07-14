import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import mockEvents from "../utils/mockEvents";
import mockUser from "../utils/mockUser";
import { Link } from "react-router-dom";

export default function AttendeeMyEvents() {
    const user = mockUser;
    const today = new Date();

    const bookedEvents = mockEvents;


    return (
        <DashboardLayout>
            <h2 className="text-3xl text-primary font-bold mb-5">My Events</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {bookedEvents.map((event) => {
                    const hasEnded = new Date(event.endDate) < today;

                    return (
                        <div key={event.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-transform transform hover:scale-105">
                            <h3 className="text-lg font-semibold text-primary">{event.name}</h3>
                            <p className="text-sm text-gray-600">{event.startDate} → {event.endDate}</p>
                            <p className="text-sm text-gray-600">{event.type}</p>

                            <div className="flex flex-wrap gap-3 mt-3">
                                {!hasEnded && (
                                    <button onClick={() => alert("Booking cancelled successfully!")} className="text-sm bg-gray-200 text-red-600 px-4 py-1 rounded-2xl hover:bg-red-600 hover:text-white transition">
                                        Cancel
                                    </button>
                                )}

                                {hasEnded && (
                                    <Link to={`/feedback/${event.id}`}>
                                        <button className="text-sm bg-primaryDark text-white px-4 py-1 rounded-2xl hover:bg-primary transition">
                                            Give Feedback
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </DashboardLayout>
    )
}