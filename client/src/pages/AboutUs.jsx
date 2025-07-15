import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10 text-gray-800">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-md">
        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">
          About EventCraft
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          <strong>EventCraft</strong> is a modern, full-stack event management
          platform designed to simplify and streamline the process of
          organizing, managing, and attending events of all types. Whether it’s
          a small educational seminar or a large-scale commercial concert,
          EventCraft provides a unified interface and robust backend to handle
          all aspects of event coordination. The platform is built with a strong
          focus on user experience, security, and scalability, ensuring it can
          serve both casual users and professional event organizers with equal
          efficiency.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          The application supports three distinct user roles:{" "}
          <strong>Organizers</strong>, who can create and manage events;{" "}
          <strong>Attendees</strong>, who can browse events, book and cancel
          tickets, and submit feedback; and <strong>Admins</strong>, who oversee
          the entire system, manage users, analyze activity through analytics,
          and maintain community integrity by promoting or reporting users. From
          ticket generation to feedback collection, every feature is designed to
          offer transparency, efficiency, and accessibility.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          The frontend is developed using <strong>React.js</strong> with
          responsive design principles to ensure smooth usability across all
          device sizes. The backend is built using <strong>Node.js</strong> and{" "}
          <strong>Express</strong>, connected to a <strong>MongoDB</strong>{" "}
          database for dynamic data handling. With secure JWT-based
          authentication and role-based access control, users can confidently
          interact with the system according to their permissions.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-indigo-500">
          Our Mission
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          The goal behind EventCraft is to create a one-stop, hassle-free
          solution for both event managers and attendees. We wanted to eliminate
          the common pain points in event handling — manual booking,
          miscommunication, poor data tracking — and replace them with
          automation, clarity, and actionable insights. Our team believes that
          event management should be as enjoyable as the event itself, and
          that’s the philosophy EventCraft is built upon.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-indigo-500">
          Meet the Developers
        </h2>
        <ul className="list-disc pl-6 space-y-4 text-lg">
          <li>
            <strong>Paras Kumar</strong> – Paras led the frontend development
            and responsiveness of EventCraft. From crafting dynamic components
            to integrating APIs and ensuring mobile-friendly design, he built an
            intuitive and seamless user interface that adapts perfectly across
            all devices.
          </li>
          <li>
            <strong>Aryan Arora</strong> – Aryan was the backend architect of
            EventCraft. He developed the entire server-side logic, route
            protection, and database schemas. His focus on secure communication,
            scalable architecture, and efficient query handling ensured robust
            and reliable backend performance.
          </li>
          <li>
            <strong>Krishna Vashishtha</strong> – Krishna focused on
            documentation and presentation. He prepared the project
            documentation, slides, and walkthroughs to effectively communicate
            the team’s vision, features, and technical depth to stakeholders and
            users.
          </li>
        </ul>

        <p className="text-lg mt-6">
          Together, we built EventCraft not just as a college project, but as a
          full-fledged solution that can solve real-world problems in event
          management. We are proud of what we’ve achieved and excited to
          continue improving and expanding it.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
