const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  scheduledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["commercial", "education", "conference", "kids", "music"],
    required: true,
  },
  registrations: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  ticketsBooked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "attendee",
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
