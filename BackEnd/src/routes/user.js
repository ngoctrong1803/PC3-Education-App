const express = require("express");
const router = express.Router();
const authController = require("../app/controller/authController");
const userController = require("../app/controller/userController");
// geting all user
router.get("/list-user", userController.getUser);

// creating one user
router.post("/create", authController.resgisterUser);
module.exports = router;
