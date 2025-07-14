import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import mockEvents from "../utils/mockEvents";
import mockUser from "../utils/mockUser";

export default function AttendeeEventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = mockEvents.find(event => event.id === parseInt(id));
    const user = mockUser;

    const handleBook = () => {
        navigate(`/ticket/${event.id}`, {
            state: { event, userData: { name: `${user.fName} ${user.lName}`, email: user.email } }
        });
    }
    if (!event) {
        return (
            <DashboardLayout>
                <p className="text-gray-500">Event Not Found.</p>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="space-y-4 flex justify-between">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-primary font-bold text-3xl mr-5">{event.name}</h2>
                        <span className="bg-gray-100 px-4 py-1 border rounded-2xl text-sm flex gap-2 items-center">
                            <a className="text-green-600 hover:underline cursor-pointer">Likes</a>
                            <span className="text-gray-400">|</span>
                            <a className="text-red-600 hover:underline cursor-pointer">Dislikes</a>
                        </span>
                    </div>
                    <p className="text-gray-600 mt-8 text-xl"><b>Description:</b><br />{event.description}</p>
                </div>
                <div className="flex flex-col p-5 border rounded-xl shadow-md">
                    <p className="text-sm text-gray-600 mb-2"><strong>Start Date:</strong> {event.startDate}</p>
                    <p className="text-sm text-gray-600 mb-2"><strong>End Date:</strong> {event.endDate}</p>
                    <p className="text-sm text-gray-600 mb-2"><strong>Type:</strong> {event.type}</p>
                    <p className="text-sm text-gray-600 mb-4"><strong>Entry:</strong> {event.registrations}</p>
                    <button className="mt-3 text-sm bg-primaryDark text-white px-4 py-1 rounded-2xl shadow hover:bg-primary" onClick={handleBook}>Book</button>
                </div>
            </div>
        </DashboardLayout>
    );
}