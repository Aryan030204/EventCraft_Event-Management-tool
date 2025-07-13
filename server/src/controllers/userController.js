const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      message: "user profile fetched successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: err.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(
      _id,
      { ...req.body },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: err.message,
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndDelete(_id);
    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting profile",
      error: err.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
