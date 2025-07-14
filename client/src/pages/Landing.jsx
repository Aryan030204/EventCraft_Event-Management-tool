import React from "react";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

export default function Landing() {
    return (
        <div className="screen">
            <Navbar />
            <HeroSection />
        </div>
    );
}