const express = require("express");
const router = express.Router();
const cateQuesController = require("../app/controller/cateQuesController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", cateQuesController.getCateQuestion);
router.post(
  "/create",
  authMiddleware.checkTeacher,
  cateQuesController.createCateQuestion
);
router.put(
  "/update/:id",
  authMiddleware.checkAdmin,
  cateQuesController.updateCateQuestion
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  cateQuesController.deleteCateQuestion
);

module.exports = router;
