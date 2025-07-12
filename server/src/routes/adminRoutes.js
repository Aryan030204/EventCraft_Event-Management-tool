const express = require("express");
const adminRouter = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const User = require("../models/User");
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

// Get all users
adminRouter.get("/users", auth, role(["admin"]), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Report or star a user
adminRouter.patch(
  "/users/:id/report",
  auth,
  role(["admin"]),
  async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.isReported = true;
    await user.save();
    res.json({ message: "User reported" });
  }
);

adminRouter.patch(
  "/users/:id/star",
  auth,
  role(["admin"]),
  async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.isStarred = true;
    await user.save();
    res.json({ message: "User marked as star" });
  }
);

// Analytics
adminRouter.get("/analytics", auth, role(["admin"]), async (req, res) => {
  const totalEvents = await Event.countDocuments();
  const tickets = await Ticket.find().populate("event");

  const feedbackSummary = tickets.reduce(
    (acc, t) => {
      if (t.feedback) {
        if (t.feedback.like) acc.likes++;
        else acc.dislikes++;
      }
      acc.attendeesPerEvent[t.event.title] =
        (acc.attendeesPerEvent[t.event.title] || 0) + 1;
      return acc;
    },
    { likes: 0, dislikes: 0, attendeesPerEvent: {} }
  );

  res.json({ totalEvents, ...feedbackSummary });
});

module.exports = adminRouter;
