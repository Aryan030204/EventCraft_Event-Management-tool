import React from "react";
import Events from "../components/Events";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
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
          <Link to={"/schedule"} className="bg-green-300 p-2 rounded-xl hover:bg-green-400">
            Create an Event
          </Link>
          <Link to={"/organizer/events"} className="bg-blue-300 p-2 rounded-xl hover:bg-blue-400">
            Manage All Events
          </Link>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Dashboard;
