const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
    const { name, startDate, endDate, registrations, price } = req.body;
    const { _id } = req.user;
    const event = await Event.create({
      ...req.body,
      scheduledBy: _id,
    });
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error creating the event",
      error: err.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating the event",
      error: err.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error deleting the event",
      error: err.message,
    });
  }
};

const getAllScheduledEvents = async (req, res) => {
  try {
    const { _id } = req.user;
    const events = await Event.find({
      scheduledBy: _id,
    });
    res.status(200).json({
      success: true,
      message: "Events retrieved successfully",
      events,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error fetching the events",
      error: err.message,
    });
  }
};

const toggleRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    event.registrations = !event.registrations;
    await event.save();

    res.status(200).json({
      success: true,
      message: "Registrations toggled successfully",
      event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error toggling registrations",
      error: err.message,
    });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllScheduledEvents,
  toggleRegistrations,
};
