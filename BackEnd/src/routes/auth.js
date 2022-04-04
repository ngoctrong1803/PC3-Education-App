const express = require("express");
const router = express.Router();
const authController = require("../app/controller/authController");
const authMiddleware = require("../app/middlewares/authMiddleware");

// creating one user (REGISTER)
router.post("/create", authController.resgisterUser);

// LOGIN
router.post("/login", authController.loginUser);

//Refresh token
router.post("/refresh", authController.requestRefreshToken);

// LOGOUT
router.post("/logout", authMiddleware.verifyToken, authController.logoutUser);

module.exports = router;
