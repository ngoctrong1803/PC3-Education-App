const express = require("express");
const router = express.Router();
const authController = require("../app/controller/authController");
const userController = require("../app/controller/userController");
const authMiddleware = require("../app/middlewares/authMiddleware");
// geting all user
router.get("/list-user", userController.getUser);
router.get("/statistical-of-page", userController.getStatisticalOfPage);
router.post(
  "/list-user",
  authMiddleware.checkAdmin,
  userController.getUserPagination
);
router.get("/get-user-by-id/:id", userController.getUserByID);

// creating one user
router.post("/create", authMiddleware.checkAdmin, authController.resgisterUser);
router.put(
  "/update-avatar/:id",
  authMiddleware.checkUserChangeInfor,
  userController.updateAvatar
);
router.put(
  "/update-infor/:id",
  authMiddleware.checkUserChangeInfor,
  userController.updateUserInfor
);
router.put(
  "/change-password/:id",
  authMiddleware.checkUserChangeInfor,
  authController.changePassword
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  userController.deleteUser
);
module.exports = router;
// done check
