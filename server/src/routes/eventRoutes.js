const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Get all events (regardless of role, for general browsing)
router.get("/all", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      message: "all events fetched successfully",
      events,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: err.message });
  }
});

// Get specific event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({
      success: true,
      message: "Event fetched successfully",
      event,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch event", error: err.message });
  }
});

module.exports = router;
