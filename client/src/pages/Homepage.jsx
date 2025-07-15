import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";

const Homepage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex flex-col bg-blue-100">
      <HeroSection user={user} />
      <Features />
    </div>
  );
};

export default Homepage;
