const express = require("express");
const {
  getAllUsers,
  reportUser,
  promoteUser,
  getAnalytics,
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

const adminRouter = express.Router();

adminRouter.get("/users/all", authMiddleware, checkRole("admin"), getAllUsers);
adminRouter.patch(
  "/users/:userId/report",
  authMiddleware,
  checkRole("admin"),
  reportUser
);
adminRouter.patch(
  "/users/:userId/promote",
  authMiddleware,
  checkRole("admin"),
  promoteUser
);
adminRouter.get("/analytics", authMiddleware, checkRole("admin"), getAnalytics);

module.exports = adminRouter;
