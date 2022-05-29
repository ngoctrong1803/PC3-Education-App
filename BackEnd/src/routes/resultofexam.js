const express = require("express");
const router = express.Router();
const resultOfExamController = require("../app/controller/resultExamController");
const authMiddleware = require("../app/middlewares/authMiddleware");
router.get("/list", resultOfExamController.getResultOfExam);
router.get("/:id", resultOfExamController.getResultOfExamByStatistical);
router.post(
  "/create",
  authMiddleware.verifyToken,
  resultOfExamController.createResultOfExam
);
router.put(
  "/update/:id",
  authMiddleware.verifyToken,
  resultOfExamController.updateResultOfExam
);
router.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  resultOfExamController.deleteResultOfExam
);

module.exports = router;
