const express = require("express");
const router = express.Router();
const authController = require("../app/controller/authController");
const authMiddleware = require("../app/middlewares/authMiddleware");

// creating one user (REGISTER)
router.post("/create", authMiddleware.checkAdmin, authController.resgisterUser);

// LOGIN
router.post("/login", authController.loginUser);

router.post("/check-user", authMiddleware.verifyToken, (req, res) => {
  res.status(200).json({ error: false });
});

//Refresh token
router.post("/refresh", authController.requestRefreshToken);

// LOGOUT
router.post("/logout", authMiddleware.verifyToken, authController.logoutUser);

module.exports = router;
