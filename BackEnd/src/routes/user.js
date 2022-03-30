const express = require("express");
const router = express.Router();
const User = require("../app/models/User");

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
router.post("/create", async (req, res) => {
  console.log(req.body);
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    address: req.body.address,
    birthday: req.body.birthday,
    phone: req.body.phone,
    class: req.body.class,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({
      message: err.message,
      status: 400,
    });
  }
});
module.exports = router;
