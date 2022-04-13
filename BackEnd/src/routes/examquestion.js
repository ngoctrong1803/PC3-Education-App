const express = require("express");
const router = express.Router();
const examQuestionController = require("../app/controller/examQuestionController");

router.get("/list", examQuestionController.getExamQuestion);
router.post("/create", examQuestionController.createExamQuestion);
router.put("/update/:id", examQuestionController.updateExamQuestion);
router.delete("/delete/:id", examQuestionController.deleteExamQuestion);

module.exports = router;
