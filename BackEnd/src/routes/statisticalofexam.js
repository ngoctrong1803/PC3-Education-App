const express = require("express");
const router = express.Router();
const statisticalOfExamController = require("../app/controller/statisticalOfExamController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", statisticalOfExamController.getStatisticalOfExam);
router.post("/exam/:id", statisticalOfExamController.getStatisticalByExamID);
router.get(
  "/exam-statistical-result-all-exam",
  statisticalOfExamController.getStatisticalResultAllExam
);
router.get(
  "/exam-statistical-result-exam/:id",
  statisticalOfExamController.getStatisticalResultOfExam
);
router.post(
  "/get-by-user-and-exam",
  statisticalOfExamController.getStatisticalOfExamByUserAndExam
);

router.post(
  "/create",
  authMiddleware.verifyToken,
  statisticalOfExamController.createStatisticalOfExam
);
router.post(
  "/delete/by-user-and-exam",
  authMiddleware.verifyToken,
  statisticalOfExamController.deleleStatisticalOfExamByUserAndExam
);

router.put(
  "/update/:id",
  authMiddleware.verifyToken,
  statisticalOfExamController.updateStatisticalOfExam
);
router.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  statisticalOfExamController.deleteStatisticalOfExam
);

module.exports = router;
