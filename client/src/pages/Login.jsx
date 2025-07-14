import React from 'react';

export default function Login() {
  return (
    <div className="bg-offWhite min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-primary font-bold text-3xl mb-6">Log In</h2>

      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
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
            className="w-full border border-gray-300 rounded-3xl px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className=" w-full bg-primaryDark text-white py-2 rounded-3xl hover:bg-primary transition shadow-md"
        >
          Log In
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Not a member?{' '}
        <a href="/register" className="text-primary hover:underline font-medium">
          Register
        </a>
      </p>
    </div>
  );
}