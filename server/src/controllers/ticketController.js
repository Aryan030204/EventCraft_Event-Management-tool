const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const { v4: uuidv4 } = require("uuid");

exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event || !event.isRegistrationOpen)
      return res.status(400).json({ message: "Registration closed" });
    const { name, age } = req.body;
    const ticket = await Ticket.create({
      event: event._id,
      attendee: req.user.id,
      uniqueId: uuidv4(),
      registrationData: { name, age },
    });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ attendee: req.user.id }).populate(
      "event"
    );
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCheckoutSummary = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    const taxes = 0.1 * event.ticketPrice;
    const total = event.ticketPrice + taxes;
    res.status(200).json({ ticketPrice: event.ticketPrice, taxes, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
