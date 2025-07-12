const User = require("../models/User");
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const Feedback = require("../models/Feedback");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.reportUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isReported: true },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markUserAsStar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isStarred: true },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEventAnalytics = async (req, res) => {
  try {
    const events = await Event.find();
    const feedbacks = await Feedback.find();
    const tickets = await Ticket.find();

    const analytics = events.map((event) => {
      const eventFeedbacks = feedbacks.filter(
        (fb) => fb.event.toString() === event._id.toString()
      );
      const eventTickets = tickets.filter(
        (ticket) => ticket.event.toString() === event._id.toString()
      );
      return {
        eventTitle: event.title,
        attendees: eventTickets.length,
        likes: eventFeedbacks.filter((fb) => fb.like).length,
        dislikes: eventFeedbacks.filter((fb) => !fb.like).length,
      };
    });

    res.status(200).json(analytics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
