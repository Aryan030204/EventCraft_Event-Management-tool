const createEvent = async (req, res) => {
  try {
    const {}
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "event creation failed",
      error: err.message,
    });
  }
};
