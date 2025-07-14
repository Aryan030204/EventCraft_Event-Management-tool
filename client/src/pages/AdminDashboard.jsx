import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const mockUsers = [
    {
        id: 1,
        fName: "Paras",
        lName: "Kumar",
        email: "paras@example.com",
        role: "attendee",
    },
    {
        id: 2,
        fName: "Riya",
        lName: "Sharma",
        email: "riya@events.com",
        role: "organizer",
    },
    {
        id: 3,
        fName: "Admin",
        lName: "User",
        email: "admin@eventcraft.com",
        role: "admin",
    },
];

export default function AdminDashboard() {
    return (
        <DashboardLayout>
            <h2 className="text-2xl text-gray-500 mb-2">Hello, {mockUsers[2].fName}</h2>

                <h2 className="text-3xl text-primary font-bold mb-8">My Dashboard</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {mockUsers.filter((user) => user.role !== 'admin').map((user) => (
                        <div key={user.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-transform transform hover:scale-105">
                            <h3 className="text-xl font-semibold text-primary">{user.fName} {user.lName}</h3>

                            <span className="text-md">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                            <p className="text-sm text-gray-600 mb-5">{user.email}</p>

                            <span className="bg-gray-100 px-4 py-1 border rounded-2xl text-sm">
                                <a className="text-red-600 hover:underline cursor-pointer">Report</a>
                                <span className="text-gray-400"> | </span>
                                <a className="text-yellow-600 hover:underline cursor-pointer">Star</a>
                            </span>
                        </div>
                    ))}
                </div>
        </DashboardLayout>
    )
}