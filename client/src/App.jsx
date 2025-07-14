import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import CreateEvent from "./pages/CreateEvent";
import AllEvents from "./pages/AllEvents";

function App() {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/feedback/:eventid" element={<Feedback />} />
            <Route path="/schedule" element={<CreateEvent />} />
            <Route path="/organizer/events" element={<AllEvents />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
