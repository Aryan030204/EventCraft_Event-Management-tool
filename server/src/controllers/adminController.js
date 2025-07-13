const Feedback = require("../models/Feedback");
const Ticket = require("../models/Ticket");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["organizer", "attendee"] },
    });
    res.status(200).json({
      success: true,
      message: "users fetched successfully",
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};

const reportUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.reports += 1;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User reported successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error reporting the user",
    });
  }
};

const promoteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.stars += 1;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User promoted successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error promoting the user",
    });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const users = await User.find();
    const tickets = await Ticket.find();
    const organizers = await User.find({
      role: { $in: ["organizer"] },
    });
    const attendees = await User.find({
      role: {
        $in: ["attendee"],
      },
    });
    const feedbacks = await Feedback.find();

    res.status(200).json({
      success: true,
      message: "Analytics retrieved successfully",
      analytics: {
        numOfUsers: users.length,
        numOfTickets: tickets.length,
        numOfOrganizers: organizers.length,
        numOfAttendees: attendees.length,
        numOfFeedbacks: feedbacks.length,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching Analytics",
    });
  }
};

module.exports = {
  getAllUsers,
  reportUser,
  promoteUser,
  getAnalytics,
};
