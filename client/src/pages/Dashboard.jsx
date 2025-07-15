import React, { useState } from "react";
import Events from "../components/Events";
import { Link } from "react-router-dom";
import Analytics from "./Analytics";
import AllUsers from "./AllUsers";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeBtn, setActiveBtn] = useState("analytics");
  if (user.role === "attendee") {
    return (
      <div className="flex m-10 flex-col items-center justify-center gap-[5rem]">
        <div className="w-full text-center text-5xl font-bold text-amber-800">
          <h1>
            DISCOVER ALL EVENTS HAPPENING <br /> NEAR YOU 🥂{" "}
          </h1>
        </div>
        <Events />
      </div>
    );
  } else if (user.role === "organizer") {
    return (
      <div className="flex m-10 flex-col items-center justify-center gap-[5rem]">
        <div className="w-full text-center text-5xl font-bold text-amber-800">
          <h1>Behind the Curtain</h1>
        </div>
        <div className="flex flex-col gap-[3rem] text-center text-xl font-bold">
          <Link
            to={"/schedule"}
            className="bg-green-300 p-2 rounded-xl hover:bg-green-400"
          >
            Create an Event
          </Link>
          <Link
            to={"/organizer/events"}
            className="bg-blue-300 p-2 rounded-xl hover:bg-blue-400"
          >
            Manage All Events
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex m-10 flex-col items-center justify-center gap-[5rem]">
        <h1 className="text-6xl font-bold text-amber-600">Admin Panel</h1>
        <ul className="flex gap-5 justify-center items-center">
          <button
            className={`text-xl font-semibold cursor-pointer p-2 rounded-2xl border transition-all duration-200 ${
              activeBtn === "analytics"
                ? "bg-white text-black border-black"
                : "bg-black text-white border-transparent"
            }`}
            onClick={() => setActiveBtn("analytics")}
          >
            Analytics
          </button>
          <button
            className={`text-xl font-semibold cursor-pointer p-2 rounded-2xl border transition-all duration-200 ${
              activeBtn === "users"
                ? "bg-white text-black border-black"
                : "bg-black text-white border-transparent"
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
};

export default Dashboard;
