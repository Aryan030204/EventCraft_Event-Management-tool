// ✅ server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./utils/db");

// Load env variables
dotenv.config();

// Route imports
const attendeeRoutes = require("./routes/attendeeRoutes");
const organizerRoutes = require("./routes/organizerRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/attendee", attendeeRoutes);
app.use("/api/organizer", organizerRoutes);
app.use("/api/admin", adminRoutes);

// Connect DB & start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
