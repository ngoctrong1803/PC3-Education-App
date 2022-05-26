const express = require("express");
const router = express.Router();
const statisticalOfExamController = require("../app/controller/statisticalOfExamController");

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
router.post("/create", statisticalOfExamController.createStatisticalOfExam);
router.post(
  "/delete/by-user-and-exam",
  statisticalOfExamController.deleleStatisticalOfExamByUserAndExam
);
router.post(
  "/get-by-user-and-exam",
  statisticalOfExamController.getStatisticalOfExamByUserAndExam
);
router.put("/update/:id", statisticalOfExamController.updateStatisticalOfExam);
router.delete(
  "/delete/:id",
  statisticalOfExamController.deleteStatisticalOfExam
);

module.exports = router;
