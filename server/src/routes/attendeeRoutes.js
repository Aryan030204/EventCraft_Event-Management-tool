const express = require("express");
const attendeeRouter = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const { v4: uuidv4 } = require("uuid");

// Discover Events
attendeeRouter.get("/events", auth, role(["attendee"]), async (req, res) => {
  const { type } = req.query;
  const filter = { isRegistrationOpen: true };
  if (type) filter.type = type;
  const events = await Event.find(filter);
  res.json(events);
});

// Register for Event
attendeeRouter.post(
  "/events/:id/register",
  auth,
  role(["attendee"]),
  async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event || !event.isRegistrationOpen) {
      return res
        .status(400)
        .json({ message: "Event is not open for registration" });
    }

    const ticket = new Ticket({
      ticketId: uuidv4(),
      user: req.user.id,
      event: event._id,
      name: req.body.name,
      age: req.body.age,
      startDate: event.startDate,
      endDate: event.endDate,
      registeredAt: new Date(),
    });
    await ticket.save();

    res.json({ message: "You have been registered for the event", ticket });
  }
);

// Show My Tickets
attendeeRouter.get("/tickets", auth, role(["attendee"]), async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id }).populate("event");
  res.json(tickets);
});

// Submit Feedback
attendeeRouter.post(
  "/tickets/:id/feedback",
  auth,
  role(["attendee"]),
  async (req, res) => {
    const ticket = await Ticket.findById(req.params.id).populate("event");
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const now = new Date();
    if (now < new Date(ticket.endDate)) {
      return res.status(400).json({ message: "Event has not ended yet" });
    }

    ticket.feedback = {
      like: req.body.like,
      comment: req.body.comment,
    };
    await ticket.save();
    res.json({ message: "Feedback submitted" });
  }
);

module.exports = attendeeRouter;
