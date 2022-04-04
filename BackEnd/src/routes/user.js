const express = require("express");
const router = express.Router();
const authController = require('../app/controller/authController')


// geting all user
router.get("/get_users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// creating one user
router.post("/create", authController.resgisterUser );
module.exports = router;
