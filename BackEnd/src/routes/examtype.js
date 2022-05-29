const express = require("express");
const router = express.Router();
const examTypeController = require("../app/controller/examTypeController");
const authMiddleware = require("../app/middlewares/authMiddleware");
router.get("/list", examTypeController.getExamType);
router.post(
  "/create",
  authMiddleware.checkTeacher,
  examTypeController.createExamType
);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  examTypeController.updateExamType
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  examTypeController.deleteExamType
);

module.exports = router;
