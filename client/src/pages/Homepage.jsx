import React from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";

const Homepage = () => {
  return (
    <div className="flex flex-col bg-blue-100">
      <HeroSection />
      <Features />
    </div>
  );
};

export default Homepage;
