const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllScheduledEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  toggleRegistrations,
} = require("../controllers/organizerController");
const checkRole = require("../middlewares/roleMiddleware");

const organizerRouter = express.Router();

organizerRouter.get(
  "/me/events/scheduled",
  authMiddleware,
  getAllScheduledEvents
);
organizerRouter.post(
  "/event/create",
  authMiddleware,
  checkRole("organizer"),
  createEvent
);
organizerRouter.put(
  "/event/:eventId",
  authMiddleware,
  checkRole("organizer"),
  updateEvent
);
organizerRouter.delete(
  "/event/:eventId",
  authMiddleware,
  checkRole("organizer"),
  deleteEvent
);
organizerRouter.patch(
  "/me/events/:eventId/toggle",
  authMiddleware,
  checkRole("organizer"),
  toggleRegistrations
);

module.exports = organizerRouter;
