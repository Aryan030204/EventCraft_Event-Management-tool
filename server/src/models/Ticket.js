const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticketId: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  registeredAt: Date,
  startDate: Date,
  endDate: Date,
  feedback: {
    like: Boolean,
    comment: String,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
