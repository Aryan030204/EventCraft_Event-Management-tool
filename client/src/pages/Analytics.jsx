import React, { useEffect, useState } from "react";
import { Pie, PolarArea, Radar, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";
import SERVER_URI from "../utils/constants";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale
);

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    tickets: 0,
    users: 0,
    organizers: 0,
    attendees: 0,
    feedbacks: 0,
  });

  const [chartType, setChartType] = useState("pie");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(SERVER_URI + "/analytics", {
        withCredentials: true,
      });
      setAnalytics({
        tickets: res.data.analytics.numOfTickets,
        users: res.data.analytics.numOfUsers,
        organizers: res.data.analytics.numOfOrganizers,
        attendees: res.data.analytics.numOfAttendees,
        feedbacks: res.data.analytics.numOfFeedbacks,
      });
    };
    fetchData();
  }, []);

  const data = {
    labels: ["Tickets", "Users", "Organizers", "Attendees", "Feedbacks"],
    datasets: [
      {
        label: "Count",
        data: [
          analytics.tickets,
          analytics.users,
          analytics.organizers,
          analytics.attendees,
          analytics.feedbacks,
        ],
        backgroundColor: ["purple", "blue", "green", "red", "yellow"],
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 border border-purple-200 w-[50rem]">
      <h2 className="text-3xl font-mono text-center mb-6">
        Platform Analytics Overview
      </h2>
      <ul className="flex gap-5 justify-center items-center w-full m-5">
        <button
          onClick={() => setChartType("pie")}
          className={`rounded-2xl p-2 text-lg font-semibold ${
            chartType === "pie"
              ? "bg-red-600 text-white"
              : "bg-white text-red-500 border border-red-500"
          }`}
        >
          Pie
        </button>
        <button
          onClick={() => setChartType("polar")}
          className={`rounded-2xl p-2 text-lg font-semibold ${
            chartType === "polar"
              ? "bg-green-600 text-white"
              : "bg-white text-green-500 border border-green-500"
          }`}
        >
          Polar Area
        </button>
        <button
          onClick={() => setChartType("radar")}
          className={`rounded-2xl p-2 text-lg font-semibold ${
            chartType === "radar"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-500 border border-blue-500"
          }`}
        >
          Radar
        </button>
        <button
          onClick={() => setChartType("scatter")}
          className={`rounded-2xl p-2 text-lg font-semibold ${
            chartType === "scatter"
              ? "bg-yellow-500 text-white"
              : "bg-white text-yellow-500 border border-yellow-500"
          }`}
        >
          Scatter Point
        </button>
      </ul>

      {/* Render Chart based on selected type */}
      <div className="mt-10">
        {chartType === "pie" && <Pie data={data} />}
        {chartType === "polar" && <PolarArea data={data} />}
        {chartType === "radar" && <Radar data={data} />}
        {chartType === "scatter" && (
          <Scatter
            data={{
              datasets: [
                {
                  label: "Analytics",
                  data: [
                    { x: 0, y: analytics.tickets },
                    { x: 1, y: analytics.users },
                    { x: 2, y: analytics.organizers },
                    { x: 3, y: analytics.attendees },
                    { x: 4, y: analytics.feedbacks },
                  ],
                  backgroundColor: "purple",
                },
              ],
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Analytics;
