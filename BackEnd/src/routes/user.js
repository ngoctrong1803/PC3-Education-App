const express = require("express");
const router = express.Router();
const authController = require("../app/controller/authController");
const userController = require("../app/controller/userController");
const authMiddleware = require("../app/middlewares/authMiddleware");
// geting all user
router.get("/list-user", authMiddleware.checkAdmin, userController.getUser);
router.get(
  "/statistical-of-page",
  authMiddleware.checkAdmin,
  userController.getStatisticalOfPage
);
router.post(
  "/list-user",
  authMiddleware.checkAdmin,
  userController.getUserPagination
);
router.get("/get-user-by-id/:id", userController.getUserByID);

// creating one user
router.post("/create", authMiddleware.checkAdmin, authController.resgisterUser);
router.put("/update-avatar/:id", userController.updateAvatar);
router.put("/update-infor/:id", userController.updateUserInfor);
router.put("/change-password/:id", authController.changePassword);
router.delete(
  "/delete/:id",
  authMiddleware.checkAdmin,
  userController.deleteUser
);
module.exports = router;
