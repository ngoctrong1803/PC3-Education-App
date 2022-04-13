const express = require("express");
const router = express.Router();
const examController = require("../app/controller/examController");

router.get("/list", examController.getExam);
router.post("/create", examController.createExam);
router.put("/update/:id", examController.updateExam);
router.delete("/delete/:id", examController.deleteExam);

module.exports = router;
