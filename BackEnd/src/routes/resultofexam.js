const express = require("express");
const router = express.Router();
const resultOfExamController = require("../app/controller/resultExamController");

router.get("/list", resultOfExamController.getResultOfExam);
router.get("/:id", resultOfExamController.getResultOfExamByStatistical);
router.post("/create", resultOfExamController.createResultOfExam);
router.put("/update/:id", resultOfExamController.updateResultOfExam);
router.delete("/delete/:id", resultOfExamController.deleteResultOfExam);

module.exports = router;
