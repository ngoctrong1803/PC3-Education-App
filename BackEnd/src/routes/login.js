const express = require("express");
const router = express.Router();
const authController = require("../app/controller/authController");

router.post("/", authController.loginUser);

module.exports = router;
