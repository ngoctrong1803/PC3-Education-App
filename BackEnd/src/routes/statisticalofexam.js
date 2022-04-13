const express = require("express");
const router = express.Router();
const statisticalOfExamController = require("../app/controller/statisticalOfExamController");

router.get("/list", statisticalOfExamController.getStatisticalOfExam);
router.post("/create", statisticalOfExamController.createStatisticalOfExam);
router.put("/update/:id", statisticalOfExamController.updateStatisticalOfExam);
router.delete(
  "/delete/:id",
  statisticalOfExamController.deleteStatisticalOfExam
);

module.exports = router;
