const express = require("express");
const eventRouter = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const Event = require("../models/Event");

// Create Event
eventRouter.post("/events", auth, role(["organizer"]), async (req, res) => {
  try {
    const event = new Event({ ...req.body, organizer: req.user.id });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Event
eventRouter.put("/events/:id", auth, role(["organizer"]), async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizer: req.user.id },
      req.body,
      { new: true }
    );
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Event
eventRouter.delete(
  "/events/:id",
  auth,
  role(["organizer"]),
  async (req, res) => {
    try {
      await Event.findOneAndDelete({
        _id: req.params.id,
        organizer: req.user.id,
      });
      res.json({ message: "Event deleted" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// List My Events
eventRouter.get("/my-events", auth, role(["organizer"]), async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id });
    res.json(events);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Toggle Registration
eventRouter.patch(
  "/events/:id/toggle-registration",
  auth,
  role(["organizer"]),
  async (req, res) => {
    try {
      const event = await Event.findOne({
        _id: req.params.id,
        organizer: req.user.id,
      });
      if (new Date(event.startDate) <= new Date()) {
        return res.status(400).json({ message: "Event already started" });
      }
      event.isRegistrationOpen = !event.isRegistrationOpen;
      await event.save();
      res.json({ isRegistrationOpen: event.isRegistrationOpen });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = eventRouter;
