const Event = require("../models/Event");
const Feedback = require("../models/Feedback");
const Ticket = require("../models/Ticket");
const sendMail = require("../utils/mailer");

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
    const { _id, email } = req.user;
    // console.log(req.user);

    const event = await Event.findById(eventId);
    // console.log(event);

    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event not found or registration is closed",
      });
    }
    if (!event.registrations) {
      return res.status(400).json({
        success: false,
        message: "Event registration is closed",
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
      startDate: event.startDate,
      endDate: event.endDate,
    });
    event.ticketsBooked.push(_id);
    await event.save();
    await sendMail(
      email,
      "Event Booking Confirmation",
      `You have successfully booked ${event.name} event on ${event.startDate} to ${event.endDate}: ${event}`
    );
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
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    await Ticket.findOneAndDelete({
      userId: _id,
      eventId,
    });

    event.ticketsBooked.pull(_id);
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
    const event = await Event.findOne({ _id: eventId });
    if (!event.ticketsBooked.includes(_id)) {
      return res.status(401).json({
        success: false,
        message: "You haven't booked any ticket for this event",
      });
    }
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
      message: "Events booked by you fetched successfully",
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

const getEventById = async (req, res) => {
  try {
    const { eventid } = req.params;
    const event = await Event.findOne({ _id: eventid });
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Event fetched successfully",
      event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching event",
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
  getEventById,
};
