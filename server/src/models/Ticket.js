const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  attendee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uniqueId: { type: String, unique: true },
  registrationData: {
    name: String,
    age: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
