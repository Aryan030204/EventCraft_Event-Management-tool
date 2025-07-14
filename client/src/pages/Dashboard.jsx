import React from "react";
import Events from "../components/Events";

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
    return <div></div>;
  } else {
    return <div></div>;
  }
};

export default Dashboard;
