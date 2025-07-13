const Event = require("../models/Event");
const Feedback = require("../models/Feedback");
const Ticket = require("../models/Ticket");

const discoverAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      message: "events fetched successfully",
      events,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error discovering all events",
      error: err.message,
    });
  }
};

const bookTicket = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { _id } = req.user;
    const event = await Event.findOne({ _id: eventId });
    if (!event || !event.registrations) {
      return res.status(400).json({
        success: false,
        message: "Event not found or registration is closed",
      });
    }
    const alreadyBooked = await Ticket.findOne({ eventId, userId: _id });
    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "You have already booked this event",
      });
    }
    const ticket = await Ticket.create({
      eventId: event._id,
      userId: _id,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
    });
    event.ticketsBooked.push(_id);
    await event.save();
    res.status(201).json({
      success: true,
      message: "Ticket booked successfully",
      ticket,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error booking the event ticket",
      error: err.message,
    });
  }
};

const cancelTicket = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { _id } = req.user;
    const event = Event.findOne({ _id: eventId });
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    await Ticket.findOneAndDelete({
      userId: _id,
      eventId,
    });

    if (!deleted) {
      return res
        .status(400)
        .json({ success: false, message: "Ticket not found" });
    }
    event.bookTickets.pull(_id);
    await event.save();
    res.status(200).json({
      success: true,
      message: "Ticket cancelled successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error cancelling the event ticket",
      error: err.message,
    });
  }
};

const giveFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { _id } = req.user;
    const { comment } = req.body;
    const feedback = await Feedback.create({
      userId: _id,
      eventId: eventId,
      comment,
    });
    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error giving the feedback",
      error: err.message,
    });
  }
};

const getMyBookedEvents = async (req, res) => {
  try {
    const { _id } = req.user;
    const events = await Ticket.find({ userId: _id });
    res.status(200).json({
      success: true,
      message: "Events booked successfully",
      events,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching my booked events",
      error: err.message,
    });
  }
};

module.exports = {
  discoverAllEvents,
  bookTicket,
  cancelTicket,
  giveFeedback,
  getMyBookedEvents,
};
