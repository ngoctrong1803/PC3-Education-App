const express = require("express");
const router = express.Router();
const authController = require("../app/controller/authController");
const userController = require("../app/controller/userController");
// geting all user
router.get("/list-user", userController.getUser);
router.get("/get-user-by-id/:id", userController.getUserByID);

// creating one user
router.post("/create", authController.resgisterUser);
router.delete("/delete/:id", userController.deleteUser);
module.exports = router;
