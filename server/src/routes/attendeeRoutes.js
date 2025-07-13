const express = require("express");
const checkRole = require("../middlewares/roleMiddleware");
const {
  discoverAllEvents,
  bookTicket,
  cancelTicket,
  giveFeedback,
  getMyBookedEvents,
} = require("../controllers/attendeeController");
const authMiddleware = require("../middlewares/authMiddleware");

const attendeeRouter = express.Router();

attendeeRouter.get(
  "/events/discover",
  authMiddleware,
  checkRole("attendee"),
  discoverAllEvents
);
attendeeRouter.post(
  "/ticket/:eventId/book",
  authMiddleware,
  checkRole("attendee"),
  bookTicket
);
attendeeRouter.delete(
  "/ticket/:eventId/cancel",
  authMiddleware,
  checkRole("attendee"),
  cancelTicket
);
attendeeRouter.post(
  "/event/:eventId/feedback/submit",
  authMiddleware,
  checkRole("attendee"),
  giveFeedback
);
attendeeRouter.get(
  "/me/events/booked",
  authMiddleware,
  checkRole("attendee"),
  getMyBookedEvents
);

module.exports = attendeeRouter;
