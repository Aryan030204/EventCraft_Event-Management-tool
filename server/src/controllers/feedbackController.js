const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  try {
    const { comment } = req.body;
    const feedback = await Feedback.create({
      event: req.params.eventId,
      user: req.user.id,
      comment,
    });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFeedbackForEvent = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ event: req.params.eventId });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
