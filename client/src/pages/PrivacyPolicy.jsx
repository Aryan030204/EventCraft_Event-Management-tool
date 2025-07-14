import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p className="mb-4">
        At <span className="font-semibold">EventCraft</span>, we value your
        privacy and are committed to protecting your personal data. This Privacy
        Policy outlines how we collect, use, and safeguard your information when
        you use our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        We may collect personal information including your name, email address,
        role (attendee, organizer, admin), and any event-related data such as
        feedback or bookings. This information is collected during sign-up,
        event creation, and ticket booking.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">
        Your information helps us provide seamless event management services. It
        is used for communication, authentication, booking verification,
        analytics, and to enhance user experience. We do not sell your
        information to third parties.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        3. Cookies & Session Management
      </h2>
      <p className="mb-4">
        We use cookies to maintain your login sessions and to keep track of user
        preferences. These cookies are safe and solely used to improve your
        interaction with the platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We implement industry-standard security measures to protect your data
        against unauthorized access, modification, or deletion. Sensitive data
        like passwords are encrypted and securely stored.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You have full control over your data. You can update, delete, or request
        a copy of your information by contacting our support team. We respect
        your rights and will act on requests promptly.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        6. Changes to This Policy
      </h2>
      <p className="mb-4">
        This policy may be updated from time to time. We encourage you to review
        it periodically to stay informed about how we are protecting your data.
      </p>

      <p className="mt-8 text-sm text-gray-500">
        If you have any questions or concerns regarding our Privacy Policy,
        please contact us through the platform.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
