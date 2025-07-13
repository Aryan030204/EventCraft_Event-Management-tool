const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, getProfile);
userRouter.put("/profile", authMiddleware, updateProfile);
userRouter.delete("/profile", authMiddleware, deleteProfile);

module.exports = userRouter;
