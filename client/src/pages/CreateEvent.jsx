import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

export default function CreateEvent() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        type: "",
        entryEnabled: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Event Created:", formData);
        setFormData({
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            type: "",
            entryEnabled: true
        });
    }
    return (
        <DashboardLayout>
            <div className="bg-offWhite min-h-screen flex flex-col items-center justify-center px-4">
                <h2 className="text-3xl font-bold text-primary mb-6">Create New Event</h2>
                <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-3xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            className="w-full border border-gray-300 rounded-3xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            rows={4}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Start Date</label>
                        <input
                            name="startDate"
                            type="date"
                            required
                            className="w-full border border-gray-300 rounded-3xl px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">End Date</label>
                        <input
                            name="endDate"
                            type="date"
                            required
                            className="w-full border border-gray-300 rounded-3xl px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Type</label>
                        <input
                            name="type"
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-3xl px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="entryEnabled"
                                checked={formData.entryEnabled}
                                onChange={handleChange}
                                className="accent-primary"
                            />
                            <span className="text-gray-700">Entry Enabled</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className=" w-full bg-primaryDark text-white py-2 rounded-3xl hover:bg-primary transition shadow-md"
                    >
                        Create
                    </button>
                </form>
            </div>
        </DashboardLayout>
    )
}