import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URI } from "../utils/constants";
import { toast, ToastContainer } from "react-toastify";
import Dashboard from "../pages/Dashboard";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // ✅ useState for user
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    await axios.post(
      SERVER_URI + "/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    setIsLoggedIn(false);
    setUser(null); // ✅ reset user state
    localStorage.removeItem("user");
    toast.success("logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-blue-800 flex justify-between shadow-md z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex w-full items-center justify-between">
        {/* Logo / Title */}
        <div>
          <Link to={"/"}>
            <img src={logo} alt="logo_avatar" className="w-[12rem]" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex w-full gap-6 text-white ml-10 text-xl font-medium">
          <Link to={"/about"}>
            <li className="cursor-pointer hover:underline transition">
              About Us
            </li>
          </Link>
          <Link to={"/policy"}>
            <li className="cursor-pointer hover:underline transition">
              Privacy Policy
            </li>
          </Link>
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn && user && (
            <div className="flex items-center justify-center">
              <div className="flex gap-4 items-center justify-center w-[10rem] mx-8">
                <Link to={"/profile"}>
                  <CgProfile size={30} className="bg-white rounded-full" />
                </Link>
                <span className="relative top-1 text-white font-semibold mb-2">
                  Hello, {user.firstName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 p-1 font-semibold text-white rounded-sm hover:bg-red-600 cursor-pointer"
              >
                Logout
              </button>
              <Link
                to={"/dashboard"}
                className="ml-5 bg-white p-2 rounded-xl hover:bg-blue-950 hover:text-white font-bold transition ease-in-out duration-200"
                element={<Dashboard />}
              >
                Dashboard
              </Link>
            </div>
          )}
          {!isLoggedIn && (
            <Link
              to={"/login"}
              className="text-white font-bold px-4 py-1.5 ml-4 hover:bg-red-600 bg-red-500 rounded-lg transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {/* mobile view */}

      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col justify-center w-full transition duration-200 ease-in-out">
          <ul className="flex flex-col text-center gap-3 text-white font-medium">
            <Link to="/about">
              <li className="hover:underline">About Us</li>
            </Link>
            <Link to="/policy">
              <li className="hover:underline">Privacy Policy</li>
            </Link>

            {isLoggedIn && user && (
              <>
                <div className="flex flex-col gap-4 items-center justify-center">
                  <Link to="/profile">
                    <CgProfile size={30} className="bg-white rounded-full" />
                  </Link>
                  <span className="text-white font-semibold">
                    Hello, {user.firstName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 p-2 font-semibold text-white rounded-sm hover:bg-red-600 cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}

            {!isLoggedIn && (
              <Link to="/login">
                <li className="hover:underline">Login</li>
              </Link>
            )}
          </ul>
        </div>
      )}

      {/* Mobile Hamburger */}
      <div className="md:hidden self-center mr-2">
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6 text-white cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <ToastContainer />
    </nav>
  );
};

export default Navbar;
