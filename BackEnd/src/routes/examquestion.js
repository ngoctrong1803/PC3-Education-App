const express = require("express");
const router = express.Router();
const examQuestionController = require("../app/controller/examQuestionController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", examQuestionController.getExamQuestion);
router.get("/list/:id", examQuestionController.getExamQuestionByExamID);
router.post(
  "/list/:id",
  examQuestionController.getExamQuestionByExamIDPagination
);
router.get("/:id", examQuestionController.getExamQuestionByQuestionID);
router.post(
  "/create",
  authMiddleware.checkTeacher,
  examQuestionController.createExamQuestion
);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  examQuestionController.updateExamQuestion
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  examQuestionController.deleteExamQuestion
);

module.exports = router;
