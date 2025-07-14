import React, { useState } from 'react';

export default function Register() {
  const [role, setRole] = useState('attendee');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-offWhite px-4">
      <h2 className="text-primary font-bold text-3xl mb-6">Register</h2>

      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-3xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-3xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full border border-gray-300 rounded-3xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full border border-gray-300 rounded-3xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-3xl px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="admin">Admin</option>
            <option value="attendee">Attendee</option>
            <option value="organizer">Organizer</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primaryDark text-white py-2 rounded-3xl hover:bg-primary shadow-md transition"
        >
          Register
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Already a member?{' '}
        <a href="/login" className="text-primary hover:underline font-medium">
          Log In
        </a>
      </p>
    </div>
  );
}