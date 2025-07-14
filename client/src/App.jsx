import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Discover from "./pages/Discover";
import AttendeeEventDetails from "./pages/AttendeeEventDetails";
import Ticket from "./pages/Ticket";
import AttendeeMyEvents from "./pages/AttendeeMyEvents";
import GiveFeedback from "./pages/GiveFeedback";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/event/:id" element={<AttendeeEventDetails />} />
          <Route path="/ticket/:id" element={<Ticket />} />
          <Route path="/myevents" element={<AttendeeMyEvents />} />
          <Route path="/feedback/:id" element={<GiveFeedback />} />
          <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
          <Route path="/organizer/create" element={<CreateEvent />} />
          <Route path="/organizer/edit/:id" element={<EditEvent />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    )
  }

  export default App;