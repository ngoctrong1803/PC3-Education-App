const express = require("express");
const router = express.Router();
const examController = require("../app/controller/examController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", examController.getExam);
router.post("/list", examController.getExamPagination);
router.post("/list-index", examController.getExamPaginationIndex);
router.get("/:id", examController.getExamByID);

router.post("/create", authMiddleware.checkTeacher, examController.createExam);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  examController.updateExam
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  examController.deleteExam
);

module.exports = router;
