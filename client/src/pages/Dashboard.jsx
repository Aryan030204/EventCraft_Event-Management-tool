import React, { useState } from "react";
import Events from "../components/Events";
import { Link } from "react-router-dom";
import Analytics from "./Analytics";
import AllUsers from "./AllUsers";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeBtn, setActiveBtn] = useState("analytics");
  if (user.role === "attendee"){
    return (
      <div className="flex m-10 flex-col items-center justify-center gap-[5rem]">
        <div className="w-full text-4xl font-bold text-blue-700">
          <h1>
            Discover All Events Happening <br /> Around You 🥂{" "}
          </h1>
        </div>
        <Events />
      </div>
    );
  } else if (user.role === "organizer") {
    return (
      <div className="flex m-10 flex-col items-center justify-center gap-[5rem]">
        <div className="w-full text-4xl font-bold text-blue-600">
          <h1>Behind the Curtains</h1>
        </div>
        <div className="flex flex-col gap-[3rem] text-center text-xl font-semibold">
          <Link
            to={"/schedule"}
            className="bg-blue-600 text-white px-4 py-2 rounded-3xl hover:bg-blue-700 transition"
          >
            Create an Event
          </Link>
          <Link
            to={"/organizer/events"}
            className="bg-transparent border-2 px-4 py-2 border-blue-600 text-blue-600 rounded-3xl hover:border-blue-800 hover:text-blue-800 transition"
          >
            Manage Events
          </Link>
        </div>
      </div>
    );} else {
    return (
      <div className="flex m-10 flex-col items-center justify-center gap-[5rem]">
        <h1 className="text-4xl font-bold text-blue-600">Admin Panel</h1>
        <ul className="flex gap-5 justify-center items-center">
          <button
            className={`text-md font-semibold cursor-pointer p-2.5 rounded-4xl border-blue-600 transition-all duration-200 ${
              activeBtn === "analytics"
                ? "bg-white text-blue-600 border-2"
                : "bg-blue-600 text-white border-2"
            }`}
            onClick={() => setActiveBtn("analytics")}
          >
            Analytics
          </button>
          <button
            className={`text-md font-semibold cursor-pointer p-2.5 rounded-4xl border-blue-600 transition-all duration-200 ${
              activeBtn === "users"
                ? "bg-white text-blue-600 border-2"
                : "bg-blue-600 text-white border-2"
            }`}
            onClick={() => setActiveBtn("users")}
          >
            Manage Users
          </button>
        </ul>
        {
          activeBtn === "analytics" ? (
            <Analytics/>
          ): (
            <AllUsers/>
          )
        }
      </div>
      );
      }
  }

export default Dashboard;
