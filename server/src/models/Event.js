const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  startDate: Date,
  endDate: Date,
  isRegistrationOpen: { type: Boolean, default: false },
  ticketPrice: Number,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Event", eventSchema);
