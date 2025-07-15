const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./utils/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const organizerRouter = require("./routes/organizerRoutes");
const userRouter = require("./routes/userRoutes");
const attendeeRouter = require("./routes/attendeeRoutes");
const adminRouter = require("./routes/adminRoutes");

// Load env variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(
  cors({
    origin: ["https://event-craft-event-management-tool-csjhet6e2.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth/", authRouter);
app.use("/api/", userRouter);
app.use("/api/", organizerRouter);
app.use("/api/", attendeeRouter);
app.use("/api/", adminRouter);

// Connect DB & start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
