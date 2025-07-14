import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <span className="text-white w-[7rem] font-bold">Hello, Aryan</span>
          <Link
            to={"/login"}
            className="text-white font-bold px-4 py-1.5 ml-4 hover:bg-red-600 bg-red-500 rounded-lg transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger */}
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 h-[12rem] flex flex-col justify-center w-full transition duration-200 ease-in-out">
          <ul className="flex flex-col text-center gap-3 text-white font-medium">
            <Link>
              <li className="hover:underline">About Us</li>
            </Link>
            <Link>
              <li className="hover:underline">Privacy Policy</li>
            </Link>
            <span className="block text-white mb-2">Hello, Aryan</span>
            <Link to={"/signup"} className="hover:underline">
              Login
            </Link>
          </ul>
        </div>
      )}
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
    </nav>
  );
};

export default Navbar;
