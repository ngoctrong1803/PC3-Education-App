const express = require("express");
const authController = require("../app/controller/authController");
const router = express.Router();
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/", authMiddleware.checkAdmin, (req, res) => {
  const userInfo = {
    email: req.data.email,
    fullname: req.data.fullname,
    role: req.data.role,
  };
  res.status(200).json({
    message: "đăng nhập thành công",
    userInfo: userInfo,
  });
});
router.get("/refreshtoken", authController.requestRefreshToken);

module.exports = router;
