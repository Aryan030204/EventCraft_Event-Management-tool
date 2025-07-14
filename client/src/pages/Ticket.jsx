import React from "react";
import { useLocation, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";

export default function Ticket() {
    const { state } = useLocation();
    console.log("State received in Ticket:", state);
    const { id } = useParams();

    if (!state?.event || !state?.userData) {
        return (
            <DashboardLayout>
                <p className="text-gray-500">Ticket Not Found.</p>
            </DashboardLayout>
        )
    }

    const { event, userData } = state;

    return (
        <DashboardLayout>
            <h2 className="text-3xl text-primary font-bold">Your Ticket</h2>
            <p className="text-gray-500 text-2xl">Thanks for registering, {userData.name}!</p>

            <div className="flex justify-center items-center mt-8">
                <div className="bg-white p-12 rounded-2xl shadow-md border border-gray-200 max-w-3xl mx-auto relative font-ticket text-2xl sm:text-2xl">
                    {/* Ticket Header */}
                    <div className="border-b pb-4 mb-4">
                        <h3 className="text-xl font-bold mb-1">{event.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">{event.type}</p>
                        <p className="text-xs text-gray-500">
                            {event.startDate} → {event.endDate}
                        </p>
                    </div>

                    {/* Ticket Body */}
                    <div className="space-y-2 text-sm text-gray-700">
                        <p><span className="font-semibold">Attendee:</span> {userData.email}</p>
                        <p><span className="font-semibold">Ticket ID:</span> EVT-{id}-TK{Math.floor(Math.random() * 9999999)}</p><br />
                        <p className="text-gray-500 italic">Show this e-ticket at entry.</p>
                    </div>

                    {/* Decorative elements */}
                    {/* Left Circle */}
                    <div className="absolute left-[-16px] top-[35%] h-8 w-8 rounded-full bg-offWhite"></div>

                    {/* Right Circle */}
                    <div className="absolute right-[-16px] top-[35%] h-8 w-8 rounded-full bg-offWhite"></div>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <Link to={`/myevents`}>
                <button className="text-sm bg-primaryDark text-white px-4 py-1 rounded-2xl hover:bg-primary transition">
                    Go to My Events
                </button>
            </Link>
            </div>
        </DashboardLayout>
    )
}