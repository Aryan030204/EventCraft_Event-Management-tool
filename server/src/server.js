const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./utils/db");

const authRoutes = require("./routes/authRoutes");
const organizerRoutes = require("./routes/organizerRoutes");
const attendeeRoutes = require("./routes/attendeeRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/organizer", organizerRoutes);
app.use("/api/attendee", attendeeRoutes);
app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server running on port ${process.env.PORT}`);
});
