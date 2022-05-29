const express = require("express");
const router = express.Router();
const authMiddleware = require("../app/middlewares/authMiddleware");
const lessionController = require("../app/controller/lessionController");

router.get("/:id", lessionController.getContentLession);
router.get("/list-lession", lessionController.getLession);
router.post(
  "/create",
  authMiddleware.checkTeacher,
  lessionController.createLession
);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  lessionController.updateLession
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  lessionController.deleteLession
);

module.exports = router;
